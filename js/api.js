const base_url = "https://api.football-data.org/v2";
const api_token = "f70da3daca5c4218b41aadca48379b1d";
const id_liga = 2014;

const data_klasemen = `${base_url}/competitions/${id_liga}/standings?standingType=TOTAL`;
const data_pertandingan = `${base_url}/competitions/${id_liga}/matches?status=SCHEDULED`;
const data_lihat_tim = `${base_url}/teams/`;
const data_lihat_pertandingan = `${base_url}/matches/`;
const data_lihat_pemain = `${base_url}/players/`;

const version_team = "team";
const version_match = "match";
const version_player = "player";
const datanamaTim = "saves_team";
const datanamaPertandingan = "saves_match";
const datanamaPemain = "saves_player";

// Blok kode yang akan di panggil jika fetch berhasil
const status = (response) => {
    if (response.status !== 200) {
        console.log("[API.js][status] Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
const json = (response) => {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
const error = (error) => {
    // Parameter error berasal dari Promise.reject()
    console.log("[API.js][error] Error : " + error);
}

const readFetch = (endpoint) => {
    return fetch(endpoint, {
        headers: {
            "X-Auth-Token": api_token
        }
    });
}

// Blok kode untuk melakukan request data json
const getKlasemen = () => {
    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(data_klasemen).then((response) => {
                if (response) {
                    response.json().then((data) => {
                        getLihatKlasemen(data);
                        resolve(data);
                    });
                }
            });
        }
    
        readFetch(data_klasemen)
            .then(status)
            .then(json)
            .then((data) => {
                getLihatKlasemen(data);
                resolve(data);
            })
    
        .catch(error);
    });
}

// Blok kode untuk melakukan request data json
const getPertandingan = () => {
    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(data_pertandingan).then((response) => {
                if (response) {
                    response.json().then((data) => {
                        getLihatPertandingan(data);
                        resolve(data);
                    });
                }
            });
        }
    
        readFetch(data_pertandingan)
            .then(status)
            .then(json)
            .then((data) => {
                getLihatPertandingan(data);
                resolve(data);
            })
        .catch(error);
    });
}

const getLihatInfoPertandingan = (matchID) => {
    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(data_lihat_pertandingan + matchID).then((response) => {
                if (response) {
                    response.json().then((data) => {
                        getLihatJadwalPertandingan(data);
                        resolve(data);
                    });
                }
            });
        }
    
        readFetch(data_lihat_pertandingan + matchID)
            .then(status)
            .then(json)
            .then((data) => {
                getLihatJadwalPertandingan(data);
                resolve(data);
            })
        .catch(error);
    });
}

const getLihatTim = (teamID) => {
    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(data_lihat_tim + teamID).then((response) => {
                if (response) {
                    response.json().then((data) => {
                        getLihatInfoTim(data);
                        resolve(data);
                    });
                }
            });
        }

        readFetch(data_lihat_tim + teamID)
            .then(status)
            .then(json)
            .then((data) => {
                getLihatInfoTim(data);
                resolve(data);
            })
        .catch(error);
    });  
}

// Blok kode untuk melakukan request data json
const getLihatPemain = (playerID) => {
    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(data_lihat_pemain + playerID).then((response) => {
                if (response) {
                    response.json().then((data) => {
                        getLihatInfoPemain(data);
                        resolve(data);
                    });
                }
            });
        }
    
        readFetch(data_lihat_pemain + playerID)
            .then(status)
            .then(json)
            .then((data) => {
                getLihatInfoPemain(data);
                resolve(data);
            })
        .catch(error);
    });
}

// Blok kode untuk melakukan penyimpanan data
const getSavesID = (ID, type) => {
    if (type == version_team) {
        getById(ID, datanamaTim).then((data) => {
            getLihatInfoTim(data);
        });
    }
    else if (type == version_match) {
        getById(ID, datanamaPertandingan).then((data) => {
            getLihatJadwalPertandingan(data);
        })
    }
    else if (type == version_player) {
        getById(ID, datanamaPemain).then((data) => {
            getLihatInfoPemain(data);
        })
    }
}

const tabSaves = (type) => {
    if (type == version_team) {
        getSavesAll(datanamaTim).then((data) => {
            getTeamSavesAll(data);
        });
    }
    else if(type == version_match) {
        getSavesAll(datanamaPertandingan).then((data) => {
            getMatchSavesAll(data);
        });
    }
    else if(type == version_player) {
        getSavesAll(datanamaPemain).then((data) => {
            getPlayerSavesAll(data); 
        });
    }
}