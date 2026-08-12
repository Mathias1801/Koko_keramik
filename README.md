# Sen-keramik

Showcase-hjemmeside for en håndlavet keramikforretning i Aalborg. Kunder browser produkter og sender en mail-forespørgsel — selve købet foregår uden for hjemmesiden.

## Sider

| Fil | Indhold |
|---|---|
| `index.html` | Forside |
| `butik.html` | Produktoversigt med kategori-filtrering |
| `produkt.html` | Enkelt produktside |
| `om-vaerkstedet.html` | Om værkstedet |
| `kontakt.html` | Kontaktformular + FAQ |

Fælles styling i `style.css`, delt logik (produktvisning, huskeseddel m.m.) i `script.js`.

## Produktdata — sådan hænger det sammen

Produkterne vedligeholdes **ikke** direkte i koden. De ligger i et offentliggjort Google Sheet ("Varebeholdning på hjemmeside"), og bliver automatisk trukket ind på siden sådan her:

```
Google Sheet (CSV)
      │
      ▼
Fetch_store_info.py   ← kører automatisk via GitHub Actions hver 3. time
      │
      ├─► data/pulls/<dato-tid>/products.csv + .json   (fuldt snapshot af hvert træk)
      │
      └─► data/master_products.json + .csv             (samlet, opdateret produktliste)
                  │
                  ▼
            script.js henter master_products.json
            og bygger produktgrid + produktsider
```

**Vigtigt:** GitHub Pages er statisk og kan ikke selv køre Python. Det er derfor GitHub Actions-workflowet (`.github/workflows/sync-products.yml`) står for at hente arket og committe opdateret data tilbage i repoet — siden viser altid det, der senest blev committet, ikke live data fra arket i samme sekund.

### Ark-kolonner der bruges

`id, navn, pris, gen_kat, kollektion, sub_kat, crumb_href, more_text, icon, billed_id, maal_h, maal_b, maal_l, volume, vaegt, farver, braending, egnet, story_nøgleord, story, på_varelager`

- `billed_id` peger på billedfiler i `images/`, adskilt med `|` ved flere billeder (fx `2.1|2.2` → `images/2.1.jpg`, `images/2.2.jpg`)
- `på_varelager` = `FALSE` skjuler produktet automatisk fra butikken — intet manuelt arbejde nødvendigt på sitet, det opdateres ved næste sync
- Billedfiler skal uploades/committes manuelt til `images/` — det er ikke automatiseret endnu

## Kør synkroniseringen

**Lokalt:**
```bash
pip install -r requirements.txt
python Fetch_store_info.py
```

**Automatisk:** Kører hver 3. time via GitHub Actions. Kan også trigges manuelt under repoets *Actions*-fane → vælg workflowet → *Run workflow*.

## Tilføj eller ret et produkt

1. Ret/tilføj rækken i Google Sheetet
2. Upload det tilhørende billede til `images/` med filnavn matchende `billed_id` (fx `3.1.jpg`)
3. Vent på næste automatiske sync (op til 3 timer), eller trig workflowet manuelt for at se ændringen med det samme

## Lokal udvikling af selve siden

Da `script.js` henter `data/master_products.json` via `fetch()`, virker det ikke ved blot at åbne `index.html` direkte i browseren (file:// har ingen CORS-adgang). Kør i stedet en lokal server fra projektmappen:
```bash
python -m http.server
```
og åbn `http://localhost:8000`.
