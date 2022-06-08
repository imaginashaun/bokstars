const cacheName = "DefaultCompany-RR3-1.0";
const contentToCache = [
    "Build/Rugby2022.loader.js",
    "Build/8c0e78acafc1992cbcd03dd817f1c537.js.br",
    "Build/3fff8009761ebb908dc04039db5e89cc.data.br",
    "Build/95c97f4cd70759d60cd81fa7b09c3d89.wasm.br",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
