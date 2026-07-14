import { db } from "./firebase.js";

import {

doc,
getDoc

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export let pedidoActual=null;

const parametros=new URLSearchParams(window.location.search);

const idPedido=parametros.get("id");

const folio=document.getElementById("folioPedido");

const mesa=document.getElementById("mesaPedido");

const cliente=document.getElementById("clientePedido");

const mesero=document.getElementById("meseroPedido");

async function cargarPedido(){

if(!idPedido){

alert("No se recibió ningún pedido.");

window.location.href="pedidosPendientes.html";

return;

}

const referencia=doc(db,"pedidos",idPedido);

const documento=await getDoc(referencia);

if(!documento.exists()){

alert("El pedido no existe.");

window.location.href="pedidosPendientes.html";

return;

}

pedidoActual=documento.data();

folio.textContent="#"+pedidoActual.folioTexto;

mesa.textContent=pedidoActual.mesa;

cliente.textContent=pedidoActual.cliente||"Sin nombre";

mesero.textContent=pedidoActual.mesero;

document.dispatchEvent(

new Event("pedido-cargado")

);

}

cargarPedido();