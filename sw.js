var C="marks-v6",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n.indexOf("marks-v")===0&&n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  if(e.request.url.indexOf("cdn.jsdelivr.net")>-1){
    e.respondWith(caches.open("marks-lib").then(function(c){return c.match(e.request).then(function(r){return r||fetch(e.request).then(function(n){if(n.ok)c.put(e.request,n.clone());return n})})}));
    return;
  }
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||fetch(e.request)}));
});
