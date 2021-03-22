var webPush = require("web-push");

const vapidKeys = {
    "publicKey":"BK32bLGisl4prnUVD3INz4RpTcrsssPUbFntix_reO00hEOWH651-KQ4VSh-WNUbWPHW2e3k1YhN9QmEecmnERc",
    "privateKey":"c4GjgSmdafTkzsKF_jUakqVlHR15px3JOWFoJJLJHqM"
};

webPush.setVapidDetails(
    "mailto:riifkiramadhan2@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cleVkhW1g-Q:APA91bEHLlxsKpNpTL9FbLyZQVfbv8_67KeyA7JFm1r983BiLFXVxOeRoHr7PxftcmTjgEJgA6oS7EiAfNcdVblRSPsyucfvc9l93n-Z9BvJRRaJZhKTNFrZdJ5RFL9jnkBEmtsNnOTL",
    "keys": {
        "p256dh": "BOPt1+iWU89TK8R29+QUxznn6zy+3nPA4y/6sN6vrdeLwd7cHJD6/IxkQmPI4S+sDFQt5XDzQz0si2ebjcK+jf0=",
        "auth": "JIVDmW6aXDT94J7QgWEVlg=="
    }
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
    gcmAPIKey: "509056706240",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);