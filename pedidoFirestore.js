import {

db

} from "./firebase.js";

import {

collection,
doc,
getDocs,
orderBy,
limit,
query,
setDoc,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function guardarPedido(pedido){

    const consulta = query(

        collection(db,"pedidos"),

        orderBy("folio","desc"),

        limit(1)

    );

    const resultado = await getDocs(consulta);

    let siguienteFolio = 1;

    if(!resultado.empty){

        siguienteFolio =

        resultado.docs[0].data().folio + 1;

    }

    pedido.folio = siguienteFolio;

    pedido.folioTexto =

    String(siguienteFolio)

    .padStart(6,"0");

    pedido.fechaServidor =

    serverTimestamp();

    await setDoc(

        doc(

            db,

            "pedidos",

            pedido.folioTexto

        ),

        pedido

    );

    return pedido;

}