const kecilkanData = (dateString) => {
    let date = new Date(dateString);

    const mount_names = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "December"];

    let day = String(date.getDate()).padStart(2, '0');
    let month = mount_names[date.getMonth()];
    let year = date.getFullYear();

    let result = day + " " + month + " " + year;
    return result
}

const back = () => {
    window.history.back();
}

const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}