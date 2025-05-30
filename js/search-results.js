const url = "";
let resultados = document.querySelector(".containerPost");
let rtas = ""
let query = new URLSearchParams(location.search)
let valor = query.get("q")
verificador ="No"
fetch(url)
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    console.log(data);
    let result = data.results;
    for (let i=0 ; i<result.length ; i++){
        let name = result[i].name;
        let imagen = result[i].image;
        let tiempo = result[i].tiempo;
        if (name == valor){
            verificador = "Si"
            rtas +=`<article class="post">
                <a href="./detail-serie.html">
                    <img class="imgPost" src=${imagen}
                    alt="poster de la serie la casa de papel">
                </a>
                <h3 class="titPost">${name}</h3>
                <p>${tiempo}</p>`  
            };
        };  
    resultados.innerHTML=rtas
    if (verificador == "No") {
            document.querySelector(".noHay").style.display= "block";
            document.querySelector(".sp").style.display= "none";
            };
  })
  .catch(function(error) {
    console.log("Error: " + error);
  });
