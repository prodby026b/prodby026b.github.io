// Lightweight UI interactions: nav toggle, theme, reveal, counters, lightbox
(() => {
  const root = document.documentElement;
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primary-nav');
  const themeToggle = document.getElementById('themeToggle');
  const scrollTopBtn = document.getElementById('scrollTop');

  // Nav toggle for mobile
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('open');
    });
    // close nav on outside click
    document.addEventListener('click', (e) => {
      if (!primaryNav.contains(e.target) && !navToggle.contains(e.target) && primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Theme handling
  const applyTheme = (t) => {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('site-theme', t); } catch (e) {}
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(t === 'dark'));
      themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
    }
  };
  const saved = (() => { try { return localStorage.getItem('site-theme'); } catch(e) { return null } })();
  applyTheme(saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  if (themeToggle) themeToggle.addEventListener('click', () => applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  // Reveal on scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && reveals.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, {threshold: 0.12});
    reveals.forEach(r => obs.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('revealed'));
  }

  // Animate KPI numbers (data-target attribute)
  const animateNumber = (el, target, duration = 1200) => {
    const start = 0;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      el.textContent = value + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const kpis = document.querySelectorAll('.kpi strong[data-target]');
  if (kpis.length) {
    const kpiObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          animateNumber(el, Number(el.getAttribute('data-target')) || 0, 1200);
          kpiObs.unobserve(el);
        }
      });
    }, {threshold: 0.4});
    kpis.forEach(k => kpiObs.observe(k));
  }

  // Scroll top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
    window.addEventListener('scroll', () => {
      if (window.scrollY > 320) scrollTopBtn.classList.add('visible');
      else scrollTopBtn.classList.remove('visible');
    });
  }

  // Simple lightbox for product images with class .product img
  const lbOverlay = document.createElement('div');
  lbOverlay.className = 'lb-overlay';
  lbOverlay.setAttribute('role', 'dialog');
  lbOverlay.setAttribute('aria-modal', 'true');
  lbOverlay.tabIndex = -1;
  const lbImg = document.createElement('img');
  lbOverlay.appendChild(lbImg);
  document.body.appendChild(lbOverlay);

  document.addEventListener('click', (e) => {
    const tgt = e.target;
    if (tgt.matches('.product img')) {
      lbImg.src = tgt.src;
      lbOverlay.classList.add('open');
      lbOverlay.focus();
    } else if (tgt === lbOverlay) {
      lbOverlay.classList.remove('open');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (primaryNav && primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        navToggle && navToggle.setAttribute('aria-expanded', 'false');
      }
      lbOverlay.classList.remove('open');
    }
  });

  // Accessibility: close mobile menu on link click
  document.querySelectorAll('#primary-nav a').forEach(a => a.addEventListener('click', () => {
    if (primaryNav && primaryNav.classList.contains('open')) {
      primaryNav.classList.remove('open');
      navToggle && navToggle.setAttribute('aria-expanded', 'false');
    }
  }));
})();
