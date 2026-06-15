/* ============================================
   NovaTech Solutions – script.js
   ============================================ */

/* ---------- NAV scroll effect ---------- */
const nav = document.getElementById('mainNav');
function handleScroll() {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

/* ---------- Hamburger / mobile menu ---------- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---------- Active nav link ---------- */
(function setActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ---------- Scroll Reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObs.observe(el));

/* ---------- Contact form validation ---------- */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    form.querySelectorAll('.error-msg').forEach(m => m.classList.remove('show'));
    form.querySelectorAll('input, select, textarea').forEach(f => f.classList.remove('error'));

    // Validate each required field
    const rules = [
      { id: 'fname',   msg: 'fnamErr',   test: v => v.trim().length >= 2,             err: 'Please enter your first name.' },
      { id: 'lname',   msg: 'lnamErr',   test: v => v.trim().length >= 2,             err: 'Please enter your last name.' },
      { id: 'email',   msg: 'emailErr',  test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), err: 'Please enter a valid email address.' },
      { id: 'phone',   msg: 'phoneErr',  test: v => v === '' || /^[\d\s\+\-\(\)]{7,15}$/.test(v), err: 'Please enter a valid phone number.' },
      { id: 'service', msg: 'serviceErr',test: v => v !== '',                          err: 'Please select a service.' },
      { id: 'message', msg: 'msgErr',    test: v => v.trim().length >= 20,            err: 'Message must be at least 20 characters.' },
    ];

    rules.forEach(r => {
      const field = document.getElementById(r.id);
      const errEl = document.getElementById(r.msg);
      if (field && !r.test(field.value)) {
        field.classList.add('error');
        if (errEl) { errEl.textContent = r.err; errEl.classList.add('show'); }
        valid = false;
      }
    });

    if (valid) {
      // Simulate form submission
      const formBody   = form.querySelector('.form-fields');
      const formSuccess = form.querySelector('.form-success');
      formBody.style.display = 'none';
      formSuccess.classList.add('show');
    }
  });
}

/* ---------- Newsletter (footer) ---------- */
document.querySelectorAll('.newsletter-form').forEach(nf => {
  nf.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = this.querySelector('input');
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      input.value = '';
      input.placeholder = '✓ Subscribed! Thank you.';
      setTimeout(() => { input.placeholder = 'Your email address'; }, 3000);
    }
  });
});

/* ---------- Smooth anchor scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});