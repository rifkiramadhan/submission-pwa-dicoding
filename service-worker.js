importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    { url: "/", revision: "1" },
    { url: "/manifest.json", revision: "1"},
    { url: "/index.html", revision: "1"},
    { url: "/nav.html", revision: "1"},
    { url: "/menu/about.html", revision: "1"},
    { url: "/menu/home.html", revision: "1"},
    { url: "/menu/info.html", revision: "1"},
    { url: "/menu/matches.html", revision: "1"},
    { url: "/menu/saves.html", revision: "1"},
    { url: "/read/detail_pemain.html", revision: "1"},
    { url: "/read/detail_tim.html", revision: "1"},
    { url: "/read/detail_pertandingan.html", revision: "1"},
    { url: "/js/api.js", revision: "1"},
    { url: "/js/db.js", revision: "1"},
    { url: "/js/date.js", revision: "1"},
    { url: "/js/idb.js", revision: "1"},
    { url: "/js/materialize.min.js", revision: "1"},
    { url: "/js/sw-regist.js", revision: "1"},
    { url: "/js/nav.js", revision: "1"},
    { url: "/js/klasemen.js", revision: "1"},
    { url: "/js/pertandingan.js", revision: "1"},
    { url: "/js/tim.js", revision: "1"},
    { url: "/css/materialize.min.css", revision: "1"},
    { url: "/css/style.css", revision: "1"},
    { url: "/images/icons/icon-72x72.png", revision: "1"},
    { url: "/images/icons/icon-96x96.png", revision: "1"},
    { url: "/images/icons/icon-128x128.png", revision: "1"},
    { url: "/images/icons/icon-144x144.png", revision: "1"},
    { url: "/images/icons/icon-152x152.png", revision: "1"},
    { url: "/images/icons/icon-192x192.png", revision: "1"},
    { url: "/images/icons/icon-384x384.png", revision: "1"},
    { url: "/images/icons/icon-512x512.png", revision: "1"},
    { url: "/images/background.png", revision: "1"},
    { url: "/images/backgroundinfo.png", revision: "1"},
    { url: "/images/backgroundinfo2.png", revision: "1"},
    { url: "/images/backgroundinfo3.png", revision: "1"},
    { url: "/images/profil.png", revision: "1"},
    { url: "/icon.png", revision: "1"},
    { url: "/iconlogo.png", revision: "1"},
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "pages"
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

self.addEventListener("push", function(event) {
    var body;
    
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    var options = {
        body: body,
        icon: "images/icons/icon-512x512.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});