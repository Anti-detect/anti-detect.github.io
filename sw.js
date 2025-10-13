// Service Worker Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('anti-detect-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/assets/css/main.css',
        '/assets/js/main.js',
        '/assets/images/logo.png',
        '/assets/fonts/roboto.woff2'
      ]);
    })
  );
});

// Fetch Handler
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});