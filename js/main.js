"uses strict"

function processText(t, id) {
    let container = document.querySelector("#content");
    container.innerHTML = t;
    if(id = "catalago"){
        container.querySelector("#btn-add").addEventListener("click", agregar);
        container.querySelector("#btn-addx3").addEventListener("click", agregarx3);
        container.querySelector("#btn-delete").addEventListener("click", eliminarUlt);
        container.querySelector("#btn-deleteAll").addEventListener("click", vaciar);
    }
  }

async function load_content(id) {
    console.log("Loading content for {" + id + "}")
    // Update text "Content loading for {id}..."
    // Here you would do content loading magic...
    // Perhaps run Fetch API to update resources
    let container = document.querySelector("#content")
    try{
        let response = await fetch(`${window.location.origin}/${id}.html`)
        if(response.ok){
            response.text().then(processText, id);
        }
        else{
            document.querySelector("#content").innerHTML = 'Error loading for /' + id + '...';
        }
    }
    catch(error) {container.innerHTML = "Error"}
}

function push(event) {
    // Get id attribute of the button or link clicked
    let id = event.target.id;
    // Update Title in Window's Tab
    document.title = id;
    // Load content for this tab/page
    load_content(id);
    // Finally push state change to the address bar
    window.history.pushState({id}, `${id}`,`/page/${id}`);
    //document.querySelector("#catalogo").addEventListener('click', inicializarTabla);
}

window.onload = event => { 
    // Add history push() event when boxes are clicked
    document.querySelector("#home").addEventListener("click",event => push(event))
    document.querySelector("#catalogo").addEventListener("click",event => push(event))
    document.querySelector("#receta").addEventListener("click",event => push(event))
}
// Listen for PopStateEvent
// (Back or Forward buttons are clicked)
window.addEventListener("popstate", event => {
    // Grab the history state id
    let stateId = event.state.id;
    // Show clicked id in console (just for fun)
    console.log("stateId = ", stateId);
    // Load content for this tab/page
    load_content(stateId);
});


//empieza la parte de la tabla

let cat= []

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
        cat.push(fila);
    }
    mostrarTabla()
}
        
// elimina la ultima fila de la tabla de catalogos
function eliminarUlt(){
    let ultima = cat.length-1;
    cat.splice(ultima);
    mostrarTabla()
}
        
function vaciar(){
    let tablaCatalogo = document.querySelector("#tableBody")
    tablaCatalogo.innerHTML = ' ';
    cat = [];
}
        
function mostrarTabla(){
    let tablaCatalogo = document.querySelector("#tableBody")
    tablaCatalogo.innerHTML = " ";
    for (const item of cat) {
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

mostrarTabla()    