// Blok kode untuk melakukan request data json
const getLihatKlasemen = (data) => {

    let tblLihatDataKlasemen = "";
    data.standings[0].table.forEach((team) => {
            team = JSON.parse(JSON.stringify(team).replace(/^http:\/\//i, 'https://'));  
            // Menyusun komponen card artikel secara dinamis
            tblLihatDataKlasemen += `
                    <div class="card row border center">
                        <div class="card border red white-text" style="font-family: 'Architects Daughter', cursive;">
                        Peringkat: ${team.position}</div>
                        <div class="col s12 m12 l4">
                            <img src="${team.team.crestUrl}" width="200px">
                            <h4 style="font-family: 'Architects Daughter', cursive;"">${team.team.name}</h4>
                            <hr>
                            <a class="btn-small black-text waves-light yellow border" href="/read/detail_tim.html?id=${team.team.id}">
                                Lihat
                            </a>
                            <br><br>
                            </div>
                        <div class="col s12 m12 l8 center">
                            <table class="responsive-table" style="font-family: 'Architects Daughter', cursive;">
                                <tr>
                                    <th>Menang:</th>
                                    <td>${team.playedGames} Point</td>
                                </tr>
                                <tr>
                                    <th>Seri:</th>
                                    <td>${team.won} Point</td>
                                </tr>
                                <tr>
                                    <th>Kalah:</th>
                                    <td>${team.lost} Point</td>
                                </tr>
                                <tr>
                                    <th>Gol:</th>
                                    <td>${team.points} Point</td>
                                </tr>
                            </table>
                        </div>
                    </div>
            `;
        })
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("klasemen").innerHTML = tblLihatDataKlasemen;
}
