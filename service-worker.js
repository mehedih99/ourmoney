const CACHE_NAME="our-money-shell-v6";
const CORE=[
  "./",
  "./index.html",
  "./styles.css?v=20260908-bankcash-final",
  "./app.js?v=20260908-bankcash-final",
  "./config.js",
  "./manifest.webmanifest",
  "./icon-64.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache=>Promise.all(CORE.map(url=>cache.add(url).catch(()=>null))))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);

  if(url.origin===self.location.origin){
    // Network first so GitHub updates are picked up; cache is offline fallback.
    event.respondWith(
      fetch(event.request,{cache:"no-store"})
        .then(response=>{
          if(response && response.ok){
            const copy=response.clone();
            caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));
          }
          return response;
        })
        .catch(async()=>{
          return (await caches.match(event.request))
            || (event.request.mode==="navigate" ? await caches.match("./index.html") : undefined);
        })
    );
    return;
  }

  // CDN runtime cache: needed after one successful online visit.
  if(["cdn.jsdelivr.net","fonts.googleapis.com","fonts.gstatic.com"].includes(url.hostname)){
    event.respondWith(
      caches.match(event.request).then(cached=>{
        if(cached)return cached;
        return fetch(event.request).then(response=>{
          if(response && response.ok){
            const copy=response.clone();
            caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));
          }
          return response;
        });
      })
    );
  }
});
