// PASO 1: Leer parámetros de la URL
const query = location.search;
const params = new URLSearchParams(query);
const idGenero = params.get("id");

// PASO 2: Referencias a elementos del HTML
const apiKey = '6b6cb210c82c48fac559ee907885a2e9';
const contenedor = document.querySelector("#contenedor-genero");
const tituloGenero = document.querySelector('#titulo-genero');

// URL para obtener la lista de géneros de películas
const urlGeneros = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`;

let nombreGenero = "";

fetch(urlGeneros)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let encontrado = false;
    for (let i = 0; i < data.genres.length; i++) {
      if (!encontrado && data.genres[i].id == idGenero) {
        nombreGenero = data.genres[i].name;
        encontrado = true;
      }
    }

    const urlPeliculas = `https://api.themoviedb.org/3/discover/movie?with_genres=${idGenero}&api_key=${apiKey}`;

    return fetch(urlPeliculas);
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const resultados = data.results;

    if (resultados.length > 0) {
      tituloGenero.innerText = `Resultados de películas del género ${nombreGenero}`;
    } else {
      tituloGenero.innerText = "No se encontraron resultados.";
    }

    contenedor.innerHTML = "";

    for (let i = 0; i < resultados.length; i++) {
      const item = resultados[i];
      let titulo = item.title;
       let imagen = "";

      if (item.poster_path) {
    imagen = "https://image.tmdb.org/t/p/w300" + item.poster_path;
  } else {
    imagen = "imagen-no-disponible.jpg";
  }

      contenedor.innerHTML += `
        <article class="post">
          <a href="detalle-pelicula.html?id=${item.id}">
            <img class="imgPost" src="${imagen}" alt="${titulo}">
            <h3 class="titPost">${titulo}</h3>
          </a>
        </article>
      `;
    }
  })
  .catch(function(error) {
    console.error("Error al cargar los datos:", error);
    tituloGenero.innerText = "Ocurrió un error al cargar la página.";
  });

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