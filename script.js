// ایجاد ذرات معلق
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// منوی موبایل
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// افکت تایپ
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// انیمیشن اسکرول نوار
function initScrollNavbar() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// انیمیشن شمارنده آمار
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        
        const updateCounter = () => {
            const count = +counter.textContent;
            if (count < target) {
                counter.textContent = Math.ceil(count + increment);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// افکت Tilt برای کارت‌ها
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// لود انیمیشن‌ها
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// اضافه کردن کلاس انیمیشن
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initMobileMenu();
    initScrollNavbar();
    initTiltEffect();
    initAnimations();
    
    // تایپ افکت برای عنوان
    const titleElement = document.querySelector('.typing-effect');
    if (titleElement) {
        const text = titleElement.getAttribute('data-text');
        typeWriter(titleElement, text, 150);
    }
    
    // انیمیشن شمارنده وقتی در دید باشد
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(statsSection);
            }
        });
        observer.observe(statsSection);
    }
});

// افکت صوتی برای کلیک‌ها (اختیاری)
function addClickSound() {
    const clickSound = new Audio('click.mp3');
    clickSound.volume = 0.3;
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        });
    });
}