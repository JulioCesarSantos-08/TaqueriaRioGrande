import {
listaProductos,
contenidoExtras
} from "./crearPedidoUI.js";

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

const destino=

producto.categoria==="Oculto"

?contenidoExtras

:listaProductos;

if(

categoriaActual!==producto.categoria &&

producto.categoria!=="Oculto"

){

categoriaActual=producto.categoria;

destino.innerHTML+=`

<h3 class="categoria">

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

<input
type="number"
min="0"
value="0"
class="cantidadInput"
id="cantidad-${producto.id}"
data-id="${producto.id}"
>

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