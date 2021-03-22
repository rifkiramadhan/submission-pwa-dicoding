// Blok kode untuk melakukan request data json
const getLihatPertandingan = (data) => {
    let tblLihatDataPertandingan = "";
    let tblDataPertandingan = "";

    let dtPertandingan = data.matches;
    let dtWaktuHari = [];
    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    };

    for(let i = 0; i < dtPertandingan.length; i++) {
        dtWaktuHari.push(dtPertandingan[i].matchday);
    }

    let tbl = 0;
    for(let i = 0; i < dtPertandingan.length; i++) {
        if (dtPertandingan[i].matchday === dtWaktuHari.filter(unique)[tbl]) {

            // Menyusun komponen card artikel secara dinamis
            // Menambahkan ROW
            tblLihatDataPertandingan += `
                <tr>
                    <td> ${dtPertandingan[i].homeTeam.name} </td>
                    <td>VS</td>
                    <td> ${dtPertandingan[i].awayTeam.name} </td>
                    <td> <a class="black-text btn-small yellow border" href="/read/detail_pertandingan.html?id=${dtPertandingan[i].id}">
                        Lihat
                    </a>
                    </td>
                </tr>
            `;
        } else {
            // Menambahkan Tabel
            tblDataPertandingan += `
                <div class="card row border">
                    <div class="card-content">
                    <div class="card border center red white-text" style="font-family: 'Architects Daughter', cursive;">
                    Tanggal: ${kecilkanData(new Date(dtPertandingan[i-1].utcDate).toLocaleDateString())}
                    </div>
                        <table class="responsive-table striped centered orange lighten-1 black-text" style="font-family: 'Architects Daughter', cursive;">
                            <thead>
                                <tr>
                                    <th>Home:</th>
                                    <th></th>
                                    <th>Away:</th>
                                    <th>Aksi:</th>
                                </tr>
                            </thead>
                            <tbody>
                                ` + tblLihatDataPertandingan + `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            // Mengkosongkan ROW
            tblLihatDataPertandingan = "";
            
            // Menambahkan ROW
            tblLihatDataPertandingan += `
                <tr>
                    <td> ${dtPertandingan[i].homeTeam.name} </td>
                    <td>VS</td>
                    <td> ${dtPertandingan[i].awayTeam.name} </td>
                    <td> <a class="black-text btn-small yellow border" href="/read/detail_pertandingan.html?id=${dtPertandingan[i].id}">
                    Lihat</a></a> 
                    </td>
                </tr>
            `;

            tbl++;
        }
    }

    // Menambahkan Tabel
    tblDataPertandingan += `
        <div class="card row border">
            <div class="card-content">
            <div class="card border center red white-text" style="font-family: 'Architects Daughter', cursive;">
            Tanggal: ${kecilkanData(new Date(dtPertandingan[dtPertandingan.length-1].utcDate).toLocaleDateString())}
                </div>
                <table class="responsive-table striped centered orange" style="font-family: 'Architects Daughter', cursive;">
                    <thead>
                        <tr>
                            <th>Home:</th>
                            <th></th>
                            <th>Away:</th>
                            <th>Aksi:</th>
                        </tr>
                    </thead>
                    <tbody>
                        ` + tblLihatDataPertandingan + `
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById("pertandingan").innerHTML = tblDataPertandingan;
}

// Blok kode untuk melakukan request data json
const getLihatJadwalPertandingan = (data) => {
    let tblLihatDataInfoPertandingan = "";

    match = data.match;
    h2h = data.head2head;
    
    // Menyusun komponen card artikel secara dinamis
    tblLihatDataInfoPertandingan += `
            <div class="row center">
            <br>
            <div class="col s12 m12 l4">
                <img src="/iconlogo.png" width="200px">
                    <h4 style="font-family: 'Architects Daughter', cursive;">Jadwal Pertandingan</h4>
                <hr>
            </div>
            <div class="col s12 m12 l8 center" style="font-family: 'Architects Daughter', cursive;">
                <table class="responsive-table">
                    <tr>
                        <th>Stadion:</th>
                        <td>${match.venue}</td>
                    </tr>
                    <tr>
                        <th>Mulai Pertandingan:</th>
                        <td>${kecilkanData(new Date(match.utcDate).toLocaleDateString())}</td>
                    </tr>
                    <tr>
                        <th>Waktu Pertandingan:</th>
                        <td>${new Date(match.utcDate).toLocaleTimeString()}</td>
                    </tr>
                    <hr>
                        <div class="row">
                            <div class="col s5 m5 l5 center-align"> <h5> ${match.homeTeam.name}</h5></div>
                            <div class="col s2 m2 l2 center-align"> <h5> <b>VS</b></h5></div>
                            <div class="col s5 m5 l5 center-align"> <h5> ${match.awayTeam.name}</h5></div>
                        </div>
                        <hr>
                        <div class="col s5 m5 l5 center-align"><p> <a class="black-text waves-light btn border yellow" href="/read/detail_tim.html?id=${match.homeTeam.id}">Lihat Home</a></p></div>
                        <div class="col s2 m2 l2 center-align"><h5></h5></div>
                        <div class="col s5 m5 l5 center-align"><p> <a class="black-text waves-light btn border yellow" href="/read/detail_tim.html?id=${match.awayTeam.id}">Lihat Away</a></p></div>
                        <br><br>
                    </table>
                </div>
            </div>
    `;
    // Sisipkan komponen tabel ke dalam elemen dengan id #content
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tblLihatInfoPertandingan").innerHTML = tblLihatDataInfoPertandingan;
}

// Blok kode untuk melakukan request data json
const getMatchSavesAll = (data) => {
    let tblLihatSavePertandingan = "";
    let tblnum = 1;

    // Menyusun komponen tabel artikel secara dinamis
    tblLihatSavePertandingan += `
        <table class="striped centered border" style="font-family: 'Architects Daughter', cursive;">
            <thead>
                <tr>
                    <th>Waktu</th>
                    <th>Tim</th>
                    <th>Aksi</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach((match) => {
        tblLihatSavePertandingan += `
            <tr>
                <td>${kecilkanData(new Date(match.match.utcDate).toLocaleDateString())}</td>
                <td>${match.match.homeTeam.name} VS ${match.match.awayTeam.name}
                </td>
                <td><a class="black-text btn-small yellow border" href="/read/detail_pertandingan.html?id=${match.match.id}&saved=true">
                    Lihat
                </a>
                </td>
                <td>
                    <a class="waves-light btn-small red border" onclick="hapusdataSaves(${match.match.id}, 'saves_match')">
                        Hapus
                    </a>
                </td>
            </tr>
        `;
        tblnum++;
    });
    tblLihatSavePertandingan += `
            </tbody>
        </table>
    `;

    // Sisipkan komponen tabel ke dalam elemen dengan id #content
    document.getElementById("saves-item").innerHTML = tblLihatSavePertandingan;
}