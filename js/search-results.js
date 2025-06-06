let resultados = document.querySelector(".containerPost");
let query = new URLSearchParams(location.search);
let valor = query.get("q");
let tipo = query.get("tipo");
let url = [];
let urlMovie = `https://api.themoviedb.org/3/search/movie?api_key=2e7092285b99d972d514083dff1b0746&query=${valor}`;
let urlTv = `https://api.themoviedb.org/3/search/tv?api_key=2e7092285b99d972d514083dff1b0746&query=${valor}`;

let rtas = "";
let sinResultados = "si";
let cargando = document.querySelector(".cargando");
let nombresMostrados = []; 
exsite= "no"


if (tipo == "pelicula") {
    buscar = [
    "title",
    "original_title",
    "release_date",
    "original_language",
    "overview",
    "id"
  ];
  fetch(urlMovie)
    .then(function(respuesta) {
      return respuesta.json();
    })
    .then(function(data) {
      let result = data.results;
      console.log(result);

      for (let i = 0; i < result.length; i++) {
        let item = result[i];

        for (let j = 0; j < buscar.length; j++) {
          let campo = buscar[j];
          if (item[campo] == valor) {
            let name = item.title;
            let tiempo = item.release_date;
            let imagen = item.poster_path;
            let id = item.id;
            for (let f = 0; f < nombresMostrados.length; f++)
              if (nombresMostrados[f] == name) {
                exsite = "si"
            }
          if (exsite=="no") {
            nombresMostrados.push(name);
            sinResultados = "no";
            rtas += `
              <article class="post">
                <h3 class="titPost">${name}</h3>
                <a href="./detail-serie.html">
                  <img class="imgPost" src="https://image.tmdb.org/t/p/w500${imagen}?id=${id}" alt="No Hay Imagen">
                </a>
                <p>${tiempo}</p>
              </article>`;
          }
          }
        }
      }

      let tit = `<h2 class="tituloBusqueda">Resultados de búsqueda: ${valor}</h2>`;
      document.querySelector(".busquedaRetas").innerHTML = tit;
      resultados.innerHTML = rtas;
      document.querySelector(".cargando").style.display = "none";

      if (sinResultados == "si") {
        document.querySelector(".busquedaRetas").style.display = "none";
        document.querySelector(".noHay").style.display = "block";
      }
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

if (tipo == "serie") {
    buscar = [
    "name",
    "original_name",
    "first_air_date", 
    "original_language",
    "overview",
    "id"
  ];
  fetch(urlTv)
    .then(function(respuesta) {
      return respuesta.json();
    })
    .then(function(data) {
      let result = data.results;
      console.log(result);

      for (let i = 0; i < result.length; i++) {
        let item = result[i];

        for (let j = 0; j < buscar.length; j++) {
          let campo = buscar[j];
          if (item[campo] == valor) {
            let name = item.title;
            let tiempo = item.release_date;
            let imagen = item.poster_path;
            let id = item.id;
            for (let f = 0; f < nombresMostrados.length; f++)
              if (nombresMostrados[f] == name) {
                exsite = "si"
            }
          if (exsite=="no") {
            nombresMostrados.push(name);
            sinResultados = "no";
            rtas += `
              <article class="post">
                <h3 class="titPost">${name}</h3>
                <a href="./detail-serie.html">
                  <img class="imgPost" src="https://image.tmdb.org/t/p/w500${imagen}?id=${id}" alt="No Hay Imagen">
                </a>
                <p>${tiempo}</p>
              </article>`;
          }
          }
        }
      }

      let tit = `<h2 class="tituloBusqueda">Resultados de búsqueda: ${valor}</h2>`;
      document.querySelector(".busquedaRetas").innerHTML = tit;
      resultados.innerHTML = rtas;
      document.querySelector(".cargando").style.display = "none";

      if (sinResultados == "si") {
        document.querySelector(".busquedaRetas").style.display = "none";
        document.querySelector(".noHay").style.display = "block";
      }
    })
    .catch(function(error) {
      console.log("Error: " + error);
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
})