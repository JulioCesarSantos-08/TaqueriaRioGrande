import {

mesa,
cliente,
botonCrear

} from "./crearPedidoUI.js";

import {

personas

} from "./personas.js";

function validarPedido(){

const mesaValida=

mesa.value.trim()!=="";

let tieneProductos=false;

personas.forEach(persona=>{

if(persona.cantidadProductos>0){

tieneProductos=true;

}

});

botonCrear.disabled=

!(mesaValida && tieneProductos);

botonCrear.classList.toggle(

"habilitado",

mesaValida && tieneProductos

);

}

document.addEventListener(

"persona-actualizada",

validarPedido

);

mesa.addEventListener(

"input",

validarPedido

);

cliente.addEventListener(

"input",

validarPedido

);

document.addEventListener(

"pedido-listo",

validarPedido

);