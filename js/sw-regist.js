/* Registrasi Service Worker */
if ("serviceWorker" in navigator) {
    registerServiceWorker();
    requestPermission();
} else {
    console.log("[sw-regist.js][ServiceWorker] Browser ini belum mendukung service worker.");
}

function registerServiceWorker() {
    return navigator.serviceWorker
        .register("/service-worker.js")
        .then(function(registration) {
            console.log("[sw-regist.js][registerServiceWorker] Registrasi Service Worker berhasil.");
            return registration;
        })
        .catch(function(err) {
            console.error("[sw-regist.js][registerServiceWorker] Registrasi Service Worker gagal.", err);
        });
}

function requestPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(function(result) {
            if (result === "denied") {
                console.log("[sw-regist.js][requestPermission] Fitur notifikasi tidak diizinkan.");
                return;
            }
            else if (result === "default") {
                console.error("[sw-regist.js][requestPermission] Pengguna menutup kotak dialog permintaan izin.");
                return;
            }
    
            if (("PushManager") in window) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BK32bLGisl4prnUVD3INz4RpTcrsssPUbFntix_reO00hEOWH651-KQ4VSh-WNUbWPHW2e3k1YhN9QmEecmnERc")
                    }).then(function(subscribe) {
                        console.log("[sw-regist.js][requestPermission] Berhasil melakukan subscribe");
                        console.log("[Endpoint]: ", subscribe.endpoint);
                        console.log("[p256dh key]: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("p256dh")))));
                        console.log("[Auth key]: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("auth")))));
                    }).catch(function(e) {
                        console.error("[sw-regist.js][requestPermission] Tidak dapat melakukan subscribe", e.message);
                    })
                })
            }
        });
    }
}