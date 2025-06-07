function noHay(result) {
  if (result == 0) {
    document.querySelector(".busquedaRetas").style.display = "none";
    document.querySelector(".noHay").style.display = "block";
  }
}
let resultados = document.querySelector(".containerResult");
let query = new URLSearchParams(location.search);
let valor = query.get("q");
let tipo = query.get("tipo");
let url = [];
let urlMovie = `https://api.themoviedb.org/3/search/movie?api_key=2e7092285b99d972d514083dff1b0746&query=${valor}`;
let urlTv = `https://api.themoviedb.org/3/search/tv?api_key=2e7092285b99d972d514083dff1b0746&query=${valor}`;

let rtas = "";
let cargando = document.querySelector(".cargando");
exsite = "no"
cargando.style.display = "block";


if (tipo == "pelicula") {
  fetch(urlMovie)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (data) {
      let result = data.results;
      console.log(result);

      for (let i = 0; i < result.length; i++) {
        let item = result[i];
        let name = item.title;
        let tiempo = item.release_date;
        let imagen = item.poster_path;
        let id = item.id;
        rtas += `
          <article class="post">
            <h3 class="titPost">${name}</h3>
            <a href="./detail-movie.html?id=${id}">
             <img class="imgPost" src="https://image.tmdb.org/t/p/w500${imagen}" alt="No Hay Imagen">
            </a>
            <p>${tiempo}</p>
          </article>`;
      }

      let tit = `<h2 class="tituloBusqueda">Resultados de búsqueda: ${valor}</h2>`;
      document.querySelector(".busquedaRetas").innerHTML = tit;
      resultados.innerHTML = rtas;
      cargando.style.display = "none";
      noHay(result)
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}

else if (tipo == "serie") {
  fetch(urlTv)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (data) {
      let result = data.results;
      console.log(result);

      for (let i = 0; i < result.length; i++) {
        let item = result[i];
        let name = item.name;
        let tiempo = item.first_air_date;
        let imagen = item.poster_path;
        let id = item.id;
        rtas += `
          <article class="post">
            <h3 class="titPost">${name}</h3>
            <a href="./detail-serie.html?id=${id}">
             <img class="imgPost" src="https://image.tmdb.org/t/p/w500${imagen}" alt="No Hay Imagen">
            </a>

            <p>${tiempo}</p>
          </article>`;
      }
      let tit = `<h2 class="tituloBusqueda">Resultados de búsqueda: ${valor}</h2>`;
      document.querySelector(".busquedaRetas").innerHTML = tit;
      resultados.innerHTML = rtas;
      document.querySelector(".cargando").style.display = "none";
      noHay(result)
    })
    .catch(function (error) {
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
