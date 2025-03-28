const CACHE_NAME = 'infinitrix-news-cache-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles.css',     // Replace with your actual CSS file path
  '/script.js',      // Replace with your JS file path
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
