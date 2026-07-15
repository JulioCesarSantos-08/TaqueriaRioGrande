import { personas } from "./personas.js";
import { productos } from "./productos.js";
import { actualizarPedidoPersona } from "./pedidoPersonaUI.js";

document.addEventListener("click",(e)=>{

const boton=e.target;

if(boton.classList.contains("masPersona")){

const idPersona=Number(

boton.dataset.persona

);

const idProducto=

boton.dataset.producto;

agregarProducto(

idPersona,

idProducto

);

}

if(boton.classList.contains("menosPersona")){

const idPersona=Number(

boton.dataset.persona

);

const idProducto=

boton.dataset.producto;

quitarProducto(

idPersona,

idProducto

);

}

});

function agregarProducto(

idPersona,

idProducto

){

const persona=

personas.find(

p=>p.id===idPersona

);

if(!persona){

return;

}

const producto = productos.find(

    p => p.id === idProducto

);

if (!producto) return;

if (!persona.productos[idProducto]) {

    persona.productos[idProducto] = {

        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 0

    };

}

persona.productos[idProducto].cantidad++;

actualizarVista(

idPersona,

idProducto,

persona

);

}

function quitarProducto(

idPersona,

idProducto

){

const persona=

personas.find(

p=>p.id===idPersona

);

if(!persona){

return;

}

if(!persona.productos[idProducto]){

return;

}

persona.productos[idProducto].cantidad--;

if (persona.productos[idProducto].cantidad <= 0) {

    delete persona.productos[idProducto];

}

actualizarVista(

idPersona,

idProducto,

persona

);

}

function actualizarVista(

idPersona,

idProducto,

persona

){

const span=document.getElementById(

`cantidad-${idPersona}-${idProducto}`

);

if(span){

span.textContent =

persona.productos[idProducto]
? persona.productos[idProducto].cantidad
: 0;

}

actualizarPedidoPersona(idPersona);

document.dispatchEvent(

new CustomEvent(

"persona-actualizada",

{

detail:persona

}

)

);

}