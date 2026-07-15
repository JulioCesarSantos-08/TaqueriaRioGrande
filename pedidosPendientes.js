import { db } from "./firebase.js";

import{
collection,
query,
where,
orderBy,
onSnapshot,
doc,
getDoc,
updateDoc
}from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const lista=document.getElementById("listaPedidos");
const totalPendientes=document.getElementById("totalPendientes");
const ventasPendientes=document.getElementById("ventasPendientes");

let pedidos=[];

const consulta=query(
collection(db,"pedidos"),
where("estado","==","cocinando"),
orderBy("folio","asc")
);

onSnapshot(consulta,(snapshot)=>{

pedidos=[];

snapshot.forEach(documento=>{

const pedido={

id:documento.id,

...documento.data()

};

if(

!Array.isArray(pedido.ordenesCocina)

){

return;

}

pedido.ordenesCocina.forEach(orden=>{

if(

orden.estado==="cocinando"

){

pedidos.push({

pedido,

orden

});

}

});

});

renderPedidos();

});

function renderPedidos(){

lista.innerHTML="";

if(pedidos.length===0){

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

const normales=[];
const agregados=[];

pedidos.forEach(item=>{

if(item.orden.tipo==="Agregado"){

agregados.push(item);

}else{

normales.push(item);

}

});

const visibles=normales.slice(0,2);

const mostrar=[

...visibles,
...agregados

];

mostrar.forEach(item=>{

lista.innerHTML+=crearTarjeta(

item.pedido,

item.orden

);

});

const ocultos=Math.max(0,normales.length-2);

totalPendientes.textContent=pedidos.length;
ventasPendientes.textContent=ocultos+" en espera";

}

function crearTarjeta(

pedido,

orden

){

let html=`

<div class="pedido">

<div class="pedidoHeader">

<div>

<h2>

🍳 Orden ${orden.id}

</h2>

<p>

🍽 Mesa ${pedido.mesa}

</p>

<p>

🧾 Pedido ${pedido.folioTexto}

</p>

</div>

<div class="estadoCocinando">

🍳 ${orden.tipo==="Inicial" ? "Pedido Inicial" : "Agregado"}

</div>

</div>

`;

orden.personas.forEach((persona,index)=>{

html+=`

<div class="persona">

<h3>

👤 ${persona.nombre||`Persona ${index+1}`}

</h3>

`;

persona.productos.forEach(producto=>{

html+=`

<div class="producto">

<span>

${producto.nombre}

</span>

<strong>

x${producto.cantidad}

</strong>

</div>

`;

});

html+=`

<div class="personaTotal">

<span>Total</span>

<strong>

$${persona.total.toFixed(2)}

</strong>

</div>

</div>

`;

});

if(
Array.isArray(orden.productosMesa)
&&
orden.productosMesa.length
){

html+=`

<div class="persona">

<h3>

🍽 Productos para la Mesa

</h3>

`;

orden.productosMesa.forEach(producto=>{

html+=`

<div class="producto">

<span>

${producto.nombre}

</span>

<strong>

x${producto.cantidad}

</strong>

</div>

`;

});

html+=`

</div>

`;

}

html+=`

<div class="pedidoFooter">

<div>

💰

<strong>

$${orden.total.toFixed(2)}

</strong>

</div>

<div>

👨‍🍳

${pedido.mesero}

</div>

</div>

<div class="accionesPedido">

<button

class="btnEscuchar"

data-id="${pedido.id}"

>

🔊 Escuchar

</button>

<button

class="btnEntregado"

data-pedido="${pedido.id}"

data-orden="${orden.id}"

>

✅ Entregado

</button>

<button

class="btnEliminar"

data-id="${pedido.id}"

>

❌ Eliminar

</button>

</div>

</div>

`;

return html;

}
function leerPedido(id){

const item=pedidos.find(p=>p.pedido.id===id);

if(!item){

return;

}

const pedido=item.pedido;

const orden=item.orden;

if(!pedido){

return;

}

speechSynthesis.cancel();

let texto=`Pedido ${pedido.folioTexto}. `;

texto+=`Mesa ${pedido.mesa}. `;

orden.personas.forEach((persona,index)=>{

texto+=`${persona.nombre||`Persona ${index+1}`}. `;

persona.productos.forEach(producto=>{

texto+=`${producto.cantidad} ${producto.nombre}. `;

});

});

if(
Array.isArray(orden.productosMesa)
&&
orden.productosMesa.length
){

texto+="Productos para la mesa. ";

orden.productosMesa.forEach(producto=>{

texto+=`${producto.cantidad} ${producto.nombre}. `;

});

}

const voz=new SpeechSynthesisUtterance(texto);

voz.lang="es-MX";
voz.rate=.95;
voz.pitch=1;

speechSynthesis.speak(voz);

}

async function entregarPedido(pedidoId,ordenId){

try{

const referencia=doc(db,"pedidos",pedidoId);

const documento=await getDoc(referencia);

if(!documento.exists()){

return;

}

const pedido=documento.data();

const ordenes=[...pedido.ordenesCocina];

const indice=ordenes.findIndex(

orden=>orden.id===ordenId

);

if(indice===-1){

return;

}

ordenes[indice]={

...ordenes[indice],

estado:"entregado"

};

const quedanPendientes=

ordenes.some(

orden=>orden.estado==="cocinando"

);

const datosActualizar={

ordenesCocina:ordenes

};

if(!quedanPendientes){

datosActualizar.estado="entregado";

datosActualizar.entregado=true;

}

await updateDoc(

referencia,

datosActualizar

);

}catch(error){

console.error(error);

alert("No fue posible entregar la orden.");

}

}

async function cancelarPedido(id){

try{

await updateDoc(

doc(db,"pedidos",id),

{

estado:"cancelado"

}

);

}catch(error){

console.error(error);

alert("No fue posible cancelar el pedido.");

}

}

document.addEventListener(

"click",

async(e)=>{

const btnEscuchar=e.target.closest(".btnEscuchar");

if(btnEscuchar){

leerPedido(

btnEscuchar.dataset.id

);

return;

}

const btnEntregado=e.target.closest(".btnEntregado");

if(btnEntregado){

if(

confirm(

"¿Marcar pedido como entregado?"

)

){

await entregarPedido(

btnEntregado.dataset.pedido,

btnEntregado.dataset.orden

);

}

return;

}

const btnEliminar=e.target.closest(".btnEliminar");

if(btnEliminar){

if(

confirm(

"¿Cancelar este pedido?"

)

){

await cancelarPedido(

btnEliminar.dataset.id

);

}

return;

}

}

);