// ZTL Service Worker — v6\nconst CACHE_NAME = "ztl-v8";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/storage.js",
  "/supabase.js",
  "/auth-ui.js",
  "/auth-wrapper.js",
  "/app.js",
  "/icon-192.svg",
  "/icon-512.svg",
  "/libs/react.production.min.js",
  "/libs/react-dom.production.min.js",
  "/libs/supabase.min.js"
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
      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          return cached || new Response("Mode hors-ligne", { status: 503 });
        });
    })
  );
});
