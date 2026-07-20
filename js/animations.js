/* ═══════════════════════════════════════════════════
   ANIMATIONS.JS — Advanced animations and effects
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCursorGlow();
    initParallax();
    initTextAnimations();
  });

  /* ── Animated Particles Background ──────────────── */
  function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    const particleCount = window.innerWidth < 768 ? 15 : 30;
    const colors = ['#4AABCA', '#C49A2A', '#E8DDD0'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const size = Math.random() * 6 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 15 + 10;
      const animationDelay = Math.random() * 5;
      const opacity = Math.random() * 0.3 + 0.1;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${left}%;
        top: ${Math.random() * 100}%;
        opacity: ${opacity};
        animation: particleFloat ${animationDuration}s ease-in-out infinite;
        animation-delay: ${animationDelay}s;
        pointer-events: none;
      `;

      particlesContainer.appendChild(particle);
    }
  }

  /* ── Custom Cursor Glow ─────────────────────────── */
  function initCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch devices

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = -100;
    let mouseY = -100;
    let glowX = -100;
    let glowY = -100;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      glow.style.opacity = '1';
    });

    function lerp(start, end, factor) {
      return start + (end - start) * factor;
    }

    function animateGlow() {
      glowX = lerp(glowX, mouseX, 0.15);
      glowY = lerp(glowY, mouseY, 0.15);

      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';

      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  /* ── Parallax Effect on Decorative Elements ─────── */
  function initParallax() {
    const parallaxElements = document.querySelectorAll(
      '.decor-orb, .floating-star'
    );
    if (!parallaxElements.length) return;

    let ticking = false;

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            parallaxElements.forEach((el) => {
              const speed = el.classList.contains('floating-star') ? 0.15 : 0.08;
              const yPos = scrollY * speed;
              el.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
          });

          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ── Advanced Text Animations ───────────────────── */
  function initTextAnimations() {
    // Add shimmer effect to specific elements on scroll into view
    const shimmerElements = document.querySelectorAll('.section-title');

    const shimmerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'gradientShift 8s ease infinite';
            shimmerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    shimmerElements.forEach((el) => shimmerObserver.observe(el));
  }

  /* ── Intersection Observer with Callbacks ─────── */
  function observeElements(selector, callback, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px',
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, defaultOptions);

    elements.forEach((el) => observer.observe(el));
  }

  /* ── Smooth Number Counter ──────────────────────── */
  function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const suffix = element.dataset.suffix || '';

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);

      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /* ── Stagger Animation Helper ───────────────────── */
  function staggerAnimation(elements, animationClass, delayIncrement = 100) {
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add(animationClass);
      }, index * delayIncrement);
    });
  }

  /* ── Export utilities for global access ─────────── */
  window.portfolioAnimations = {
    observeElements,
    animateNumber,
    staggerAnimation,
  };
})();
