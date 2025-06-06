const url = "https://api.themoviedb.org/3/genre/tv/list?api_key=2e7092285b99d972d514083dff1b0746";
let resultados = document.querySelector(".generos");
let rtas = ""

window.addEventListener("load", function () {
    let botones = document.querySelectorAll(".textTitulo");

    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("mouseover", function () {
            this.style.color = "rgb(100, 200, 255)";
        });

        botones[i].addEventListener("mouseout", function () {
            this.style.color = "";
        });
    }

    let tit = document.querySelectorAll(".textGenres");

    for (let j = 0; j < tit.length; j++) {
        tit[j].addEventListener("mouseover", function () {
            this.style.backgroundColor = "rgb(180, 180, 180)";
        });

        tit[j].addEventListener("mouseout", function () {
            this.style.backgroundColor = "";
        });
    }
});

fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
        let result = data.genres;
        for (let i = 0; i < result.length; i++) {
            let genero = result[i].name;
            let id = result[i].id;
            rtas += `
        <h2 class="textGenres"><a href="detailMovie-genres.html?id=${id}">${genero}</a></h2>`;
        }
        resultados.innerHTML = rtas;
    })
    .catch(function (error) {
        console.log("Error: " + error);
        document.querySelector(".cargando").style.display = "none";
    });
