"use strict";

let numero = Math.floor(Math.random()*1000 + 1);
document.querySelector(".num").innerHTML = "el numero es: "+numero;
let respu = document.getElementById("respuesta");
let boton = document.getElementById("btn-enviar");
let botonRefrescar = document.getElementById("btn-refrescar");
botonRefrescar.addEventListener("click",refrescarNumero);
boton.addEventListener("click", verificarNumero);


// esta funcion verifica si el numero que el usuario ingreso coincide con el numero aleatorio que si genero
function verificarNumero(){
    if(respu.value == numero){
        document.querySelector(".validacion").innerHTML = "respuesta correcta";
    }
    else{
        document.querySelector(".validacion").innerHTML = "la respuesta no es correcta";
    }
}

// esta funcion genera un nuevo numero aleatorio en caso que el usuario quiere refrescar el captcha  
function refrescarNumero(){
    numero = Math.floor(Math.random()*1000 + 1);
    document.querySelector(".num").innerHTML = "nuevo numero: "+ numero;
}

