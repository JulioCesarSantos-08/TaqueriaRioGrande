import {
productos
} from "./productos.js";

import {
cantidades
} from "./crearPedidoProductos.js";

import {

mesa,
cliente,
celular,
nombreUsuario,

botonCrear,
botonLimpiar,
botonExtras,
contenidoExtras

} from "./crearPedidoUI.js";

let pedidoActual=null;

document.addEventListener("pedido-listo",()=>{

botonCrear.addEventListener("click",crearObjetoPedido);

});

export function obtenerPedidoActual(){

return pedidoActual;

}

function crearObjetoPedido(){

const lista={};

let total=0;

let cantidadProductos=0;

productos.forEach(producto=>{

const cantidad=cantidades[producto.id];

if(cantidad<=0){

return;

}

const subtotal=cantidad*producto.precio;

lista[producto.id]={

nombre:producto.nombre,

categoria:producto.categoria,

precio:producto.precio,

cantidad:cantidad,

subtotal:subtotal

};

total+=subtotal;

cantidadProductos+=cantidad;

});

if(Object.keys(lista).length===0){

alert("Agrega al menos un producto.");

return;

}

pedidoActual={

mesa:Number(mesa.value),

cliente:cliente.value.trim(),

celular:celular.value.trim(),

mesero:nombreUsuario,

fecha:new Date().toLocaleDateString("es-MX"),

hora:new Date().toLocaleTimeString("es-MX",{

hour:"2-digit",

minute:"2-digit"

}),

estado:"pendiente",

productos:lista,

cantidadProductos,

total

};

console.clear();

console.log("PEDIDO");

console.log(pedidoActual);

document.dispatchEvent(

new CustomEvent(

"pedido-creado",

{

detail:pedidoActual

}

)

);

}
