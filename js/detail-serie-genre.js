const query = location.search;
const params = new URLSearchParams(query);
const idGenero = params.get("id");
const nombreGenero  = params.get("nombreGenero");

const apiKey = '6b6cb210c82c48fac559ee907885a2e9';
const contenedor = document.querySelector("#contenedor-genero");
const tituloGenero = document.querySelector('#titulo-genero');
const urlSeries = `https://api.themoviedb.org/3/discover/tv?with_genres=${idGenero}&api_key=${apiKey}`;

fetch(urlSeries)
  .then(function(response) {
    return response.json();
  })
  .then(function (data) {
    const resultados = data.results;

    if (resultados.length > 0) {
      tituloGenero.innerText = `${nombreGenero}`;
    } else {
      tituloGenero.innerText = "No se encontraron resultados.";
    }

    let contenido = "";

    for (let i = 0; i < resultados.length; i++) {
      const item = resultados[i];
      let titulo = item.name;
      let imagen = "";

      if (item.poster_path) {
        imagen = "https://image.tmdb.org/t/p/w300" + item.poster_path;
      } else {
        imagen = "imagen-no-disponible.jpg";
      }
      contenido += `
        <article class="post">
           <a href="./detail-serie.html?id=${item.id}">
            <img class="imgPost" src="${imagen}" alt="${titulo}">
          </a>
          <h3 class="titPost">${titulo}</h3>
        </article>
      `;
    }
    contenedor.innerHTML = contenido;
  })


  .catch(function (error) {
    console.error("Error al cargar los datos:", error);
    tituloGenero.innerText = "Ocurrió un error al cargar la página.";
  });
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
