let resultados = document.querySelector(".containerPost");
let query = new URLSearchParams(location.search);
let valor = query.get("q");
let tipo = query.get("tipo");
let url = [];


let urlMovie = `https://api.themoviedb.org/3/search/movie?api_key=2e7092285b99d972d514083dff1b0746&query=${valor}`;
let urlTv = `https://api.themoviedb.org/3/search/tv?api_key=2e7092285b99d972d514083dff1b0746&query=${valor}`;


let rtas = "";
let validador = [];
let sinResultados = "si";
let cargando = document.querySelector(".cargando");
//Unica forma
if (cargando != null) {
  cargando.style.display = "block";
}

if (tipo == "pelicula") {
  fetch(urlMovie)
    .then(function(respuesta) {
      return respuesta.json();
    })
    .then(function(data) {
      let result = data.results;
      console.log(result);
      
      for (let i = 0; i < result.length; i++) {
        let item = result[i];
        let coincide = false;

        if (item.title == valor) {
          coincide = true;
        }
        if (item.original_title == valor) {
          coincide = true;
        }
        if (item.overview == valor) {
          coincide = true;
        }
        if (item.release_date == valor) {
          coincide = true;
        }

        if (coincide == true) {
          let name = "Sin título";
          if (item.title != undefined) {
            name = item.title;
          }

          let tiempo = "Sin fecha";
          if (item.release_date != undefined) {
            tiempo = item.release_date;
          }

          let imagen = "";
          if (item.poster_path != undefined) {
            imagen = item.poster_path;
          }

          let esta = false;
          for (let j = 0; j < validador.length; j++) {
            if (validador[j] == name) {
              esta = true;
            }
          }

          if (esta == false) {
            sinResultados = "no"
            validador.push(name);
            rtas += `
                <article class="post">
                    <h3 class="titPost">${name}</h3>
                    <a href="./detail-serie.html">
                    <img class="imgPost" src="https://image.tmdb.org/t/p/w500${imagen}" alt="">
                    </a>
                    <p>${tiempo}</p>
                </article>`;
        }
      }
      let tit = `<h2 class="tituloBusqueda">Resultados de búsqueda: ${valor}</h2>`;
      document.querySelector(".busquedaRetas").innerHTML  = tit;
      resultados.innerHTML = rtas;
      document.querySelector(".cargando").style.display = "none";
      if (sinResultados == "si") {
        document.querySelector(".busquedaRetas").style.display = "none";
        document.querySelector(".noHay").style.display = "block";
      }
      }
    });
}
if (tipo == "serie") {
  fetch(urlTv)
    .then(function(respuesta) {
      return respuesta.json();
    })
    .then(function(data) {
      let result = data.results;
      for (let i = 0; i < result.length; i++) {
        let item = result[i];
        let coincide = false;

        if (item.name == valor) {
          coincide = true;
        }
        if (item.original_name == valor) {
          coincide = true;
        }
        if (item.overview == valor) {
          coincide = true;
        }
        if (item.first_air_date == valor) {
          coincide = true;
        }

        if (coincide == true) {
          let name = "Sin título";
          if (item.name != undefined) {
            name = item.name;
          }

          let tiempo = "Sin fecha";
          if (item.first_air_date != undefined) {
            tiempo = item.first_air_date;
          }

          let imagen = "";
          if (item.poster_path != undefined) {
            imagen = item.poster_path;
          }

          let esta = false;
          for (let j = 0; j < validador.length; j++) {
            if (validador[j] == name) {
              esta = true;
            }
          }

          if (esta == false) {
            sinResultados = "no"
            validador.push(name);
            rtas += `
                <article class="post">
                    <h3 class="titPost">${name}</h3>
                    <a href="./detail-serie.html">
                    <img class="imgPost" src="https://image.tmdb.org/t/p/w500${imagen}" alt="">
                    </a>
                    <p>${tiempo}</p>
                </article>`;
          }
        }
      }
      let tit = `<h2 class="tituloBusqueda">Resultados de búsqueda: ${valor}</h2>`;
      document.querySelector(".busquedaRetas").innerHTML  = tit;
      resultados.innerHTML = rtas;
      document.querySelector(".cargando").style.display = "none";
      if (sinResultados == "si") {
        document.querySelector(".busquedaRetas").style.display = "none";
        document.querySelector(".noHay").style.display = "block";
      }
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