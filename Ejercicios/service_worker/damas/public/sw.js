const cacheName = 'damas-cache-v1';
const offlineUrl = './juego-offline.html';

const cacheFiles = [
    './juego.html',
    './js/juego.js',
    './css/styles.css',
    offlineUrl,
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(cacheFiles))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .catch(() => caches.match(offlineUrl));
      })
  );
});
