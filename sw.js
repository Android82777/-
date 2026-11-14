/* Обновление только по кнопке: новая версия скачивается в фоне и ждёт, пока пользователь нажмёт «Обновить».
   При каждом выпуске меняйте номер в V (иначе браузер не увидит, что sw.js изменился). */
var V="mosmesto-v10",SHELL=["app.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","favicon-64.png","icon-round-256.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(SHELL.map(function(u){return c.add(new Request(u,{cache:"reload"})).catch(function(){})}))}))});
self.addEventListener("message",function(e){if(e.data&&e.data.type==="SKIP_WAITING")self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.origin!==location.origin)return;
 var isHtml=r.mode==="navigate"||/\.html$/.test(u.pathname),isApp=/app\.html$/.test(u.pathname);
 if(isHtml&&!isApp){ /* сайт: всегда свежий, из кэша только без сети */
  e.respondWith(fetch(r).catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match("app.html")})}));return}
 /* приложение и его файлы: из кэша установленной версии */
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(function(m){return m||fetch(r).then(function(x){if(x&&x.ok){var c=x.clone();caches.open(V).then(function(h){h.put(r,c)})}return x}).catch(function(){return isApp?caches.match("app.html"):Response.error()})}))});
self.addEventListener("notificationclick",function(e){e.notification.close();e.waitUntil(clients.openWindow("app.html#books"))});
