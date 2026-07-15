import {
productos
} from "./productos.js";

import {
cantidades
} from "./crearPedidoProductos.js";

import {

contenidoExtras,
botonExtras,
botonLimpiar,
botonCrear,
mesa,
cliente,
celular,
nombreUsuario

} from "./crearPedidoUI.js";

document.addEventListener("pedido-listo",()=>{

configurarExtras();

configurarLimpiar();

});

function configurarExtras(){

contenidoExtras.style.display="none";

botonExtras.addEventListener("click",()=>{

const abierto=contenidoExtras.style.display==="block";

if(abierto){

contenidoExtras.style.display="none";

botonExtras.innerHTML="▼ Extras";

}else{

contenidoExtras.style.display="block";

botonExtras.innerHTML="▲ Ocultar Extras";

}

});

}

function configurarLimpiar(){

botonLimpiar.addEventListener("click",()=>{

const confirmar=confirm("¿Deseas limpiar el pedido completo?");

if(!confirmar){

return;

}

productos.forEach(producto=>{

cantidades[producto.id]=0;

const cantidad=document.getElementById(`cantidad-${producto.id}`);

const subtotal=document.getElementById(`subtotal-${producto.id}`);

const tarjeta=document.getElementById(`card-${producto.id}`);

if(cantidad){

cantidad.textContent="0";

}

if(subtotal){

subtotal.textContent="$0.00";

}

if(tarjeta){

tarjeta.classList.remove("activo");

}

});

mesa.value="";

cliente.value="";

celular.value="";

contenidoExtras.style.display="none";

botonExtras.innerHTML="▼ Extras";

document.dispatchEvent(new Event("pedido-actualizado"));

});

}