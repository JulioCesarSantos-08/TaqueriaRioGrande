import { productos } from "./productos.js";

import { pedidoActual } from "./agregarProductos2.js";

const listaProductos=document.getElementById("listaProductos");
const contenidoExtras=document.getElementById("contenidoExtras");
const botonExtras=document.getElementById("mostrarExtras");

const cantidades={};

productos.forEach(producto=>{

cantidades[producto.id]=0;

});

crearProductos();

configurarExtras();

function crearProductos(){

listaProductos.innerHTML="";
contenidoExtras.innerHTML="";

let categoria="";

productos.forEach(producto=>{

const destino=

producto.categoria==="Oculto"

?contenidoExtras

:listaProductos;

if(producto.categoria!==categoria && producto.categoria!=="Oculto"){

categoria=producto.categoria;

destino.innerHTML+=`

<h3 class="categoria">

${producto.categoria}

</h3>

`;

}

destino.innerHTML+=`

<div class="producto-card" id="card-${producto.id}">

<div class="producto-info">

<div>

<h4>${producto.nombre}</h4>

<p>$${producto.precio}</p>

</div>

</div>

<div class="cantidad">

<button
class="menos"
data-id="${producto.id}">

<i class="fa-solid fa-minus"></i>

</button>

<span id="cantidad-${producto.id}">

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

<strong id="subtotal-${producto.id}">

$0.00

</strong>

</div>

</div>

`;

});

}

document.addEventListener("click",(e)=>{

const mas=e.target.closest(".mas");

const menos=e.target.closest(".menos");

if(mas){

const id=mas.dataset.id;

cantidades[id]++;

actualizar(id);

}

if(menos){

const id=menos.dataset.id;

if(cantidades[id]>0){

cantidades[id]--;

actualizar(id);

}

}

});

function actualizar(id){

const producto=productos.find(p=>p.id===id);

const cantidad=cantidades[id];

const subtotal=cantidad*producto.precio;

document.getElementById(`cantidad-${id}`).textContent=cantidad;

document.getElementById(`subtotal-${id}`).textContent="$"+subtotal.toFixed(2);

const card=document.getElementById(`card-${id}`);

if(cantidad>0){

card.classList.add("activo");

}else{

card.classList.remove("activo");

}

actualizarTotales();

}

function actualizarTotales(){

let total=0;

let cantidad=0;

productos.forEach(producto=>{

cantidad+=cantidades[producto.id];

total+=cantidades[producto.id]*producto.precio;

});

document.getElementById("contadorProductos").textContent=

cantidad+" productos nuevos";

document.getElementById("totalPedido").textContent=

"$"+total.toFixed(2);

}

function configurarExtras(){

contenidoExtras.style.display="none";

botonExtras.addEventListener("click",()=>{

const abierto=

contenidoExtras.style.display==="block";

if(abierto){

contenidoExtras.style.display="none";

botonExtras.innerHTML="▼ Extras";

}else{

contenidoExtras.style.display="block";

botonExtras.innerHTML="▲ Ocultar Extras";

}

});

}