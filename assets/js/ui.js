// Lightweight UI interactions: nav toggle, theme, reveal, counters, lightbox
(() => {
  const root = document.documentElement;
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primary-nav');
  const themeToggle = document.getElementById('themeToggle');
  const scrollTopBtn = document.getElementById('scrollTop');

  // 1. Nav toggle for mobile
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
  applyTheme(saved === 'light' ? 'light' : 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // 2. Scroll to top button
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
      if (window.scrollY > 320) scrollTopBtn.classList.add('visible');
      else scrollTopBtn.classList.remove('visible');
    });
  }

  // 3. Simple lightbox for product images with class .product img
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
    // Note: If you want to show a full-resolution image, add data-full-src to your img tags in HTML
    if (tgt.matches('.product img')) {
      const fullSrc = tgt.getAttribute('data-full-src') || tgt.src; 
      lbImg.src = fullSrc;
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


  // 4. *** FEATURE: Counting Animation for KPIs ***
  const counters = document.querySelectorAll('.kpi strong[data-target]');
  const speed = 200; // Total steps for the animation (controls animation duration)

  const animateCounter = (el) => {
    const target = +el.getAttribute('data-target');
    const suffix = el.getAttribute('data-suffix') || '';
    let count = 0;
    const increment = target / speed;

    const updateCount = () => {
      if (count < target) {
        count += increment;
        el.textContent = Math.ceil(count) + suffix;
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target + suffix;
      }
    };
    updateCount();
  };

  // Setup Intersection Observer to trigger counting animation on scroll
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          animateCounter(entry.target);
          entry.target.classList.add('counted'); // Mark as counted to prevent re-triggering
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.7 // Trigger when 70% of the element is visible
    });

    counters.forEach(counter => observer.observe(counter));
  } else if (counters.length > 0) {
     // Fallback if IntersectionObserver is not supported (rare)
     counters.forEach(animateCounter);
  }
  
  // 5. Initialize AOS (Animation on Scroll)
  if (window.AOS) {
    AOS.init({
        duration: 900, 
        once: true, 
        easing: 'ease-out-cubic', // Global easing function for a smooth and dramatic entry
    });
  }

})();