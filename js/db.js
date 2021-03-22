const lihatData = (idb) => {
    let dbPromised = idb.open("spainsh-league", 1, (upgradeDb) => {    
        if (!upgradeDb.objectStoreNames.contains(datanamaTim)) {
            let timObjectStore = upgradeDb.createObjectStore(datanamaTim, {
                keypath: "id"
            });
            
            timObjectStore.createIndex("nama_tim", "name", {
                unique: false
            });
        }

        if (!upgradeDb.objectStoreNames.contains(datanamaPertandingan)) {
            let pertandinganObjectStore = upgradeDb.createObjectStore(datanamaPertandingan, {
                keypath: "id"
            });

            pertandinganObjectStore.createIndex("tim_tuan_rumah", "match.homeTeam.name", {
                unique: false
            });

            pertandinganObjectStore.createIndex("tim_tamu", "match.awayTeam.name", {
                unique: false
            });
        }

        if (!upgradeDb.objectStoreNames.contains(datanamaPemain)) {
            let pemainObjectStore = upgradeDb.createObjectStore(datanamaPemain, {
                keypath: "id"
            });

            pemainObjectStore.createIndex("nama_pemain", "name", {
                unique: false
            });
        }
    });
    return dbPromised;
}

const addSavesID = (data, storeName) => {
    let dataPrimaryKey;
    if (storeName == datanamaTim) {
        dataPrimaryKey = data.id;        
    }
    else if (storeName == datanamaPertandingan) {
        dataPrimaryKey = data.match.id;
    }
    else if (storeName == datanamaPemain) {
        dataPrimaryKey = data.id;
    }

 lihatData(idb)
        .then((db) => {
            let tx = db.transaction(storeName, "readwrite");
            let store = tx.objectStore(storeName);
            
            store.put(data, dataPrimaryKey);

            return tx.complete;
        })
        .then(() => {
            M.toast({
                html: "Data ditambahkan ke simpanan",
            });
        });
}

const hapusdataSaves = (ID, storeName) => {
    console.log(ID + " " + storeName);
 lihatData(idb)
        .then((db) => {
            let tx = db.transaction(storeName, "readwrite");
            let store = tx.objectStore(storeName);

            store.delete(ID);

            return tx.complete;
        })
        .then(() => {
            M.toast({
                html: "Data dihapus dari simpanan",
            });
        });

    location.reload();
}

const getSavesAll = (storeName) => {
    return new Promise((resolve, reject) => {
     lihatData(idb)
            .then((db) => {
                let tx = db.transaction(storeName, "readonly");
                let store = tx.objectStore(storeName);
                
                return store.getAll();
            })
            .then((data) => {
                resolve(data);
            });
    });
}

const getById = (ID, storeName) => {
    return new Promise((resolve, reject) => {
     lihatData(idb)
            .then((db) => {
                let tx = db.transaction(storeName, "readonly");
                let store = tx.objectStore(storeName);

                return store.get(ID);
            })
            .then((data) => {
                resolve(data);
            });
    });
}

async function savesData(ID, storeName) {
    return await getById(ID, storeName) === undefined ? false : true;
}