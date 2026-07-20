/* form.js — contact form validation + submit handling */

document.addEventListener('DOMContentLoaded', () => {
  const form     = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  /* ── Helpers ──────────────────────────────────── */
  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function showError(msg) {
    feedback.className = 'form-feedback error';
    feedback.innerHTML = '&#10005; ' + msg;
  }

  function showSuccess() {
    feedback.className = 'form-feedback success';
    feedback.innerHTML =
      '<span style="font-size:20px;vertical-align:middle;margin-right:6px">✔</span>' +
      'Message sent! I\'ll get back to you within 24 hours.';
  }

  /* ── Input focus glow is handled via CSS :focus ─ */

  /* ── Inline field validation on blur ─────────── */
  const fields = form.querySelectorAll('.form-input');
  fields.forEach(field => {
    field.addEventListener('blur', () => {
      if (field.required && !field.value.trim()) {
        field.style.borderColor = '#e11d48';
      } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        field.style.borderColor = '#e11d48';
      } else {
        field.style.borderColor = '';
      }
    });
    field.addEventListener('input', () => {
      field.style.borderColor = '';
    });
  });

  /* ── Submit ───────────────────────────────────── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const service = form.querySelector('#service').value;
    const message = form.querySelector('#message').value.trim();

    // Validate
    if (!name) { showError('Please enter your name.'); return; }
    if (!email) { showError('Please enter your email.'); return; }
    if (!isValidEmail(email)) { showError('Please enter a valid email address.'); return; }
    if (!service) { showError('Please select a service.'); return; }
    if (!message) { showError('Please write a message.'); return; }

    // Loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.75';
    feedback.className = 'form-feedback';

    // Simulate async send (replace with real fetch/mailto in production)
    setTimeout(() => {
      showSuccess();
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '';
    }, 1400);
  });
});
