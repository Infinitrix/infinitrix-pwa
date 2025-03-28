
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('infinitrix-store').then(function(cache) {
      return cache.addAll([
        '/',
        '/offline.html',
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request).then(function(response) {
        return response || caches.match('/offline.html');
      });
    })
  );
});
