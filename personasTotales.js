import { personas } from "./personas.js";

import {

contadorProductos,
totalPedido

} from "./crearPedidoUI.js";

let cantidadMesaExtra = 0;
let totalMesaExtra = 0;

document.addEventListener(

"persona-actualizada",

(e)=>{

    calcularPersona(e.detail);

    calcularMesa();

}

);

document.addEventListener(

"mesa-total-actualizado",

(e)=>{

    cantidadMesaExtra = e.detail.cantidad;

    totalMesaExtra = e.detail.total;

    calcularMesa();

}

);

function calcularPersona(persona){

    let cantidad = 0;
    let total = 0;

    Object.values(persona.productos).forEach(producto=>{

        cantidad += producto.cantidad;

        total += producto.cantidad * producto.precio;

    });

    persona.cantidadProductos = cantidad;

    persona.total = total;

    const cantidadHTML = document.getElementById(

        `cantidadPersona-${persona.id}`

    );

    const totalHTML = document.getElementById(

        `totalPersona-${persona.id}`

    );

    if(cantidadHTML){

        cantidadHTML.textContent = cantidad;

    }

    if(totalHTML){

        totalHTML.textContent =

        `$${total.toFixed(2)}`;

    }

}

function calcularMesa(){

    let cantidadMesa = 0;

    let totalMesa = 0;

    personas.forEach(persona=>{

        cantidadMesa += persona.cantidadProductos;

        totalMesa += persona.total;

    });

    const productosTotales =

    cantidadMesa + cantidadMesaExtra;

    const totalGeneral =

    totalMesa + totalMesaExtra;

    contadorProductos.textContent =

    `${productosTotales} producto${productosTotales===1?"":"s"}`;

    totalPedido.textContent =

    `$${totalGeneral.toFixed(2)}`;

}