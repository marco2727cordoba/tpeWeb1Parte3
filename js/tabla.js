"use strict";

const URL = 'https://62bcab91eff39ad5ee29d087.mockapi.io/api/yerbas/productos'

document.querySelector("#btn-add").addEventListener("click", agregar);
document.querySelector("#btn-addx3").addEventListener("click", agregarx3);

function agregarx3(){
    for(let i = 0;i < 3; i++){
        agregar();
    }
}

async function agregar(){
    let producto = document.querySelector("#producto").value;
    let peso = document.querySelector("#peso").value;
    let precio= document.querySelector("#precio").value;
    let oferta= document.querySelector("#oferta").value;
    console.log(producto.value)
    if(producto != "" && peso != "" && precio != ""){
        let fila = {
            "producto": producto,
            "peso": peso,
            "precio": precio,   
            "oferta": oferta  
        }
    console.log(fila)
    try {                                  // se empieza agregar en el json de mockapi
        let resp = await fetch(URL, {
            "method": "POST",
            "headers": { "Content-type": "application/json"}, 
            "body": JSON.stringify(fila)
        });
        let json = await resp.json();
        console.log(json);
    } catch (error) {
        console.log("ERROR")
    }
    }
    mostrarTabla()
}

function inicForm(){
    console.log("INICIO DEL INIFORM")
    const idSeleccionado = this.dataset.id
    console.log(idSeleccionado)
    document.querySelector("#productoEdit").value = this.dataset.producto
    document.querySelector("#pesoEdit").value = this.dataset.peso
    document.querySelector("#precioEdit").value = this.dataset.precio
    document.querySelector("#ofertaEdit").value = this.dataset.oferta
    document.querySelector("#btn-modificar").addEventListener("click", function(){
        console.log("ENTRO ANTES DE LA FUNCION MODIFICAR")
        modificar(idSeleccionado)
    })
}


async function mostrarTabla(){
    const tablaCatalogo = document.querySelector("#tableBody")
    tablaCatalogo.innerHTML = ""
    try {
        let res = await fetch(URL); // este es el get para obtener los json que se guardaron en el mockapi
        let productos = await res.json();
        for (const item of productos ){
            if(item.oferta > 10){
                //con esta condicion resaltamos con color la fila que tiene oferta
                tablaCatalogo.innerHTML +=`<tr class = "resaltado">  
                <td>${item.producto}</td>
                <td>${item.peso}gr</td>
                <td>${item.precio}</td>
                <td>${item.oferta}%off</td>
                <td><button class = "btnEdit" data-id="${item.id}" data-producto = "${item.producto}" data-peso = "${item.peso}" data-precio = "${item.precio}" data-oferta = "${item.oferta}">EDITAR</button></td>
                </tr>`
            }
            else{
                tablaCatalogo.innerHTML +=`<tr> 
                <td>${item.producto}</td>
                <td>${item.peso}gr</td>
                <td>${item.precio}</td>
                <td></td>
                <td><button class = "btnEdit" data-id="${item.id}" data-producto = "${item.producto}" data-peso = "${item.peso}" data-precio = "${item.precio}" data-oferta = "${item.oferta}">EDITAR</button></td>
                </tr>`
            }
        asociarEventos()    
        }
    } catch (error) {   
        console.log("ERROR EN LA FUNCION MOSTRAR TABLA")
    }
}

function asociarEventos(){
    let botonesEditar = document.querySelectorAll(".btnEdit")
    for (const btn of botonesEditar) {
        btn.addEventListener("click", inicForm)
    }
}

async function modificar(id){
    let producto = document.querySelector("#productoEdit").value;
    let peso = document.querySelector("#pesoEdit").value;
    let precio= document.querySelector("#precioEdit").value;
    let oferta= document.querySelector("#ofertaEdit").value;
    if(producto != "" && peso != "" && precio != ""){
        console.log("ENTRO EN EL IF DE MODIFICAR");
        let fila = {
            "producto": producto,
            "peso": peso,
            "precio": precio,   
            "oferta": oferta  
        }
        try {
            console.log("ENTRO AL PRINCIPIO DEL TRY");
            let res = await fetch(URL + "/" + id, {
               "method": "PUT",
               "mode": "cors",
               "headers": { "Content-type": "application/json"}, 
               "body": JSON.stringify(fila)
           })
           mostrarTabla()
       } catch (error) {
           console.log(error)   
       }    
    }

}

mostrarTabla(); 