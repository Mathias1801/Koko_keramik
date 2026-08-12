import csv
import json
from datetime import datetime
from pathlib import Path

import requests

SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR_3phCXhqJTAGjY5EMK1sWeQmktBvU6aWVQ4e6ZQQPzXIRqR_MV8nZY1vEO8AXfXuKX6zrJNSR09ZY/pub?gid=0&single=true&output=csv"

DATA_DIR = Path("data")
PULLS_DIR = DATA_DIR / "pulls"
MASTER_CSV = DATA_DIR / "master_products.csv"
MASTER_JSON = DATA_DIR / "master_products.json"


def fetch_products(sheet_url: str = SHEET_CSV_URL) -> list[dict]:
    """Download the published Google Sheet as CSV and return it as a list of row-dicts."""
    response = requests.get(sheet_url, timeout=30)
    response.raise_for_status()
    response.encoding = "utf-8"
    reader = csv.DictReader(response.text.splitlines())
    return list(reader)


def save_dated_snapshot(rows: list[dict], pull_time: datetime) -> Path:
    """Save this pull's raw rows into their own timestamped folder (csv + json),
    with a retrieved_at column stamped on every row."""
    folder = PULLS_DIR / pull_time.strftime("%Y-%m-%d_%H%M%S")
    folder.mkdir(parents=True, exist_ok=True)

    stamp = pull_time.isoformat(timespec="seconds")
    stamped_rows = [{"retrieved_at": stamp, **row} for row in rows]

    if stamped_rows:
        with (folder / "products.csv").open("w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=stamped_rows[0].keys())
            writer.writeheader()
            writer.writerows(stamped_rows)

    (folder / "products.json").write_text(
        json.dumps(stamped_rows, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    return folder


def load_master() -> dict[str, dict]:
    """Load the current master file as a dict keyed by product id."""
    if not MASTER_JSON.exists():
        return {}
    records = json.loads(MASTER_JSON.read_text(encoding="utf-8"))
    return {r["id"]: r for r in records if r.get("id")}


def upsert_master(rows: list[dict], pull_time: datetime) -> dict:
    """Add new products and update changed ones; leave unchanged rows untouched.
    Returns a small report: how many were added / updated / unchanged."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    master = load_master()

    added, updated, unchanged = 0, 0, 0
    stamp = pull_time.isoformat(timespec="seconds")

    for row in rows:
        pid = row.get("id")
        if not pid:
            continue

        existing = master.get(pid)
        # Compare only the actual sheet fields (ignore our own bookkeeping fields)
        row_data = {k: v for k, v in row.items()}

        if existing is None:
            master[pid] = {**row_data, "first_seen": stamp, "last_updated": stamp}
            added += 1
        else:
            existing_data = {k: v for k, v in existing.items() if k not in ("first_seen", "last_updated")}
            if existing_data != row_data:
                master[pid] = {**row_data, "first_seen": existing.get("first_seen", stamp), "last_updated": stamp}
                updated += 1
            else:
                unchanged += 1

    # Sort by id for a stable, readable file
    ordered = sorted(master.values(), key=lambda r: (len(r["id"]), r["id"]))

    MASTER_JSON.write_text(json.dumps(ordered, ensure_ascii=False, indent=2), encoding="utf-8")

    if ordered:
        fieldnames = list(ordered[0].keys())
        with MASTER_CSV.open("w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(ordered)

    return {"added": added, "updated": updated, "unchanged": unchanged}


def sync_products() -> list[dict]:
    """Full pipeline: fetch -> dated snapshot -> append to master. Run this any time you want to pull the sheet."""
    pull_time = datetime.now()
    rows = fetch_products()

    if not rows:
        print("Ingen rækker fundet i arket — tjek linket.")
        return []

    snapshot_folder = save_dated_snapshot(rows, pull_time)
    report = upsert_master(rows, pull_time)

    print(f"Hentede {len(rows)} produkter.")
    print(f"Snapshot gemt i: {snapshot_folder}")
    print(f"Master opdateret — nye: {report['added']}, ændrede: {report['updated']}, uændrede: {report['unchanged']}")
    return rows


if __name__ == "__main__":
    sync_products()