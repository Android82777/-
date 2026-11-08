var V="mosmesto-v6",SHELL=["app.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","favicon-64.png","icon-round-256.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(SHELL.map(function(u){return c.add(u).catch(function(){})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
 var nav=r.mode==="navigate"||/\.html$/.test(r.url);
 if(nav){e.respondWith(fetch(r).then(function(x){var c=x.clone();caches.open(V).then(function(h){h.put(r,c)});return x}).catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match("app.html")})}))}
 else e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(x){var c=x.clone();caches.open(V).then(function(h){h.put(r,c)});return x})}))});
self.addEventListener("notificationclick",function(e){e.notification.close();e.waitUntil(clients.openWindow("app.html#books"))});
