self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("taskflow-cache").then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./script.js",
        "./fundo.png",
        "./manifest.json"
      ])
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 🔔 NOTIFICAÇÃO (BACKGROUND)
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("./index.html")
  );
});
