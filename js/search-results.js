const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=2e7092285b99d972d514083dff1b0746";
let resultados = document.querySelector(".containerPost");
let rtas = ""
let query = new URLSearchParams(location.search)
let valor = query.get("q")
verificador ="No"
document.querySelector(".cargando").style.display = "block";
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
fetch(url)
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    console.log(data);
    let result = data.results;
    for (let i=0 ; i<result.length ; i++){
      let genero = result[i].genre_ids;
      let name = result[i].title;
      let imagen = result[i].poster_path;
      let tiempo = result[i].release_date;
        for (let j = 0; j < genero.length; j++){
            if (generos[genero[j]] == valor){
              verificador = "Si"
              rtas +=`<article class="post">
                  <a href="./detail-serie.html">
                     <img class="imgPost"src="https://image.tmdb.org/t/p/w500${imagen}" alt="">
                  </a>
                <h3 class="titPost">${name}</h3>
                <p>${tiempo}</p>
                </article>`  
            };
            }
        };  
    document.querySelector(".cargando").style.display = "none";
    resultados.innerHTML=rtas
    if (verificador == "No") {
            document.querySelector(".noHay").style.display= "block";
            document.querySelector(".sp").style.display= "none";
            };
  })
  .catch(function(error) {
    console.log("Error: " + error);
    document.querySelector(".cargando").style.display = "none";
  });
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