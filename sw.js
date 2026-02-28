const CACHE_NAME = 'tetris-v2'; // Incremented version
const ASSETS = [
  './',
  './index.html',
  './clear.wav',
  './drop.wav',
  './gameover.wav',
  './Korobeiniki.mp3',
  './move.wav',
  './rotate.wav',
  './tetris.wav',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Force activation
});

self.addEventListener('activate', (event) => {
  // Clean up old Tetris caches
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});