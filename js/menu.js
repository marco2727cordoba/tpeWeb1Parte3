"use strict";
// en esta parte hacemos el menu desplegable cuando el menu se hace responsi
document.querySelector(".btn_barra").addEventListener("click", ocultar);

//ademas de ocultar el menu desplegable, tambien cambiamos la imagen del menu hamburguesa por un a X
function ocultar(){
    document.querySelector(".navegacion").classList.toggle("show");
    
    let imagen = document.querySelector(".btn_barra"); 
    if(imagen.src.match("img/burger-menu.png")){
        imagen.src = "img/imagen-X.png";
    }
    else{
        imagen.src = "img/burger-menu.png"
    }
}












