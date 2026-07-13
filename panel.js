import { auth, db } from "./firebase.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const fotoUsuario=document.getElementById("fotoUsuario");

const nombreUsuario=document.getElementById("nombreUsuario");

const cerrarSesion=document.getElementById("cerrarSesion");

onAuthStateChanged(auth,async(usuario)=>{

if(!usuario){

window.location.href="login.html";

return;

}

try{

const referencia=doc(db,"usuarios",usuario.uid);

const documento=await getDoc(referencia);

if(documento.exists()){

const datos=documento.data();

nombreUsuario.textContent=datos.nombre;

if(datos.foto){

fotoUsuario.src=datos.foto;

}

}else{

nombreUsuario.textContent=usuario.displayName;

if(usuario.photoURL){

fotoUsuario.src=usuario.photoURL;

}

}

}catch(error){

console.error(error);

}

});

cerrarSesion.addEventListener("click",async()=>{

await signOut(auth);

window.location.href="login.html";

});