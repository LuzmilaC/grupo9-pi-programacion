let querySelector = location.search;
console.log(querySelector); //solo para chequear

let objQuery = new URLSearchParams(querySelector);
console.log(objQuery.get('id')); //solo para chequear; te imprime el valor

let idPelicula = objQuery.get('id');

let APIkey = "2e7092285b99d972d514083dff1b0746";
const urlDet=`https://api.themoviedb.org/3/movie/${idPelicula}?api_key=${APIkey}`;

//recuperar elementos del dom
let imagen = document.querySelector(".imagen");
let titulo = document.querySelector(".titulo");
let calificacion = document.querySelector(".calificacion");
let fecha = document.querySelector(".fecha");
let duracion = document.querySelector(".duracion");
let sinopsis = document.querySelector(".sinopsis");
let genero = document.querySelector(".genero");
let baseImg="https://image.tmdb.org/t/p/w300";

fetch(urlDet)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        imagen.src = `${baseImg}/${data.poster_path}`;
        titulo.innerText = `Titulo: ${data.original_title}`;
        calificacion.innerText = `Calificacion: ${data.vote_average}`;
        fecha.innerText = `Fecha de estreno: ${data.release_date}`;
        duracion.innerText = `Duración: ${data.runtime}`;
        sinopsis.innerText = `Sinopsis: ${data.overview}`;
  
        let nombreGeneros = "";
        for (let i = 0; i < data.genres.length; i++) {
            nombreGeneros += data.genres[i].name;
            if (i < data.genres.length - 1) {
                nombreGeneros += ", ";
        }
        }
        genero.innerText = `Género: ${nombreGeneros}`;
    })
    .catch(function(error){
        console.log("El error es: " + error);
    });

//Esto es un estilo para el header (Mandarlo abajo de todo si queres)
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