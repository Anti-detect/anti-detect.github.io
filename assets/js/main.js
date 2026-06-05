// Main JavaScript File

// Promo code copy buttons (subpages)
document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('[data-copy-code]');
  var feedback = document.getElementById('copy-feedback');
  function setFeedback(message) {
    if (feedback) feedback.textContent = message;
  }
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var code = button.getAttribute('data-copy-code');
      if (!code) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(function () {
          setFeedback('Copied code: ' + code);
        }).catch(function () {
          setFeedback('Copy failed. Please copy manually: ' + code);
        });
      } else {
        setFeedback('Clipboard is not available. Copy manually: ' + code);
      }
    });
  });
});

// Dark Mode Toggle
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.documentElement.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark-mode');
}

// Language Selector
function toggleLanguageMenu() {
  const menu = document.querySelector('.lang-dropdown');
  if (!menu) return;
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  menu.hidden = expanded;
}

// Mobile nav toggle
document.querySelectorAll('.nav-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('aria-controls');
    const nav = document.getElementById(targetId);
    if (!nav) return;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      nav.hidden = true;
    } else {
      nav.hidden = false;
    }
  });
});

// Smooth Scroll (same-page anchors only)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Guides dropdown
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-guides-toggle');
  const menu = document.getElementById('guides-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function () {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
  });
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
  });
});

// Back to Top Button
const backToTop = document.createElement('button');
backToTop.classList.add('back-to-top');
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Newsletter Form
document.querySelector('.newsletter-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  
  try {
    // Replace with your actual API endpoint
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (response.ok) {
      alert('Thanks for subscribing!');
      e.target.reset();
    } else {
      throw new Error('Subscription failed');
    }
  } catch (error) {
    alert('Sorry, there was an error. Please try again later.');
  }
});

// Search Form
document.querySelector('.search-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = e.target.q.value;
  // Replace with your actual search implementation
  window.location.href = `/search?q=${encodeURIComponent(query)}`;
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('ServiceWorker registration successful');
    }).catch(err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    console.log('Native lazy loading supported');
  } else {
    // Fallback to Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
});

// Google Analytics: set ga_measurement_id in _config.yml when ready