document.addEventListener("DOMContentLoaded", () => {
    // Activate sidebar nav
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });
                
                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    // Load page content
    var page = window.location.hash.substr(1);
    loadPage(getPage(page));

    var savesType = "";
    function getPage(page) {
        if (page == "" || page == "#") {
            page = "home";
        }
        else if (page == "matches") {
            page = "matches";
        }
        else if (page == "saves" || page == "team-saves") {
            page = "saves";
            savesType = "team";
        }
        else if (page == "match-saves") {
            page = "saves";
            savesType = "match";
        }
        else if(page == "player-saves") {
            page = "saves";
            savesType = "player";
        }
        return page;
    }

    function loadPage(page) {
        // fetch('pages/' + page + '.html')
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            var content = document.querySelector("#body-content");
                
            if (this.readyState == 4) {
                switch(page) {
                    case "home": getKlasemen(); break;
                    case "matches": getPertandingan(); break;
                    case "saves": tabSaves(savesType); break;
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak tersedia.</p>";
                } else {
                    content.innerHTML = "<p>Halaman Ini tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "menu/" + page + ".html", true);
        xhttp.send();
    }
});