import { productos } from "./productos.js";

import { personas } from "./personas.js";

function dibujarProductos(idPersona){

const contenedor=document.getElementById(

`productosPersona-${idPersona}`

);

if(!contenedor){

return;

}

contenedor.innerHTML="";

let categoriaActual="";

productos.forEach(producto=>{

if(producto.categoria==="Oculto"){

return;

}

if(categoriaActual!==producto.categoria){

categoriaActual=producto.categoria;

contenedor.innerHTML+=`

<h4 class="categoriaPersona">

${categoriaActual}

</h4>

`;

}

contenedor.innerHTML+=`

<div class="productoPersona">

<div>

<strong>

${producto.nombre}

</strong>

<p>

$${producto.precio}

</p>

</div>

<div class="cantidadPersona">

<button

class="menosPersona"

data-persona="${idPersona}"

data-producto="${producto.id}">

-

</button>

<span

id="cantidad-${idPersona}-${producto.id}">

0

</span>

<button

class="masPersona"

data-persona="${idPersona}"

data-producto="${producto.id}">

+

</button>

</div>

</div>

`;

});

}

document.addEventListener(

"persona-agregada",

(e)=>{

dibujarProductos(e.detail.id);

}

);