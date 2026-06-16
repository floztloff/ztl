// ZTL Service Worker
const CACHE_NAME = "ztl-v2";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/storage.js",
  "/icons.js",
  "/app.jsx",
  "/icon-192.svg",
  "/icon-512.svg",
  "/libs/react.production.min.js",
  "/libs/react-dom.production.min.js",
  "/libs/babel.min.js"
];

// Installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Interception des requêtes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Essayer le réseau d'abord, fallback cache
      return fetch(event.request)
        .then((response) => {
          // Mettre en cache les nouvelles ressources
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          // En mode hors-ligne, servir depuis le cache
          return cached || new Response("Offline", { status: 503 });
        });
    })
  );
});
