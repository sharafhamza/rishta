'use strict';

// ─── DATA ───
const QUOTES = [
  { text: "She had a galaxy in her chest and called it longing.", author: "— soft thoughts" },
  { text: "There is magic in the ordinary if you know how to look.", author: "— Rishta" },
  { text: "Every moment is a photograph waiting to be felt.", author: "— quiet notes" },
  { text: "The most beautiful things are felt, not said.", author: "— her diary" },
];

const SPARKLE_COUNT = 22;
const HEART_COUNT = 10;

// ─── GENERATE SPARKLES ───
(function generateSparkles() {
  const container = document.getElementById('sparklesContainer');
  if (!container) return;
  const hues = Array.from({ length: SPARKLE_COUNT }, (_, i) => 320 + Math.random() * 50);
  for (let i = 0; i < SPARKLE_COUNT; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = 5 + Math.random() * 10;
    const delay = Math.random() * 5;
    const dur = 3 + Math.random() * 4;
    const hue = hues[i];
    const el = document.createElement('div');
    el.className = 'sparkle-item';
    el.style.cssText = `left:${x}%;top:${y}%;--dur:${dur}s;--delay:${delay}s;`;
    el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="hsl(${hue},75%,72%)" opacity="${0.6 + Math.random() * 0.4}"><path d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z"/></svg>`;
    container.appendChild(el);
  }
})();

// ─── GENERATE HEARTS ───
(function generateHearts() {
  const container = document.getElementById('heartsContainer');
  if (!container) return;
  for (let i = 0; i < HEART_COUNT; i++) {
    const x = 50 + Math.random() * 45;
    const y = Math.random() * 85;
    const size = 10 + Math.random() * 18;
    const delay = Math.random() * 6;
    const dur = 3.5 + Math.random() * 3;
    const el = document.createElement('div');
    el.className = 'heart-item';
    el.style.cssText = `left:${x}%;top:${y}%;--size:${size}px;--dur:${dur}s;--delay:${delay}s;`;
    el.textContent = '💕';
    container.appendChild(el);
  }
})();

// ─── FOOTER YEAR ───
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── MOUSE PARALLAX ON HERO CARD ───
const heroCard = document.getElementById('heroCard');
document.addEventListener('mousemove', (e) => {
  const px = (e.clientX / window.innerWidth - 0.5) * 20;
  const py = (e.clientY / window.innerHeight - 0.5) * 14;
  if (heroCard) {
    heroCard.style.transform = `perspective(1200px) rotateX(${py * 0.25}deg) rotateY(${px * 0.25}deg)`;
  }
});

// ─── QUOTE SLIDER ───
let activeQuote = 0;
const quoteTextEl = document.getElementById('quoteText');
const quoteAuthorEl = document.getElementById('quoteAuthor');
const quoteDotsEl = document.getElementById('quoteDots');
const quoteCardEl = document.getElementById('quoteCard');

function renderQuoteDots() {
  if (!quoteDotsEl) return;
  quoteDotsEl.innerHTML = '';
  QUOTES.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'quote-dot' + (i === activeQuote ? ' active' : '');
    dot.setAttribute('aria-label', `Quote ${i + 1}`);
    dot.addEventListener('click', () => setQuote(i));
    quoteDotsEl.appendChild(dot);
  });
}

function setQuote(idx) {
  activeQuote = idx;
  if (quoteTextEl) quoteTextEl.textContent = QUOTES[idx].text;
  if (quoteAuthorEl) quoteAuthorEl.textContent = QUOTES[idx].author;
  // Fade animation
  if (quoteCardEl) {
    quoteCardEl.style.animation = 'none';
    void quoteCardEl.offsetWidth; // reflow
    quoteCardEl.style.animation = 'fadeIn 0.7s cubic-bezier(0.16,1,0.3,1)';
  }
  renderQuoteDots();
}

// Init
setQuote(0);

// Auto-advance
setInterval(() => {
  setQuote((activeQuote + 1) % QUOTES.length);
}, 4500);

// ─── INTERSECTION OBSERVER ───
const observedEls = document.querySelectorAll('.section-observe');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay ? parseFloat(el.dataset.delay) * 1000 : 0;
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.15 });

observedEls.forEach(el => observer.observe(el));
