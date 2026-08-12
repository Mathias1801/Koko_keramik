const PRODUCTS_JSON_URL = "data/master_products.json";

const FALLBACK_PRODUCTS = {
  "1": {
    navn:"Landmand", pris:"795 kr.",
    billeder:["images/2.1.jpg","images/2.2.jpg"],
    icon:"pynt", typeLabel:"Pynt", serieLabel:"Pynt-serien", crumbCat:"Pynt", crumbHref:"butik.html#pynt", moreText:"Se mere pynt", cat:"pynt",
    maal:{hoejde:"",bredde:"",laengde:"30"}, vaegt:"", farver:["Blå","Terrakotta","Sand"],
    specs:{glasur:"",braending:"1220°, stentøjsler",egnet:"Dekoration",lavet:""},
    story:["Mød Landmanden – en charmerende og detaljeret håndlavet figur i smækbukser."]
  },
  "2": {
    navn:"Polka Ocean Kop", pris:"299 kr.",
    billeder:["images/1.1.jpg"],
    icon:"kop", typeLabel:"Kopper", serieLabel:"Kopper-serien", crumbCat:"Kopper", crumbHref:"butik.html#kopper", moreText:"Se flere kopper", cat:"kop",
    maal:{hoejde:"",bredde:"",laengde:"8"}, vaegt:"", farver:["Turkis","Sort","Sand"],
    specs:{glasur:"Turkis/petrol over prikket bund",braending:"1220°, stentøjsler",egnet:"Varme og kolde drikke",lavet:""},
    story:["Mød Polka Ocean Kop – en unik, håndlavet kop med et strand-inspireret udtryk."]
  }
};

let PRODUCTS = {};

function splitList(value){
  return (value || '').split('|').map(s => s.trim()).filter(Boolean);
}

function slugify(value){
  return (value || '')
    .toString().trim().toLowerCase()
    .replace(/æ/g,'ae').replace(/ø/g,'oe').replace(/å/g,'aa')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'');
}

function rowToProduct(row){
  const catSlug = slugify(row.gen_kat);
  const subLabel = (row.sub_kat && row.sub_kat.trim()) ? row.sub_kat.trim() : row.gen_kat;
  return {
    navn: row.navn,
    pris: row.pris,
    icon: (row.icon && row.icon.trim()) ? row.icon.trim() : catSlug,
    typeLabel: subLabel,
    serieLabel: row.kollektion,
    crumbCat: subLabel,
    crumbHref: (row.crumb_href && row.crumb_href.trim()) ? row.crumb_href.trim() : `butik.html#${catSlug}`,
    moreText: (row.more_text && row.more_text.trim()) ? row.more_text.trim() : `Se flere ${(subLabel || '').toLowerCase()}`,
billeder: splitList(row.billed_id).map(bid => `images/${bid}.jpg`),    farver: splitList(row.farver),
    maal: { hoejde: row.maal_h, bredde: row.maal_b, laengde: row.maal_l },
    volume: row.volume,
    vaegt: row.vaegt,
    specs: { glasur: row.glasur, braending: row.braending, egnet: row.egnet, lavet: row.lavet },
    story: splitList(row.story),
    cat: catSlug,
    paaVarelager: (row.på_varelager || '').trim().toUpperCase() === 'TRUE'
  };
}

async function loadProducts(){
  if(Object.keys(PRODUCTS).length) return;
  try{
    const res = await fetch(PRODUCTS_JSON_URL);
    if(!res.ok) throw new Error('Kunne ikke hente produktdata');
    const data = await res.json();
    const result = {};
    data.forEach(row => {
      if(!row.id) return;
      const product = rowToProduct(row);
      if(!product.paaVarelager) return; // skjul udsolgte/ikke-udgivne stykker
      result[row.id.trim()] = product;
    });
    PRODUCTS = Object.keys(result).length ? result : FALLBACK_PRODUCTS;
  }catch(err){
    console.warn('Kunne ikke hente produkter fra master-filen, bruger fallback-data.', err);
    PRODUCTS = FALLBACK_PRODUCTS;
  }
}
const ART_ICONS = {
  skaal: '<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M15 30c0 0 10 38 45 38s45-38 45-38"/><ellipse cx="60" cy="30" rx="45" ry="9"/><path d="M25 30q10-4 20 0t20 0 20 0" opacity=".5"/><path d="M22 33q10-3 20 1t20 1 20-1" opacity=".3"/></svg>',
  kop: '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M35 30c-2 0-3 2-3 5l4 53c.5 6 6 10 14 10h12c8 0 13.5-4 14-10l4-53c0-3-1-5-3-5z"/><path d="M80 42c14 0 18 10 16 20-2 10-12 14-18 12"/><path d="M34 30c0-6 7-10 22-10s22 4 22 10-7 7-22 7-22-1-22-7z"/></svg>',
  fad: '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.1"><circle cx="60" cy="60" r="47"/><circle cx="60" cy="60" r="31"/></svg>',
  pynt: '<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M50 34c18 0 30 16 30 36 0 22-14 36-30 36s-30-14-30-36c0-20 12-36 30-36z"/><path d="M43 20c0-5 3-8 7-8s7 3 7 8v14H43z"/><circle cx="50" cy="10" r="4"/></svg>'
};

