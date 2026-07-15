import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export const fechaActual=document.getElementById("fechaActual");
export const horaActual=document.getElementById("horaActual");
export const nombreMesero=document.getElementById("nombreMesero");

export const mesa=document.getElementById("mesa");
export const cliente=document.getElementById("cliente");
export const celular=document.getElementById("celular");

export const listaProductos=document.getElementById("listaProductos");
export const contenidoExtras=document.getElementById("contenidoExtras");

export const totalPedido=document.getElementById("totalPedido");
export const contadorProductos=document.getElementById("contadorProductos");

export const botonExtras=document.getElementById("mostrarExtras");
export const botonLimpiar=document.getElementById("limpiarPedido");
export const botonCrear=document.getElementById("crearPedido");

export const listaPersonas=document.getElementById("listaPersonas");
export const botonAgregarPersona=document.getElementById("agregarPersona");

export let usuarioActual=null;

export let nombreUsuario="";

onAuthStateChanged(auth,async(usuario)=>{

if(!usuario){

window.location.href="login.html";

return;

}

usuarioActual=usuario;

try{

const referencia=doc(db,"usuarios",usuario.uid);

const documento=await getDoc(referencia);

if(documento.exists()){

nombreUsuario=documento.data().nombre;

}else{

nombreUsuario=usuario.displayName||"Mesero";

}

}catch(error){

console.error(error);

nombreUsuario="Mesero";

}

nombreMesero.textContent=nombreUsuario;

actualizarFechaHora();

setInterval(actualizarFechaHora,1000);

document.dispatchEvent(new Event("pedido-listo"));

});

function actualizarFechaHora(){

const ahora=new Date();

fechaActual.textContent=ahora.toLocaleDateString("es-MX",{

day:"numeric",

month:"long",

year:"numeric"

});

horaActual.textContent=ahora.toLocaleTimeString("es-MX",{

hour:"2-digit",

minute:"2-digit"

});

}