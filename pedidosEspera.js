import { db } from "./firebase.js";
import { productos } from "./productos.js";
import { guardarAgregado } from "./pedidoAgregarService.js";

import {
collection,
query,
where,
orderBy,
onSnapshot,
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const listaPedidos=document.getElementById("listaPedidos");
const totalPedidos=document.getElementById("totalPedidos");
const totalVenta=document.getElementById("totalVenta");

const modalAgregar=document.getElementById("modalAgregar");

const cerrarAgregar=document.getElementById("cerrarAgregar");

const cancelarAgregar=document.getElementById("cancelarAgregar");

const modalFolio=document.getElementById("modalFolio");

const modalMesa=document.getElementById("modalMesa");

const personaAgregar=document.getElementById("personaAgregar");

const listaProductosAgregar=document.getElementById("listaProductosAgregar");

const guardarAgregar=document.getElementById("guardarAgregar");

let pedidos=[];
let carritoAgregar={};
let pedidoSeleccionado=null;

const consulta=query(
collection(db,"pedidos"),
where("estado","==","entregado"),
orderBy("folio","asc")
);

onSnapshot(consulta,(snapshot)=>{

pedidos=[];

snapshot.forEach(documento=>{

pedidos.push({

id:documento.id,
...documento.data()

});

});

render();

});

function render(){

listaPedidos.innerHTML="";

if(pedidos.length===0){

listaPedidos.innerHTML=`

<div class="sinPedidos">

<i class="fa-solid fa-money-bill-wave"></i>

<h2>

No hay pedidos esperando pago

</h2>

<p>

Aquí aparecerán automáticamente los pedidos entregados.

</p>

</div>

`;

totalPedidos.textContent="0";
totalVenta.textContent="$0.00";

return;

}

let venta=0;

pedidos.forEach(pedido=>{

venta+=pedido.total;

listaPedidos.innerHTML+=crearTarjeta(pedido);

});

totalPedidos.textContent=pedidos.length;

totalVenta.textContent="$"+venta.toFixed(2);

}

function crearTarjeta(pedido){

return`

<div class="pedido">

<div class="pedidoHeader">

<div>

<h2>

🧾 Pedido ${pedido.folioTexto}

</h2>

<p>

🍽 Mesa ${pedido.mesa}

</p>

</div>

<div class="estado">

Esperando Pago

</div>

</div>

<div class="info">

<div class="infoItem">

<span>

Cliente

</span>

<strong>

${pedido.cliente||"Sin nombre"}

</strong>

</div>

<div class="infoItem">

<span>

Mesero

</span>

<strong>

${pedido.mesero}

</strong>

</div>

<div class="infoItem">

<span>

Personas

</span>

<strong>

${pedido.personas.length}

</strong>

</div>

<div class="infoItem">

<span>

Productos

</span>

<strong>

${pedido.cantidadProductos}

</strong>

</div>

<div class="infoItem">

<span>

Total

</span>

<strong>

$${pedido.total.toFixed(2)}

</strong>

</div>

<div class="infoItem">

<span>

Folio

</span>

<strong>

${pedido.folioTexto}

</strong>

</div>

</div>

<div class="acciones">

<button
class="btnAgregar"
data-id="${pedido.id}"
>

<i class="fa-solid fa-plus"></i>

Agregar

</button>

<button
class="btnPagado"
data-id="${pedido.id}"
>

<i class="fa-solid fa-dollar-sign"></i>

Pagado

</button>

</div>

</div>

`;

}

async function marcarAgregado(id){

try{

await updateDoc(

doc(db,"pedidos",id),

{

estado:"cocinando",

esAgregado:true,

entregado:false

}

);

}catch(error){

console.error(error);

alert("No fue posible regresar el pedido a cocina.");

}

}

async function marcarPagado(id){

try{

await updateDoc(

doc(db,"pedidos",id),

{

estado:"pagado",

pagado:true

}

);

}catch(error){

console.error(error);

alert("No fue posible marcar el pedido como pagado.");

}

}

document.addEventListener("click",async(e)=>{

const btnAgregar=e.target.closest(".btnAgregar");

if(btnAgregar){

const pedido=

pedidos.find(

p=>p.id===btnAgregar.dataset.id

);

if(pedido){

abrirModal(pedido);

}

return;

}

const btnMas=e.target.closest(".btnMas");

if(btnMas){

cambiarCantidad(

btnMas.dataset.id,

1

);

return;

}

const btnMenos=e.target.closest(".btnMenos");

if(btnMenos){

cambiarCantidad(

btnMenos.dataset.id,

-1

);

return;

}

const btnPagado=e.target.closest(".btnPagado");

if(btnPagado){

if(confirm("¿Marcar este pedido como pagado?")){

await marcarPagado(

btnPagado.dataset.id

);

}

return;

}

});

function abrirModal(pedido){
    carritoAgregar={};
    pedidoSeleccionado=pedido;

modalFolio.textContent=pedido.folioTexto;

modalMesa.textContent=pedido.mesa;

personaAgregar.innerHTML="";

personaAgregar.innerHTML="";

pedido.personas.forEach((persona,indice)=>{

    const opcion=document.createElement("option");

    opcion.value=persona.id;

    opcion.textContent=persona.nombre || `Persona ${indice+1}`;

    personaAgregar.appendChild(opcion);

});

dibujarProductos();

modalAgregar.classList.remove("oculto");

}

function actualizarCantidad(id){

const contador=document.getElementById(`cantidad-${id}`);

contador.textContent=carritoAgregar[id]||0;

}

function cambiarCantidad(id,cambio){

if(!carritoAgregar[id]){

carritoAgregar[id]=0;

}

carritoAgregar[id]+=cambio;

if(carritoAgregar[id]<0){

carritoAgregar[id]=0;

}

actualizarCantidad(id);

}

function obtenerProductosAgregados(){

return productos

.filter(producto=>(carritoAgregar[producto.id]||0)>0)

.map(producto=>({

id:producto.id,

nombre:producto.nombre,

precio:producto.precio,

cantidad:carritoAgregar[producto.id],

subtotal:producto.precio*carritoAgregar[producto.id]

}));

}

function cerrarModal(){

modalAgregar.classList.add("oculto");

}

function dibujarProductos(){

listaProductosAgregar.innerHTML="";

productos
.filter(producto=>producto.categoria!=="Oculto")
.forEach(producto=>{

listaProductosAgregar.innerHTML+=`

<div class="productoAgregar">

<h4>

${producto.nombre}

</h4>

<p>

$${producto.precio}

</p>

<div class="controlesProducto">

<button
class="btnMenos"
data-id="${producto.id}"
>

−

</button>

<span
id="cantidad-${producto.id}"
>

0

</span>

<button
class="btnMas"
data-id="${producto.id}"
>

+

</button>

</div>

</div>

`;

});

}

cerrarAgregar.addEventListener(

"click",

cerrarModal

);

cancelarAgregar.addEventListener(

"click",

cerrarModal

);

guardarAgregar.addEventListener(

"click",

async()=>{

const productosAgregar=

obtenerProductosAgregados();

await guardarAgregado(

pedidoSeleccionado,

Number(personaAgregar.value),

productosAgregar

);

}
);