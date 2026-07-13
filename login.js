import {
auth,
provider,
db
} from "./firebase.js";

import {
signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
doc,
getDoc,
setDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const googleLogin=document.getElementById("googleLogin");

const modal=document.getElementById("modalNombre");

const nombreInput=document.getElementById("nombreInput");

const guardarNombre=document.getElementById("guardarNombre");

let usuarioTemporal=null;

googleLogin.addEventListener("click",async()=>{

try{

const resultado=await signInWithPopup(auth,provider);

const usuario=resultado.user;

const referencia=doc(db,"usuarios",usuario.uid);

const documento=await getDoc(referencia);

if(documento.exists()){

window.location.href="panel.html";

return;

}

usuarioTemporal=usuario;

modal.classList.add("active");

nombreInput.focus();

}catch(error){

console.error(error);

alert(error.message);

}

});

guardarNombre.addEventListener("click",async()=>{

const nombre=nombreInput.value.trim();

if(nombre===""){

nombreInput.focus();

return;

}

try{

const referencia=doc(db,"usuarios",usuarioTemporal.uid);

await setDoc(referencia,{

uid:usuarioTemporal.uid,

nombre:nombre,

email:usuarioTemporal.email,

foto:usuarioTemporal.photoURL,

fechaRegistro:serverTimestamp()

});

window.location.href="panel.html";

}catch(error){

console.error(error);

alert(error.message);

}

});

nombreInput.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

guardarNombre.click();

}

});