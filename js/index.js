const apiKey = "6b6cb210c82c48fac559ee907885a2e9"

const urlPelicula = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`

const urlSerie = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`

const urlSerieValorada = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`

let peliculas = document.querySelector(".containerPeliculas")     // para películas
let series = document.querySelector(".containerSeries")           // para series populares
let seriesValoradas = document.querySelector(".containerSeriesValoradas") // para series valoradas

function home(url, contenedor) {
  fetch(url)
    .then(function(response) {
      return response.json() // convierto la respuesta a JSON
    })
    .then(function(data) {
      console.log(data)

      let acumuladora = ""

      for (let i = 0; i < data.results.length && i < 5; i++) {
        const item = data.results[i]

        let imagen = "";

        if (item.poster_path) {
          imagen = "https://image.tmdb.org/t/p/w300" + item.poster_path;
        } else {
          imagen = "imagen-no-disponible.jpg";
        }

        let titulo = "";

        if (item.title) {
          titulo = item.title;
        } else {
          titulo = item.name;
        }

        let fecha = "";

        if (item.release_date) {
          fecha = item.release_date;
        } else {
          fecha = item.first_air_date;
        }

        acumuladora += `
          <article class="post">
            <a href="./detail-movie.html?id=${item.id}">
              <img class="imgPost" src="${imagen}" alt="${titulo}">
            </a>
            <h3 class="titPost">${titulo}</h3>
            <p>${fecha}</p>
          </article>`
      }

      contenedor.innerHTML = acumuladora
    })
    .catch(function(error) {

      console.log("Error: " + error)
      contenedor.innerHTML = "<p>Error al cargar los datos</p>";
    })
}

home(urlPelicula, peliculas)
home(urlSerie, series)
home(urlSerieValorada, seriesValoradas)



//Esto es un estilo para el header (Mandarlo abajo de todo si queres)
window.addEventListener("load", function () {
    let botones = document.querySelectorAll(".textTitulo");

    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("mouseover", function () {
            this.style.color = "rgb(100, 200, 255)";
        });

        botones[i].addEventListener("mouseout", function () {
            this.style.color = ""; // vuelve al color original
        });
    }
});


///para la pelicula principal
let descripcion = document.querySelector(".descripcion");
let titulo = document.querySelector(".tt");

const urlDetalle = `https://api.themoviedb.org/3/movie/634649?api_key=${apiKey}&language=es-ES` 

fetch(urlDetalle)
.then(function(response) {
  return response.json();
})
.then(function(data) {
 titulo.innerText = data.title;
descripcion.innerText = data.overview;

})
.catch(function(error) {
  console.log("Error: " + error);
})
//boton ver trailer

const boton = document.querySelector(".mas");
boton.addEventListener( "click" , function() {
  location.href ="https://www.youtube.com/watch?v=JfVOs4VSpmA";

});


