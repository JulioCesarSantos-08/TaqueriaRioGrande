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

contenidoExtras,
botonExtras,
botonLimpiar,

totalPedido,
contadorProductos,
botonCrear

} from "./crearPedidoUI.js";

document.addEventListener("pedido-listo",()=>{

activarBotones();

actualizarTotales();

//configurarExtras();

//configurarLimpiar();

mesa.addEventListener("input",validarPedido);

});

function activarBotones(){

document.addEventListener("click",(e)=>{

const botonMas=e.target.closest(".mas");

const botonMenos=e.target.closest(".menos");

if(botonMas){

const id=botonMas.dataset.id;

cantidades[id]++;

actualizarProducto(id);

}

if(botonMenos){

const id=botonMenos.dataset.id;

if(cantidades[id]>0){

cantidades[id]--;

actualizarProducto(id);

}

}

});

}

function actualizarProducto(id){

const producto=productos.find(p=>p.id===id);

const cantidad=cantidades[id];

const subtotal=producto.precio*cantidad;

document.getElementById(`cantidad-${id}`).textContent=cantidad;

document.getElementById(`subtotal-${id}`).textContent="$"+subtotal.toFixed(2);

const tarjeta=document.getElementById(`card-${id}`);

if(cantidad>0){

tarjeta.classList.add("activo");

}else{

tarjeta.classList.remove("activo");

}

actualizarTotales();

}

function actualizarTotales(){

let total=0;

let cantidadProductos=0;

productos.forEach(producto=>{

const cantidad=cantidades[producto.id];

cantidadProductos+=cantidad;

total+=cantidad*producto.precio;

});

totalPedido.textContent="$"+total.toFixed(2);

contadorProductos.textContent=

cantidadProductos===1

? "1 producto"

: cantidadProductos+" productos";

validarPedido();

}

function validarPedido(){

let tieneProductos=false;

for(const id in cantidades){

if(cantidades[id]>0){

tieneProductos=true;

break;

}

}

if(

mesa.value.trim()!=="" &&

tieneProductos

){

botonCrear.disabled=false;

botonCrear.classList.add("habilitado");

}else{

botonCrear.disabled=true;

botonCrear.classList.remove("habilitado");

}

}