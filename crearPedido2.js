import {
listaProductos,
contenidoExtras
} from "./crearPedido1.js";

import {
productos
} from "./productos.js";

export const cantidades={};

productos.forEach(producto=>{

cantidades[producto.id]=0;

});

document.addEventListener("pedido-listo",()=>{

crearProductos();

});

function crearProductos(){

listaProductos.innerHTML="";

contenidoExtras.innerHTML="";

let categoriaActual="";

productos.forEach(producto=>{

const destino=producto.extra
?contenidoExtras
:listaProductos;

if(categoriaActual!==producto.categoria){

categoriaActual=producto.categoria;

destino.innerHTML+=`

<h3 class="categoria">

${producto.icono}

${producto.categoria}

</h3>

`;

}

destino.innerHTML+=`

<div
class="producto-card"
id="card-${producto.id}">

<div class="producto-info">

<div>

<h4>

${producto.nombre}

</h4>

<p>

$${producto.precio}

</p>

</div>

</div>

<div class="cantidad">

<button
class="menos"
data-id="${producto.id}">

<i class="fa-solid fa-minus"></i>

</button>

<span
id="cantidad-${producto.id}">

0

</span>

<button
class="mas"
data-id="${producto.id}">

<i class="fa-solid fa-plus"></i>

</button>

</div>

<div class="subtotal">

<span>

Subtotal

</span>

<strong
id="subtotal-${producto.id}">

$0.00

</strong>

</div>

</div>

`;

});

}