function renderProductArt(p){
  const gallery = document.getElementById('p-gallery');
  if(!gallery) return;
  if(p.billeder && p.billeder.length){
    let activeIndex = 0;
    const renderMain = () => {
      const thumbsHtml = p.billeder.length > 1
        ? '<div class="art-thumbs">' + p.billeder.map((src,i) => `<button type="button" class="art-thumb${i===activeIndex?' active':''}" data-i="${i}"><img src="${src}" alt=""></button>`).join('') + '</div>'
        : '';
      gallery.innerHTML = `<div class="art-main"><img src="${p.billeder[activeIndex]}" alt="${p.navn}"></div>${thumbsHtml}`;
      gallery.querySelectorAll('.art-thumb').forEach(btn => {
        btn.addEventListener('click', () => { activeIndex = parseInt(btn.dataset.i,10); renderMain(); });
      });
    };
    renderMain();
  } else {
    gallery.innerHTML = `<div class="art-main art-main-icon">${ART_ICONS[p.icon] || ''}</div>`;
  }
}
async function populateProductPage(){
  const detail = document.querySelector('.p-detail');
  if(!detail) return;
  await loadProducts();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || Object.keys(PRODUCTS)[0];
  const p = PRODUCTS[id] || PRODUCTS[Object.keys(PRODUCTS)[0]];
  if(!p) return;

  document.title = p.navn + ' — Koko Keramik';
  const eyebrow = document.getElementById('p-eyebrow');
  if(eyebrow) eyebrow.textContent = p.typeLabel + ' · ' + p.serieLabel;
  const title = document.getElementById('p-title');
  if(title) title.textContent = p.navn;
  const price = document.getElementById('p-price');
  if(price) price.textContent = p.pris;
  const unika = document.getElementById('p-unika');
  if(unika) unika.textContent = 'Unika ' + id + ' — solgt kun én gang';
  const story = document.getElementById('p-story');
  if(story) story.innerHTML = p.story.map(t => '<p>' + t + '</p>').join('');
  const maal = document.getElementById('p-maal');
  if(maal){
    const dims = [p.maal.hoejde, p.maal.bredde, p.maal.laengde].filter(Boolean);
    maal.textContent = dims.length ? dims.join(' × ') + ' cm' : '–';
  }
  const vaegt = document.getElementById('p-vaegt');
  if(vaegt) vaegt.textContent = p.vaegt || '–';
  const farver = document.getElementById('p-farver');
  if(farver) farver.textContent = p.farver.length ? p.farver.join(', ') : '–';
  const glasur = document.getElementById('p-glasur');
  if(glasur) glasur.textContent = p.specs.glasur || '–';
  const braending = document.getElementById('p-braending');
  if(braending) braending.textContent = p.specs.braending || '–';
  const egnet = document.getElementById('p-egnet');
  if(egnet) egnet.textContent = p.specs.egnet || '–';
  const lavet = document.getElementById('p-lavet');
  if(lavet) lavet.textContent = p.specs.lavet || '–';
  const moreLink = document.getElementById('p-more-link');
  if(moreLink){ moreLink.href = p.crumbHref; moreLink.textContent = p.moreText; }
  const crumbCat = document.getElementById('p-crumb-cat');
  if(crumbCat){ crumbCat.href = p.crumbHref; crumbCat.textContent = p.crumbCat; }
  const crumbName = document.getElementById('p-crumb-name');
  if(crumbName) crumbName.textContent = p.navn;
  renderProductArt(p);
}

async function renderShopGrid(){
  const grid = document.querySelector('.product-grid');
  if(!grid) return;
  await loadProducts();
  grid.innerHTML = Object.keys(PRODUCTS).map(id => {
    const p = PRODUCTS[id];
    const img = p.billeder && p.billeder[0]
      ? `<img src="${p.billeder[0]}" alt="${p.navn}" style="width:100%;height:100%;object-fit:cover;">`
      : (ART_ICONS[p.icon] || '');
    const desc = (p.story && p.story[0]) ? p.story[0].slice(0,90) + '…' : '';
    return `
      <a href="produkt.html?id=${id}" class="p-card" data-cat="${p.cat}">
        <div class="thumb"><span class="stock">Unika · ${p.navn}</span>${img}</div>
        <div class="row"><h3>${p.navn}</h3><span class="price">${p.pris}</span></div>
        <div class="cat">${p.typeLabel}</div>
        <p class="desc">${desc}</p>
      </a>`;
  }).join('');
  setupShopFilter();
}

