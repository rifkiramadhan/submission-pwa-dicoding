// Blok kode untuk melakukan request data json
const getLihatInfoTim = (data) => {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    let tblDataTim = "";
    let tblLihatDataTim = "";

    // Menyusun komponen tabel artikel secara dinamis
    tblDataTim += `
        <tr>
            <td style="font-weight: bold;">Nama Tim:</td>
            <td>${data.shortName}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Singkatan:</td>
            <td>${data.tla}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Didirikan:</td>
            <td>${data.founded}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Lokasi:</td>
            <td>${data.venue}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Alamat:</td>
            <td>${data.address}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Telepon:</td>
            <td>${data.phone}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Email:</td>
            <td><a class="black-text" href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Website:</td>
            <td><a class="black-text" href="${data.website}" target="_blank">${data.website}</a></td>
        </tr>
    `;

    let tblnum = 1;
    data.squad.forEach((squad) => {
        tblLihatDataTim += `
            <tr>
                <td> ${squad.name}</td>
                <td class="center-align">${squad.position}</td>
                <td class="center-align"><a class="black-text btn-small yellow border" href="/read/detail_pemain.html?id=${squad.id}">
                    Lihat
                </a>
                </td>
            </tr>
        `;
        tblnum++;
    });

    // Sisipkan komponen tabel ke dalam elemen dengan id #content
    document.getElementById("gambarTeam").src = data.crestUrl;
    document.getElementById("namaHeader").innerHTML = data.name;
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tblLihatPemain").innerHTML = tblDataTim;
    document.getElementById("tblPemain").innerHTML = tblLihatDataTim;
}

// Blok kode untuk melakukan request data json
const getLihatInfoPemain = (data) => {
    let tblLihatDataInfoPemain = "";

    // Menyusun komponen card artikel secara dinamis
    tblLihatDataInfoPemain += `

    <div class="card border row center">
        <div class="col s12 m12 l4">
        <br>
            <img class="circle" src="/images/backgroundinfo2.png" width="200px">
            <h4 style="font-family: 'Architects Daughter', cursive;">Nama Pemain</h4>
            <hr>
        </div>
        <div class="col s12 m12 l8 center" style="font-family: 'Architects Daughter', cursive;">
            <table class="responsive-table striped">
                <tr>
                    <th style="font-weight: bold;">Nama Lengkap:</th>
                    <td>${data.name}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Posisi:</td>
                    <td>${data.position}</td>
                </tr>
                <tr>
                    <th style="font-weight: bold;">Tim Nasional:</th>
                    <td>${data.nationality}</td>
                </tr>
                    <th style="font-weight: bold;">Tempat Lahir:</th>
                    <td>${data.countryOfBirth}</td>
                </tr>
                <tr>
                    <th style="font-weight: bold;">Tanggal Lahir:</th>
                    <td>${data.dateOfBirth}</td>
                </tr>
            </table>
        </div>
    </div>
    `;

    // Sisipkan komponen tabel ke dalam elemen dengan id #content
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tblLihatPemain").innerHTML = tblLihatDataInfoPemain;
}

// Blok kode untuk melakukan request data json
const getTeamSavesAll = (data) => {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    let tblLihatSaveTim = "";
    let tblnum = 1;
    
    // Menyusun komponen tabel artikel secara dinamis
    tblLihatSaveTim += `
        <table class="striped centered" style="font-family: 'Architects Daughter', cursive;">
            <thead>
                <tr>
                    <th>Nama Tim:</th>
                    <th>Aksi:</th>
                    <th>Aksi:</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach((team) => {
        tblLihatSaveTim += `
            <tr>
                <td>${team.name}</td>
                <td class="center-align"><a class="black-text btn-small yellow border" href="/read/detail_tim.html?id=${team.id}&saved=true">
                    Lihat
                </a>
                </td>
                <td>
                    <a class="waves-light btn-small red border" onclick="hapusdataSaves(${team.id}, 'saves_team')">
                        Hapus
                    </a>
                </td>
            </tr>
        `;

        tblnum++;
    });
    tblLihatSaveTim += `
            </tbody>
        </table>
    `;
    
    // Sisipkan komponen tabel ke dalam elemen dengan id #content
    document.getElementById("saves-item").innerHTML = tblLihatSaveTim;
}

// Blok kode untuk melakukan request data json
const getPlayerSavesAll = (data) => {
    let tablePlayerFavoriteHtml = "";
    let tblnum = 1;

    // Menyusun komponen tabel artikel secara dinamis
    tablePlayerFavoriteHtml += `
        <table class="striped centered" style="font-family: 'Architects Daughter', cursive;">
            <thead>
                <tr>
                    <th>Nama Pemain:</th>
                    <th>Aksi:</th>
                    <th>Aksi:</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach((player) => {
        tablePlayerFavoriteHtml += `
            <tr>
                <td>${player.name}</td>
                <td><a class="black-text waves-light btn-small yellow border" href="/read/detail_pemain.html?id=${player.id}&saved=true">
                    Lihat
                </a>
                </td>
                <td>
                    <a class="waves-light btn-small red border" onclick="hapusdataSaves(${player.id}, 'saves_player')">
                        Hapus
                    </a>
                </td>
            </tr>
        `;

        tblnum++;
    });

    tablePlayerFavoriteHtml += `
            </tbody>
        </table>
    `;
    // Sisipkan komponen tabel ke dalam elemen dengan id #content
    document.getElementById("saves-item").innerHTML = tablePlayerFavoriteHtml;   
}