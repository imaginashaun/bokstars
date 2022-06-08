const cacheName = "DefaultCompany-RR3-1.0";
const contentToCache = [
    "Build/Rugby2022.loader.js",
    "Build/5704f5202d6e8de90a5d2a87648342d2.js.gz",
    "Build/94cc03133cfc42ba9d9e83ca2c7a16b9.data.gz",
    "Build/b8954d1375efc16b5f5aaf5a014eb7f2.wasm.gz",
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
