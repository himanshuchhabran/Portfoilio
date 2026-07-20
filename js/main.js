/* ═══════════════════════════════════════════════════
   MAIN.JS — Core functionality and interactions
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ── Initialize All Features ──────────────────── */
  initScrollProgress();
  initNavigation();
  initScrollReveal();
  initStatCounters();
  initHeroStats();
  initProjectFilters();
  initBackToTop();
  initMagneticButtons();
  initFooterYear();
  initButtonRipple();

  /* ── Scroll Progress Bar ──────────────────────── */
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener(
      'scroll',
      () => {
        const winScroll = document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
      },
      { passive: true }
    );
  }

  /* ── Navigation Features ──────────────────────── */
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    // Mobile menu toggle
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
        body.classList.toggle('mobile-open');
      });
    }

    // Close mobile nav on link click
    navLinks.forEach((link) =>
      link.addEventListener('click', () => {
        body.classList.remove('mobile-open');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      })
    );

    // Scroll shadow effect
    function updateHeaderStyle() {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', updateHeaderStyle, { passive: true });
    updateHeaderStyle();

    // Active nav link highlighting
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove('active'));
            const activeLink = document.querySelector(
              `.nav-link[href="#${entry.target.id}"]`
            );
            if (activeLink) activeLink.classList.add('active');
          }
        });
      },
      { threshold: 0.4, rootMargin: '-20% 0px -20% 0px' }
    );

    sections.forEach((section) => navObserver.observe(section));
  }

  /* ── Scroll Reveal Animation ──────────────────── */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .stagger');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ── About Section Stat Counters ──────────────── */
  function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((stat) => statsObserver.observe(stat));

    function animateCounter(element) {
      const target = parseInt(element.getAttribute('data-target'), 10);
      const suffix = target <= 50 ? '+' : target === 100 ? '%' : '+';
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const update = () => {
        current = Math.min(current + step, target);
        element.textContent = Math.ceil(current) + suffix;
        if (current < target) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    }
  }

  /* ── Hero Stats Counters ──────────────────────── */
  function initHeroStats() {
    const heroStats = document.querySelectorAll('.hero-stat-value');
    if (!heroStats.length) return;

    setTimeout(() => {
      heroStats.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
          current = Math.min(current + step, target);
          stat.textContent = Math.ceil(current) + (target <= 15 ? '+' : '+');
          if (current < target) {
            requestAnimationFrame(update);
          }
        };

        requestAnimationFrame(update);
      });
    }, 1200);
  }

  /* ── Project Filters ──────────────────────────── */
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter projects with animation
        projectCards.forEach((card, index) => {
          const categories = card.getAttribute('data-category') || '';

          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'flex';
            card.style.animation = `none`;
            setTimeout(() => {
              card.style.animation = `fadeInUp 0.5s ease forwards ${
                index * 0.1
              }s`;
            }, 10);
          } else {
            card.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /* ── Back to Top Button ───────────────────────── */
  function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener(
      'scroll',
      () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 500);
      },
      { passive: true }
    );

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  /* ── Magnetic Button Effect ───────────────────── */
  function initMagneticButtons() {
    if (window.matchMedia('(hover: hover)').matches) {
      const magneticBtns = document.querySelectorAll('.btn-primary, .btn-gold');

      magneticBtns.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate(0, 0)';
        });
      });
    }
  }

  /* ── Footer Year ──────────────────────────────── */
  function initFooterYear() {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* ── Button Ripple Effect ─────────────────────── */
  function initButtonRipple() {
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';

        const size = Math.max(this.offsetWidth, this.offsetHeight);
        const rect = this.getBoundingClientRect();

        ripple.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${e.clientX - rect.left - size / 2}px;
          top: ${e.clientY - rect.top - size / 2}px;
        `;

        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  /* ── Enhanced Tag Hover ───────────────────────── */
  document.querySelectorAll('.tag').forEach((tag) => {
    tag.style.transition = 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  /* ── Smooth Anchor Scrolling ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });

  /* ── Console Easter Egg ───────────────────────── */
  console.log(
    '%c👋 Hello, curious developer!',
    'font-size: 20px; font-weight: bold; color: #4AABCA;'
  );
  console.log(
    '%cLooking for something? Feel free to reach out!',
    'font-size: 14px; color: #555;'
  );
});

/* ── Fade Out Animation Keyframe ──────────────── */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
`;
document.head.appendChild(style);
