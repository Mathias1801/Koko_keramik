const PRODUCTS = {
  "014": { navn:"Bølgeskål i havblå", pris:"385 kr.", icon:"skaal", typeLabel:"Skål", serieLabel:"Kopper & Skåle-serien", crumbCat:"Skåle", crumbHref:"butik.html#skaale", moreText:"Se flere skåle",
    story:["Drejet en tidlig morgen i marts, hvor lyset faldt skævt ind gennem værkstedsvinduet. Leret var lidt koldere end normalt den dag, og det satte sit præg på formen — kanten blev en smule mere ujævn end planlagt, hvilket vi endte med at elske.","Glasuren er blandet i hånden ud fra tre forskellige blå oxider for at efterligne vandets bevægelse. Fordi glasuren opfører sig lidt forskelligt hver gang den brændes, får netop denne skål et mønster, der aldrig kan gentages præcist — hverken af os eller nogen andre."],
    specs:{maal:"Ø 22 cm, højde 8 cm",vaegt:"ca. 540 g",glasur:"Håndblandet, havblå",braending:"1260°, stentøjsler",egnet:"Ovn, mikroovn, opvaskemaskine",lavet:"Marts 2026"} },
  "021": { navn:"Morgenkop, jordbrun", pris:"245 kr.", icon:"kop", typeLabel:"Kop", serieLabel:"Kopper-serien", crumbCat:"Kopper", crumbHref:"butik.html#kopper", moreText:"Se flere kopper",
    story:["En tykvægget morgenkop, formet så den ligger godt i hånden fra første slurk kaffe. Den rå lerkant ved foden er bevidst ikke glaseret — en påmindelse om, at koppen startede som almindeligt ler.","Jordbrun glasur, brændt så overfladen får en let ru struktur foroven og et blødt skær forneden. Rummer 3 dl."],
    specs:{maal:"Ø 8.5 cm, højde 9 cm",vaegt:"ca. 320 g",glasur:"Jordbrun, mat",braending:"1260°, stentøjsler",egnet:"Ovn, mikroovn, opvaskemaskine",lavet:"Februar 2026"} },
  "009": { navn:"Fladt serveringsfad", pris:"420 kr.", icon:"fad", typeLabel:"Fad", serieLabel:"Fade & tallerken-serien", crumbCat:"Fade & tallerkener", crumbHref:"butik.html#fade", moreText:"Se flere fade",
    story:["Et bredt, fladt fad tænkt til at samle folk om bordet — perfekt til brød, oste eller frugt. Den brede rand giver god plads til at gribe fat, uden at indholdet risikerer at rulle af.","Glaseret i et enkelt, roligt udtryk, så fadet fungerer som en stille baggrund for det, det bærer frem."],
    specs:{maal:"Ø 30 cm, højde 3 cm",vaegt:"ca. 780 g",glasur:"Mat, sandtonet",braending:"1260°, stentøjsler",egnet:"Ovn, mikroovn, opvaskemaskine",lavet:"Januar 2026"} },
  "031": { navn:"Julekugle, mat hvid", pris:"165 kr.", icon:"pynt", typeLabel:"Pynt", serieLabel:"Pynt-serien", crumbCat:"Pynt", crumbHref:"butik.html#pynt", moreText:"Se mere pynt",
    story:["En hånddrejet julekugle med en let struktureret, mat hvid overflade — et roligt modstykke til det blanke og skinnende, som ellers fylder juletræet.","Hængt op med naturgarn, så den kan gå i arv fra sæson til sæson uden at blive slidt."],
    specs:{maal:"Ø 7 cm",vaegt:"ca. 90 g",glasur:"Mat hvid",braending:"1260°, stentøjsler",egnet:"Indendørs ophæng",lavet:"November 2025"} },
  "017": { navn:"Espressokop, mosgrøn", pris:"195 kr.", icon:"kop", typeLabel:"Kop", serieLabel:"Kopper-serien", crumbCat:"Kopper", crumbHref:"butik.html#kopper", moreText:"Se flere kopper",
    story:["Lille og tætsiddende — formet til den koncentrerede espresso-slurk snarere end den lange kaffepause. Hanken er trukket tæt ind til koppens krop, så den ligger stabilt mellem to fingre.","Den mosgrønne glasur mørkner let ned mod foden, hvor glasuren samler sig tykkere under brændingen."],
    specs:{maal:"Ø 6 cm, højde 5.5 cm",vaegt:"ca. 140 g",glasur:"Mosgrøn",braending:"1260°, stentøjsler",egnet:"Ovn, mikroovn, opvaskemaskine",lavet:"Marts 2026"} },
  "026": { navn:"Morgenmadsskål, sandbeige", pris:"255 kr.", icon:"skaal", typeLabel:"Skål", serieLabel:"Kopper & Skåle-serien", crumbCat:"Skåle", crumbHref:"butik.html#skaale", moreText:"Se flere skåle",
    story:["En mindre skål i hverdagsformat — den rette størrelse til havregryn, yoghurt eller frugtsalat. Den sandbeige glasur er holdt bevidst enkel, så skålen passer ind uanset resten af bordet.","Kanten er let udadbøjet, så skålen er nem at spise direkte af."],
    specs:{maal:"Ø 15 cm, højde 6 cm",vaegt:"ca. 310 g",glasur:"Sandbeige, mat",braending:"1260°, stentøjsler",egnet:"Ovn, mikroovn, opvaskemaskine",lavet:"December 2025"} },
  "004": { navn:"Lille tallerken, oxidrød", pris:"210 kr.", icon:"fad", typeLabel:"Tallerken", serieLabel:"Fade & tallerken-serien", crumbCat:"Fade & tallerkener", crumbHref:"butik.html#fade", moreText:"Se flere tallerkener",
    story:["En lille tallerken til forret eller kage — kompakt nok til at stå fint ved siden af en kop kaffe, men med nok plads til, at maden ikke skubbes ud over kanten.","Den oxidrøde glasur varierer fra dyb rødbrun til et næsten sort skær, alt efter hvor tykt glasuren er lagt på."],
    specs:{maal:"Ø 18 cm",vaegt:"ca. 380 g",glasur:"Oxidrød",braending:"1260°, stentøjsler",egnet:"Ovn, mikroovn, opvaskemaskine",lavet:"Oktober 2025"} },
  "033": { navn:"Vægornament, solbrændt", pris:"220 kr.", icon:"pynt", typeLabel:"Pynt", serieLabel:"Pynt-serien", crumbCat:"Pynt", crumbHref:"butik.html#pynt", moreText:"Se mere pynt",
    story:["Et rundt vægornament i en solbrændt, jordfarvet glasur — tænkt som et lille, stille blikfang på en ellers bar væg.","Hængt på en læderrem, så det kan hænges direkte på et søm eller bindes fast til en gren."],
    specs:{maal:"Ø 14 cm",vaegt:"ca. 160 g",glasur:"Solbrændt, mat",braending:"1260°, stentøjsler",egnet:"Indendørs ophæng",lavet:"September 2025"} },
  "019": { navn:"Tekop m. underskål", pris:"310 kr.", icon:"kop", typeLabel:"Kop", serieLabel:"Kopper-serien", crumbCat:"Kopper", crumbHref:"butik.html#kopper", moreText:"Se flere kopper",
    story:["Sælges som sæt — kop og underskål drejet samme dag, så glasuren krakelerer på begge dele på nogenlunde samme måde.","Den blegblå glasur revner i et fint krakeleringsmønster under brændingen, som fremhæves yderligere, når koppen bruges og patineres over tid."],
    specs:{maal:"Kop Ø 8 cm, underskål Ø 14 cm",vaegt:"ca. 410 g (sæt)",glasur:"Blegblå med krakelering",braending:"1260°, stentøjsler",egnet:"Ovn, mikroovn, opvaskemaskine",lavet:"April 2026"} }
};