function setupShopFilter(){
  const tabs = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.p-card');
  const applyFilter = (cat) => {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
    cards.forEach(card => {
      const show = cat === 'alle' || card.dataset.cat === cat;
      card.style.display = show ? '' : 'none';
    });
  };
  tabs.forEach(tab => tab.addEventListener('click', () => applyFilter(tab.dataset.cat)));
  const hash = window.location.hash.replace('#', '');
  applyFilter(hash && document.querySelector(`.tab[data-cat="${hash}"]`) ? hash : 'alle');
}

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  populateProductPage();

  // Rotating announcement bar
  const items = document.querySelectorAll('.announce-item');
  if (items.length > 1) {
    let idx = 0;
    setInterval(() => {
      items[idx].classList.remove('show');
      idx = (idx + 1) % items.length;
      items[idx].classList.add('show');
    }, 3800);
  }

  const burger = document.querySelector('.burger');
  const links = document.querySelector('nav.links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      links.classList.toggle('open');
      burger.setAttribute('aria-expanded', links.classList.contains('open'));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Scroll reveal
  const revealItems = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && revealItems.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealItems.forEach(el => io.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('in'));
  }

 renderShopGrid();

  // Demo contact form — prevent real submit, show a styled confirmation
  const form = document.querySelector('#demo-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      const original = btn.textContent;
      btn.textContent = 'Sendt ✓ (demo)';
      setTimeout(() => { btn.textContent = original; }, 2200);
    });
  }

  // Live wave-divider — layered shore water + foam, inspired by the
  // open-source "wavify" technique (sine-driven SVG path), rebuilt
  // dependency-free so no extra library has to be loaded.
  const waveHosts = document.querySelectorAll('[data-wave]');
  if (waveHosts.length) {
    const svgns = 'http://www.w3.org/2000/svg';
    const W = 1200, H = 58;
    const instances = [];

    waveHosts.forEach(host => {
      const svg = document.createElementNS(svgns, 'svg');
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svg.setAttribute('preserveAspectRatio', 'none');

      const pShallow = document.createElementNS(svgns, 'path');
      pShallow.setAttribute('fill', 'var(--sage)');
      pShallow.setAttribute('opacity', '0.35');

      const pShore = document.createElementNS(svgns, 'path');
      pShore.setAttribute('fill', 'var(--sage)');
      pShore.setAttribute('opacity', '0.6');

      const pMid = document.createElementNS(svgns, 'path');
      pMid.setAttribute('fill', 'var(--sage-deep)');
      pMid.setAttribute('opacity', '0.65');

      const pDeep = document.createElementNS(svgns, 'path');
      pDeep.setAttribute('fill', 'var(--sage-deep)');
      pDeep.setAttribute('opacity', '0.9');

      const foamG = document.createElementNS(svgns, 'g');
      const dots = [];
      const dotCount = Math.max(28, Math.round(W / 14));
      for (let i = 0; i < dotCount; i++) {
        const c = document.createElementNS(svgns, 'circle');
        c.setAttribute('r', (0.8 + Math.random() * 1.8).toFixed(1));
        c.setAttribute('fill', 'var(--foam)');
        c.setAttribute('opacity', (0.4 + Math.random() * 0.5).toFixed(2));
        foamG.appendChild(c);
        dots.push({ el: c, x: (i / dotCount) * W + Math.random() * 14, phase: Math.random() * Math.PI * 2, band: i % 3 });
      }

      svg.appendChild(pShallow);
      svg.appendChild(pShore);
      svg.appendChild(pMid);
      svg.appendChild(pDeep);
      svg.appendChild(foamG);
      host.appendChild(svg);
      instances.push({ pShallow, pShore, pMid, pDeep, dots });
    });

    const path = (baseY, amp, freq, phase) => {
      let d = `M0,${H} `;
      for (let x = 0; x <= W; x += 24) {
        const y = baseY + Math.sin(x * freq + phase) * amp;
        d += `L${x},${y.toFixed(1)} `;
      }
      d += `L${W},${H} Z`;
      return d;
    };

    let t = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = () => {
      t += reduceMotion ? 0 : 0.014;
      instances.forEach(inst => {
        const shallowPhase = t * 1.1;
        const shorePhase = t * 1.4;
        const midPhase = t * 1.7 + 2;
        const deepPhase = t * 1.9 + 3;
        inst.pShallow.setAttribute('d', path(14, 7, 0.006, shallowPhase));
        inst.pShore.setAttribute('d', path(22, 9, 0.008, shorePhase));
        inst.pMid.setAttribute('d', path(29, 8, 0.0095, midPhase));
        inst.pDeep.setAttribute('d', path(36, 7, 0.011, deepPhase));
        inst.dots.forEach(d => {
          const bandY = d.band === 0 ? 14 : d.band === 1 ? 22 : 29;
          const bandPhase = d.band === 0 ? shallowPhase : d.band === 1 ? shorePhase : midPhase;
          const bandFreq = d.band === 0 ? 0.006 : d.band === 1 ? 0.008 : 0.0095;
          const y = bandY + Math.sin(d.x * bandFreq + bandPhase) * 8 - 5 - Math.sin(t * 2.6 + d.phase) * 2.5;
          d.el.setAttribute('cx', d.x);
          d.el.setAttribute('cy', y);
        });
      });
      if (!reduceMotion) requestAnimationFrame(step);
    };
    step();
  }
});
const HUSKESEDDEL_KEY = 'kokoHuskeseddel';
const HUSKESEDDEL_EMAIL = 'ekstramsj@gmail.com';

