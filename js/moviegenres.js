const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=2e7092285b99d972d514083dff1b0746";
let resultados = document.querySelector(".generos");
let rtas = ""

fetch(url)
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    console.log(data);
    let result = data.genres;
    for (let i = 0; i < result.length; i++) {
        let genero = result[i].name;
        let id = result[i].id;
        rtas += `
        <h2 class="textGenres"><a href="detailMovie-genres.html?id=${id}&nombreGenero=${genero}">${genero}</a></h2>`;
    }
    resultados.innerHTML = rtas;
  })
  .catch(function(error) {
    console.log("Error: " + error);
    document.querySelector(".cargando").style.display = "none";
  });
