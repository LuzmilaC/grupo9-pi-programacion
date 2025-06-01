const url = "https://api.themoviedb.org/3/movie/popular?api_key=2e7092285b99d972d514083dff1b0746";
let resultados = document.querySelector(".generos");
let rtas = ""
const generos = {
  28: "Acción",
  12: "Aventura",
  16: "Animación",
  35: "Comedia",
  80: "Crimen",
  99: "Documental",
  18: "Drama",
  10751: "Familia",
  14: "Fantasía",
  36: "Historia",
  27: "Terror",
  10402: "Música",
  9648: "Misterio",
  10749: "Romance",
  878: "Ciencia ficción",
  10770: "TV",
  53: "Suspenso",
  10752: "Bélica",
  37: "Western"
};
let generosAgregados = [];

fetch(url)
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    console.log(data);
    let result = data.results;
    for (let i = 0; i < result.length; i++) {
      let todos = result[i].genre_ids;
      for (let j = 0; j < todos.length; j++) {
        let id = todos[j];
        let genero = generos[id];
        let yaAgregado = false;

        for (let k = 0; k < generosAgregados.length; k++) {
          if (generosAgregados[k] == genero) {
            yaAgregado = true;
            break;
          }
        }

        if (yaAgregado == false && genero != undefined) {
          generosAgregados.push(genero);
          rtas += `<h2><a href="detailMovie-genres.html">${genero}</a></h2>`;
        }
      }
    }
    resultados.innerHTML = rtas;
  })
  .catch(function(error) {
    console.log("Error: " + error);
    document.querySelector(".cargando").style.display = "none";
  });