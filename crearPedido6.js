import { db } from "./firebase.js";

import {
collection,
doc,
runTransaction,
serverTimestamp,
setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document.addEventListener("pedido-creado",async(e)=>{

const pedido=e.detail;

try{

const contadorRef=doc(db,"configuracion","folios");

let folio=0;

await runTransaction(db,async(transaction)=>{

const contador=await transaction.get(contadorRef);

if(!contador.exists()){

folio=1;

transaction.set(contadorRef,{
ultimo:1
});

}else{

folio=contador.data().ultimo+1;

transaction.update(contadorRef,{
ultimo:folio
});

}

});

pedido.folio=folio;

pedido.folioTexto=String(folio).padStart(6,"0");

pedido.version=1;

pedido.estado="pendiente";

pedido.entregado=false;

pedido.pagado=false;

pedido.fechaServidor=serverTimestamp();

pedido.movimientos=[

{

tipo:"Creación",

usuario:pedido.mesero,

fecha:pedido.fecha,

hora:pedido.hora

}

];

const pedidoRef=doc(db,"pedidos",pedido.folioTexto);

await setDoc(pedidoRef,pedido);

console.log("Pedido guardado");

console.log(pedido);

document.dispatchEvent(new Event("pedido-guardado"));

}catch(error){

console.error(error);

alert("Error al guardar el pedido.");

}

});