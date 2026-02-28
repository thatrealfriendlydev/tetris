const CACHE_NAME = 'tetris-v1';
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
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});