function populateProductPage(){
  const detail = document.querySelector('.p-detail');
  if(!detail) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '014';
  const p = PRODUCTS[id] || PRODUCTS['014'];

  document.title = p.navn + ' — Koko Keramik';
  const eyebrow = document.getElementById('p-eyebrow');
  if(eyebrow) eyebrow.textContent = p.typeLabel + ' · ' + p.serieLabel;
  const title = document.getElementById('p-title');
  if(title) title.textContent = p.navn;
  const price = document.getElementById('p-price');
  if(price) price.textContent = p.pris;
  const unika = document.getElementById('p-unika');
  if(unika) unika.textContent = 'Unika nr. ' + id + ' — solgt kun én gang';
  const story = document.getElementById('p-story');
  if(story) story.innerHTML = p.story.map(t => '<p>' + t + '</p>').join('');
  const specMap = { 'p-maal':'maal','p-vaegt':'vaegt','p-glasur':'glasur','p-braending':'braending','p-egnet':'egnet','p-lavet':'lavet' };
  Object.keys(specMap).forEach(elId => {
    const el = document.getElementById(elId);
    if(el) el.textContent = p.specs[specMap[elId]];
  });
  const moreLink = document.getElementById('p-more-link');
  if(moreLink){ moreLink.href = p.crumbHref; moreLink.textContent = p.moreText; }
  const crumbCat = document.getElementById('p-crumb-cat');
  if(crumbCat){ crumbCat.href = p.crumbHref; crumbCat.textContent = p.crumbCat; }
  const crumbName = document.getElementById('p-crumb-name');
  if(crumbName) crumbName.textContent = p.navn;
  document.querySelectorAll('.art-icon').forEach(svg => {
    svg.style.display = svg.dataset.icon === p.icon ? 'block' : 'none';
  });
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

  // Shop category filter (only present on butik.html)
  const tabs = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.p-card');
  const applyFilter = (cat) => {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
    cards.forEach(card => {
      const show = cat === 'alle' || card.dataset.cat === cat;
      card.style.display = show ? '' : 'none';
    });
  };
  if (tabs.length && cards.length) {
    tabs.forEach(tab => tab.addEventListener('click', () => applyFilter(tab.dataset.cat)));
    const hash = window.location.hash.replace('#', '');
    if (hash && document.querySelector(`.tab[data-cat="${hash}"]`)) applyFilter(hash);
  }

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
      const subject = encodeURIComponent('Huskeseddel fra Koko Keramik');
      const bodyText = list.map(i => `- ${i.navn} (${i.pris}${i.unika ? ', ' + i.unika : ''})`).join('%0D%0A');
      window.location.href = `mailto:${HUSKESEDDEL_EMAIL}?subject=${subject}&body=${bodyText}`;
    });
  }
});