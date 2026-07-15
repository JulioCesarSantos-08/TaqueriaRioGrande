import { db } from "./firebase.js";

import {

doc,
getDoc,
updateDoc

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function guardarAgregado(

folioTexto,

agregado

){

const referencia=

doc(

db,

"pedidos",

folioTexto

);

const documento=

await getDoc(referencia);

if(!documento.exists()){

throw new Error(

"El pedido no existe."

);

}

const pedido=

documento.data();

const agregados=

Array.isArray(

pedido.agregados

)

?

pedido.agregados

:

[];

agregados.push(

agregado

);

await updateDoc(

referencia,

{

agregados

}

);

return agregado;

}