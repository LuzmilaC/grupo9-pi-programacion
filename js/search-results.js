let urlMovie = [
  "https://api.themoviedb.org/3/search/collection?api_key=2e7092285b99d972d514083dff1b0746",
  "https://api.themoviedb.org/3/search/company?api_key=2e7092285b99d972d514083dff1b0746",
  "https://api.themoviedb.org/3/search/keyword?api_key=2e7092285b99d972d514083dff1b0746",
  "https://api.themoviedb.org/3/search/movie?api_key=2e7092285b99d972d514083dff1b0746",
  "https://api.themoviedb.org/3/search/multi?api_key=2e7092285b99d972d514083dff1b0746",
  "https://api.themoviedb.org/3/search/person?api_key=2e7092285b99d972d514083dff1b0746",
];
let urlTv = [
  "https://api.themoviedb.org/3/search/collection?api_key=2e7092285b99d972d514083dff1b0746",
  "https://api.themoviedb.org/3/search/company?api_key=2e7092285b99d972d514083dff1b0746",
  "https://api.themoviedb.org/3/search/keyword?api_key=2e7092285b99d972d514083dff1b0746",
  "https://api.themoviedb.org/3/search/tv?api_key=2e7092285b99d972d514083dff1b0746",
  "https://api.themoviedb.org/3/search/multi?api_key=2e7092285b99d972d514083dff1b0746",
  "https://api.themoviedb.org/3/search/person?api_key=2e7092285b99d972d514083dff1b0746",
];
let resultados = document.querySelector(".containerPost");
let rtas = ""
let tit = ""
let query = new URLSearchParams(location.search)
let valor = query.get("q"); // Esta es del form
let tipo = query.get("tipo");// Esta es del radiobuttom
let url = [];

if (tipo == "pelicula") {
  url = urlMovie;
} else if (tipo == "serie") {
  url = urlTv;
}


verificador =""
noHay="No"
document.querySelector(".cargando").style.display = "block";
validador = [];

for (let a = 0; a < url.length; a++) {
  fetch(url[a])
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      let result = data.results;

      for (let i = 0; i < result.length; i++) {
        let name = result[i].title;
        let imagen = result[i].poster_path;
        let tiempo = result[i].release_date;
        if (name == valor) {  
          verificador = "No";
          for (let j = 0; j < validador.length; j++) {
            if (validador[j] == name) {
              verificador = "Si";
          }
          }
          if (verificador == "No") {
            validador.push(name);
            tit = `<h2 class="sp">Resultados de búsqueda: ${valor}</h2>`;
            rtas += `<article class="post">
                <a href="./detail-serie.html">
                  <img class="imgPost" src="https://image.tmdb.org/t/p/w500${imagen}" alt="">
                </a>
                <h3 class="titPost">${name}</h3>
                <p>${tiempo}</p>
              </article>`;
            noHay = "Si";
          }
        }
        }

      document.querySelector(".cargando").style.display = "none";
      resultados.innerHTML = tit + rtas;

      if (noHay == "No") {
        document.querySelector(".noHay").style.display = "block";
        document.querySelector(".sp").style.display = "none";
      }
    })
    .catch(function(error) {
      console.log("Error: " + error);
      document.querySelector(".cargando").style.display = "none";
    });
}


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
});