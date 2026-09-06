const CACHE_NAME="our-money-shell-v1";
const CORE=["./","./index.html","./styles.css","./app.js","./config.js","./manifest.webmanifest","./icon-64.png","./icon-192.png","./icon-512.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  if(url.origin===self.location.origin){
    event.respondWith(fetch(event.request).then(r=>{const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put(event.request,copy));return r}).catch(()=>caches.match(event.request).then(r=>r||caches.match("./index.html"))));
    return;
  }
  // Runtime-cache CDN scripts/fonts after first successful online load.
  if(["cdn.jsdelivr.net","fonts.googleapis.com","fonts.gstatic.com"].includes(url.hostname)){
    event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(r=>{const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put(event.request,copy));return r})));
  }
});
