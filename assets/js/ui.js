// Enhanced UI interactions: nav toggle, theme, counters, lightbox, and AOS integration
(() => {
  const root = document.documentElement;
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primary-nav');
  const themeToggle = document.getElementById('themeToggle');
  const scrollTopBtn = document.getElementById('scrollTop');

  // --- 1. Nav Toggle for mobile ---
  if (navToggle && primaryNav) {
    const toggleNav = () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('open');
    };
    navToggle.addEventListener('click', toggleNav);

    // Close nav on outside click
    document.addEventListener('click', (e) => {
      if (!primaryNav.contains(e.target) && !navToggle.contains(e.target) && primaryNav.classList.contains('open')) {
        toggleNav();
      }
    });

    // Accessibility: close mobile menu on link click
    document.querySelectorAll('#primary-nav a').forEach(a => a.addEventListener('click', () => {
      if (primaryNav.classList.contains('open')) {
        toggleNav();
      }
    }));
  }

  // --- 2. Theme handling ---
  const applyTheme = (t) => {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('site-theme', t); } catch (e) {}
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(t === 'dark'));
      themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
    }
  };
  const savedTheme = (() => { try { return localStorage.getItem('site-theme'); } catch(e) { return null } })();
  // Apply saved theme or default based on OS preference (prefers-color-scheme: light)
  applyTheme(savedTheme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  if (themeToggle) themeToggle.addEventListener('click', () => applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));


  // --- 3. Animate KPI numbers (شمارشگرهای آماری) با Easing پیشرفته ---
  const animateNumber = (el, target, duration = 2000) => {
    const start = 0;
    const startTime = performance.now();
    
    // تابع Easing برای حرکت نرم‌تر و جذاب‌تر اعداد
    const easeOutQuad = (t) => t * (2 - t); 
    
    const step = (now) => {
      const timeElapsed = now - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeOutQuad(progress); // استفاده از Easing
      
      // گرفتن پسوند در صورت وجود
      const suffix = el.getAttribute('data-suffix') || '';

      const value = Math.floor(easedProgress * (target - start) + start);
      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // اطمینان از نمایش دقیق عدد نهایی
        el.textContent = target + suffix; 
      }
    };
    requestAnimationFrame(step);
  };
  
  const kpis = document.querySelectorAll('.kpi strong[data-target]');
  if (kpis.length && 'IntersectionObserver' in window) {
    const kpiObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          animateNumber(el, Number(el.getAttribute('data-target')) || 0);
          kpiObs.unobserve(el);
        }
      });
    }, {threshold: 0.4});
    kpis.forEach(k => kpiObs.observe(k));
  }
  
  // --- 4. Scroll top ---
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
    window.addEventListener('scroll', () => {
      if (window.scrollY > 320) scrollTopBtn.classList.add('visible');
      else scrollTopBtn.classList.remove('visible');
    }, { passive: true }); // passive listener برای عملکرد بهتر اسکرول
  }
  
  // --- 5. Simple lightbox for product images (گالری تصاویر) ---
  const lbOverlay = document.createElement('div');
  lbOverlay.className = 'lb-overlay';
  lbOverlay.setAttribute('role', 'dialog');
  lbOverlay.setAttribute('aria-modal', 'true');
  lbOverlay.tabIndex = -1;
  const lbImg = document.createElement('img');
  lbOverlay.appendChild(lbImg);
  document.body.appendChild(lbOverlay);

  const closeLightbox = () => lbOverlay.classList.remove('open');
  const openLightbox = (src) => {
      lbImg.src = src;
      lbOverlay.classList.add('open');
      lbOverlay.focus();
  };

  document.addEventListener('click', (e) => {
    const tgt = e.target;
    // فقط روی تصاویری که داخل کارت محصول هستند، لایت باکس باز شود
    if (tgt.matches('.product img')) {
      openLightbox(tgt.src);
    } else if (tgt === lbOverlay) {
      closeLightbox();
    }
  });

  // --- 6. Escape key handler ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (primaryNav && primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        navToggle && navToggle.setAttribute('aria-expanded', 'false');
      }
      closeLightbox();
    }
  });

  // --- 7. AOS (Animate On Scroll) Initialization (جدید) ---
  document.addEventListener('DOMContentLoaded', () => {
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,          // مدت زمان بیشتر برای انیمیشن نرم‌تر
          once: true,              // انیمیشن فقط یک بار اجرا شود
          easing: 'ease-out-back', // افکت جذاب‌تر برای ورود
        });
      }
  });

})();