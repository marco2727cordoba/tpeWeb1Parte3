"use strict";

let catalogo= [
    {
      "producto":"Yerba Hierbas Serranas Camperito",
      "peso": 500,
      "precio": 500,
      "oferta": 10
      
    },
    {
      "producto": "Yerba Suave Camperito",
      "peso":  500,
      "precio":700,
      "oferta": 15
    },
    {
      "producto": "Yerba Boldo y Menta Camperito",
      "peso": 500,
      "precio": 850,
      "oferta": 20
    }
]

document.querySelector("#btn-add").addEventListener("click", agregar);
document.querySelector("#btn-addx3").addEventListener("click", agregarx3);
document.querySelector("#btn-delete").addEventListener("click", eliminarUlt);
document.querySelector("#btn-deleteAll").addEventListener("click", vaciar);

function agregarx3(){
    for(let i = 0;i < 3; i++){
        agregar();
    }
}

function agregar(){
    let producto = document.querySelector("#producto").value;
    let peso = document.querySelector("#peso").value;
    let precio= document.querySelector("#precio").value;
    let oferta= document.querySelector("#oferta").value;
    if(producto != "" && peso != "" && precio != ""){
        let fila = {
            "producto": producto,
            "peso": peso,
            "precio": precio,   
            "oferta": oferta  
        }
        catalogo.push(fila);
    }

mostrarTabla();
}

// elimina la ultima fila de la tabla de catalogos
function eliminarUlt(){
    let ultima = catalogo.length-1;
    catalogo.splice(ultima);
    mostrarTabla()
}

function vaciar(){
    let tablaCatalogo = document.querySelector("#tableBody")
    tablaCatalogo.innerHTML = ' ';
    catalogo = [];
}

function mostrarTabla(){
    let tablaCatalogo = document.querySelector("#tableBody")
    tablaCatalogo.innerHTML = ' ';
    for (const item of catalogo) {
        if(item.oferta > 10){      //con esta condicion resaltamos con color la fila que tiene oferta
            tablaCatalogo.innerHTML +=`<tr class = "resaltado"> 
            <td>${item.producto}</td>
            <td>${item.peso}gr</td>
            <td>$${item.precio}</td>
            <td>${item.oferta}%off</td>
            </tr>`
        }
        else{
            tablaCatalogo.innerHTML +=`<tr> 
            <td>${item.producto}</td>
            <td>${item.peso}gr</td>
            <td>$${item.precio}</td>
            </tr>`
        }
        
    }

}

mostrarTabla();