// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
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
  const items = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && items.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('in'));
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
      pDeep.setAttribute('fill', 'var(--clay)');
      pDeep.setAttribute('opacity', '0.9');

      const foamG = document.createElementNS(svgns, 'g');
      const dots = [];
      const dotCount = Math.max(28, Math.round(W / 16));
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
