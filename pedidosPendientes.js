import { db } from "./firebase.js";

import {

collection,
query,
where,
orderBy,
onSnapshot,
doc,
updateDoc

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const lista=document.getElementById("listaPedidos");

const totalPendientes=document.getElementById("totalPendientes");

const ventasPendientes=document.getElementById("ventasPendientes");

const consulta=query(

collection(db,"pedidos"),

where("estado","==","pendiente"),

orderBy("folio","asc")

);

onSnapshot(consulta,(snapshot)=>{

lista.innerHTML="";

let cantidad=0;

let venta=0;

if(snapshot.empty){

lista.innerHTML=`

<div class="sinPedidos">

<i class="fa-solid fa-burger"></i>

<h2>

No hay pedidos pendientes

</h2>

<p>

Los nuevos pedidos aparecerán aquí automáticamente.

</p>

</div>

`;

totalPendientes.textContent="0";

ventasPendientes.textContent="$0.00";

return;

}

snapshot.forEach(documento=>{

const pedido=documento.data();

cantidad++;

venta+=pedido.total;

crearTarjeta(documento.id,pedido);

});

totalPendientes.textContent=cantidad;

ventasPendientes.textContent="$"+venta.toFixed(2);

});

function crearTarjeta(id,pedido){

let htmlProductos="";

Object.values(pedido.productos).forEach(producto=>{

htmlProductos+=`

<div class="item">

<span>

${producto.nombre}

</span>

<strong>

x${producto.cantidad}

</strong>

</div>

`;

});

lista.innerHTML+=`

<div class="pedido">

<div class="encabezado">

<h2>

🍽 Mesa ${pedido.mesa}

</h2>

<span class="estado">

Pendiente

</span>

</div>

<div class="info">

<div>

<strong>

Pedido

</strong>

#${pedido.folioTexto}

</div>

<div>

<strong>

Mesero

</strong>

${pedido.mesero}

</div>

<div>

<strong>

Cliente

</strong>

${pedido.cliente||"Sin nombre"}

</div>

<div>

<strong>

Celular

</strong>

${pedido.celular||"No registrado"}

</div>

</div>

<div class="productos">

${htmlProductos}

</div>

<div class="total">

<span>

Total

</span>

<strong>

$${pedido.total.toFixed(2)}

</strong>

</div>

<div class="botones">

<button

class="btnVoz"

onclick="leerPedido('${id}')">

🔊 Escuchar

</button>

<button

class="btnAgregar"

onclick="agregarPedido('${id}')">

➕ Agregar

</button>

<button

class="btnEntregado"

onclick="entregarPedido('${id}')">

✅ Entregado

</button>

</div>

</div>

`;

}

window.entregarPedido=async(id)=>{

await updateDoc(

doc(db,"pedidos",id),

{

estado:"entregado",

entregado:true

}

);

};

window.leerPedido=(id)=>{

const tarjeta=[...document.querySelectorAll(".pedido")]

.find(t=>t.innerHTML.includes(id));

const texto=tarjeta.innerText;

speechSynthesis.cancel();

speechSynthesis.speak(

new SpeechSynthesisUtterance(texto)

);

};

window.agregarPedido=(id)=>{

window.location.href=`agregarProductos.html?id=${id}`;

};