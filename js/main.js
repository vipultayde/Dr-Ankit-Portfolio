/* ═══ Dr. Ankit Taide — Portfolio Scripts ═══ */

// ── Sticky navbar ──
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile nav ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

// ── Reveal on scroll ──
const revealEls = document.querySelectorAll('.reveal, .reveal-img');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// ── Animated counters ──
const counters = document.querySelectorAll('.stat-num');
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const dur = 1400;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('en-IN');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(c => counterIO.observe(c));

// ── Gallery lightbox ──
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
const lbCaption = lightbox.querySelector('figcaption');
const items = [...document.querySelectorAll('.g-item')];
let current = 0;

function showLightbox(i) {
  current = (i + items.length) % items.length;
  const fig = items[current];
  lbImg.src = fig.querySelector('img').src;
  lbImg.alt = fig.querySelector('img').alt;
  lbCaption.textContent = fig.dataset.caption || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

items.forEach((fig, i) => fig.addEventListener('click', () => showLightbox(i)));
lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); showLightbox(current - 1); });
lightbox.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); showLightbox(current + 1); });
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showLightbox(current - 1);
  if (e.key === 'ArrowRight') showLightbox(current + 1);
});

// ── Contact form → opens mail client with prefilled message ──
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Website enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nPhone: ${data.get('phone') || '-'}\nEmail: ${data.get('email')}\n\nMessage:\n${data.get('message')}`
  );
  window.location.href = `mailto:drankittaide@gmail.com?subject=${subject}&body=${body}`;
  formNote.textContent = 'Opening your email app… You can also call directly at +91 80875 81077.';
});

// ── Footer year ──
document.getElementById('year').textContent = new Date().getFullYear();