function getHuskeseddel(){
  try{ return JSON.parse(localStorage.getItem(HUSKESEDDEL_KEY)) || []; }
  catch(e){ return []; }
}
function saveHuskeseddel(list){
  localStorage.setItem(HUSKESEDDEL_KEY, JSON.stringify(list));
  renderHuskeseddel();
}
function addToHuskeseddel(item){
  const list = getHuskeseddel();
  list.push(item);
  saveHuskeseddel(list);
}
function removeFromHuskeseddel(index){
  const list = getHuskeseddel();
  list.splice(index,1);
  saveHuskeseddel(list);
}
function renderHuskeseddel(){
  const list = getHuskeseddel();
  document.querySelectorAll('.huskeseddel-count').forEach(el => {
    el.textContent = list.length;
    el.style.display = list.length ? 'flex' : 'none';
  });
  const body = document.querySelector('.huskeseddel-body');
  if(!body) return;
  if(!list.length){
    body.innerHTML = '<p class="huskeseddel-empty">Din huskeseddel er tom endnu.</p>';
    return;
  }
  body.innerHTML = list.map((item, i) => `
    <div class="huskeseddel-item">
      <div><strong>${item.navn}</strong><span>${item.pris}${item.unika ? ' · ' + item.unika : ''}</span></div>
      <button type="button" class="huskeseddel-remove" data-index="${i}" aria-label="Fjern">×</button>
    </div>
  `).join('');
  body.querySelectorAll('.huskeseddel-remove').forEach(btn=>{
    btn.addEventListener('click', () => removeFromHuskeseddel(parseInt(btn.dataset.index,10)));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHuskeseddel();

  const toggle = document.querySelector('.huskeseddel-toggle');
  const drawer = document.querySelector('.huskeseddel-drawer');
  const closeBtn = document.querySelector('.huskeseddel-close');
  if(toggle && drawer) toggle.addEventListener('click', () => drawer.classList.add('open'));
  if(closeBtn && drawer) closeBtn.addEventListener('click', () => drawer.classList.remove('open'));

  const addBtn = document.querySelector('.add-to-huskeseddel');
  if(addBtn){
    addBtn.addEventListener('click', () => {
      const navn = document.querySelector('h1')?.textContent.trim() || 'Produkt';
      const pris = document.querySelector('.p-detail .price')?.textContent.trim() || '';
      const unika = document.querySelector('.tag-unika')?.textContent.trim() || '';
      addToHuskeseddel({ navn, pris, unika });
      const original = addBtn.textContent;
      addBtn.textContent = 'Tilføjet ✓';
      setTimeout(() => { addBtn.textContent = original; }, 1800);
    });
  }

  const sendBtn = document.querySelector('.huskeseddel-send');
  if(sendBtn){
    sendBtn.addEventListener('click', () => {
      const list = getHuskeseddel();
      if(!list.length) return;
      const subject = encodeURIComponent('Huskeseddel fra Sen-keramik');
      const bodyText = list.map(i => `- ${i.navn} (${i.pris}${i.unika ? ', ' + i.unika : ''})`).join('%0D%0A');
      window.location.href = `mailto:${HUSKESEDDEL_EMAIL}?subject=${subject}&body=${bodyText}`;
    });
  }
});
