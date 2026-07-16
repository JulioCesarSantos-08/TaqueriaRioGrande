import { db } from "./firebase.js";

import{

collection,
query,
where,
orderBy,
onSnapshot

}

from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const ventasHoy=document.getElementById("ventasHoy");
const pedidosHoy=document.getElementById("pedidosHoy");
const ticketPromedio=document.getElementById("ticketPromedio");
const contenedor=document.getElementById("contenedorHistorial");
const ticketCompartir=document.getElementById("ticketCompartir");

const volver=document.getElementById("volver");

let pedidosGlobal=[];
let filtroActual="todos";

const modalDetalle=document.getElementById("modalDetalle");
let pedidoActual=null;
const contenidoDetalle=document.getElementById("contenidoDetalle");
const cerrarDetalle=document.getElementById("cerrarDetalle");

const consulta=query(

collection(db,"pedidos"),

where("pagado","==",true),

orderBy("fechaPagoServidor","desc")

);

onSnapshot(

consulta,

(snapshot)=>{

const pedidos=[];

snapshot.forEach(doc=>{

pedidos.push({

id:doc.id,

...doc.data()

});

});

pedidosGlobal=[...pedidos];

aplicarFiltros();

}

);

function renderizar(pedidos){

let html="";

let totalVentas=0;

pedidos.forEach(pedido=>{

totalVentas+=pedido.total||0;

html+=`

<div class="ventaCard">

<div class="ventaHeader">

<h2>🧾 Pedido ${pedido.folioTexto}</h2>

<span>$${(pedido.total||0).toFixed(2)}</span>

</div>

<div class="ventaGrid">

<div>

<strong>Cliente</strong>

<p>${pedido.cliente}</p>

</div>

<div>

<strong>Mesero</strong>

<p>${pedido.mesero}</p>

</div>

<div>

<strong>Mesa</strong>

<p>${pedido.mesa}</p>

</div>

<div>

<strong>Fecha</strong>

<p>${pedido.fechaPago}</p>

</div>

<div>

<strong>Hora</strong>

<p>${pedido.horaPago}</p>

</div>

<div>

<strong>Productos</strong>

<p>${pedido.cantidadProductos}</p>

</div>

</div>

<div class="ventaAcciones">

<button

class="btnDetalle"

data-id="${pedido.id}"

>

👁 Ver detalle

</button>

</div>

</div>

`;

});

contenedor.innerHTML=html;

ventasHoy.textContent=`$${totalVentas.toFixed(2)}`;

pedidosHoy.textContent=pedidos.length;

ticketPromedio.textContent=

pedidos.length

? `$${(totalVentas/pedidos.length).toFixed(2)}`

: "$0.00";

document
.querySelectorAll(".btnDetalle")
.forEach(boton=>{

boton.addEventListener(

"click",

()=>{

const pedido=pedidos.find(

p=>p.id===boton.dataset.id

);

pedidoActual=pedido;

let html=`

<div style="display:grid;
grid-template-columns:repeat(4,1fr);
gap:20px;
margin-bottom:25px;">

<div>
<b>Cliente</b><br>
${pedido.cliente}
</div>

<div>
<b>Mesero</b><br>
${pedido.mesero}
</div>

<div>
<b>Mesa</b><br>
${pedido.mesa}
</div>

<div>
<b>Total</b><br>
<span style="font-size:34px;
color:#0b9d35;
font-weight:bold;">
$${pedido.total.toFixed(2)}
</span>
</div>

</div>
`;

pedido.personas.forEach(persona=>{

html+=`

<div style="border:1px solid #ddd;
border-radius:14px;
padding:18px;
margin-bottom:20px;">

<h3 style="color:#8b1e14;">

👤 Persona ${persona.id}

</h3>

`;

persona.productos.forEach(producto=>{

html+=`

<div style="display:flex;
justify-content:space-between;
padding:8px 0;
border-bottom:1px dashed #ddd;">

<div>

${producto.nombre}

</div>

<div>

x${producto.cantidad}

</div>

<div>

$${producto.subtotal.toFixed(2)}

</div>

</div>

`;

});

const agregadosPersona=pedido.ordenesCocina
.filter(orden=>orden.tipo==="Agregado")
.flatMap(orden=>orden.personas)
.filter(p=>p.id===persona.id);

if(agregadosPersona.length){

html+=`

<div style="margin-top:18px;
padding:15px;
background:#fff8e8;
border-radius:12px;
border:2px dashed #f39c12;">

<h4 style="color:#f39c12;
margin-bottom:12px;">

➕ Productos Agregados

</h4>

`;

agregadosPersona.forEach(agregado=>{

agregado.productos.forEach(producto=>{

html+=`

<div style="display:flex;
justify-content:space-between;
padding:8px 0;
border-bottom:1px dashed #f5c77b;">

<div>

${producto.nombre}

</div>

<div>

x${producto.cantidad}

</div>

<div>

$${producto.subtotal.toFixed(2)}

</div>

</div>

`;

});

});

html+=`

</div>

`;

}

html+=`

<div style="margin-top:15px;
text-align:right;
font-size:20px;
font-weight:bold;
color:#8b1e14;">

Total Persona:

$${persona.total.toFixed(2)}

</div>

</div>

`;

});

contenidoDetalle.innerHTML=html;

document.querySelector(".btnCompartir")?.remove();

const botonCompartir=document.createElement("button");

botonCompartir.className="btnCompartir";

botonCompartir.innerHTML="📤 Compartir";

document.querySelector(".detalleHeader").appendChild(botonCompartir);

botonCompartir.addEventListener(

"click",

async()=>{

construirTicket(pedidoActual);

const canvas=await html2canvas(

ticketCompartir,

{

scale:2,

backgroundColor:"#ffffff"

}

);

const enlace=document.createElement("a");

const nombreArchivo=`Ticket-${pedidoActual.folioTexto}.png`;

enlace.download=nombreArchivo;

enlace.href=canvas.toDataURL("image/png");

enlace.click();

const mensaje=

`¡Gracias por visitar Taquería Río Grande! 🌮

Adjuntamos su ticket de consumo.

Pedido: ${pedidoActual.folioTexto}
Cliente: ${pedidoActual.cliente}
Total: $${pedidoActual.total.toFixed(2)}

Muchas gracias por su preferencia ❤️`;

const url=

`https://wa.me/?text=${encodeURIComponent(mensaje)}`;

setTimeout(()=>{

window.open(

url,

"_blank"

);

},800);

}

);

modalDetalle.classList.add("activo");

});

});

}

cerrarDetalle.addEventListener(

"click",

()=>{

modalDetalle.classList.remove("activo");

}

);

modalDetalle.addEventListener(

"click",

e=>{

if(e.target===modalDetalle){

modalDetalle.classList.remove("activo");

}

}

);

const buscador=document.getElementById("buscador");

buscador.addEventListener(

"input",

()=>{

const texto=buscador.value
.toLowerCase()
.trim();

const filtrados=pedidosGlobal.filter(pedido=>{

const cliente=(pedido.cliente||"")
.toLowerCase();

const mesero=(pedido.mesero||"")
.toLowerCase();

const mesa=String(pedido.mesa||"");

const folio=(pedido.folioTexto||"")
.toLowerCase();

return(

cliente.includes(texto)||

mesero.includes(texto)||

mesa.includes(texto)||

folio.includes(texto)

);

});

aplicarFiltros();

}

);

document
.querySelectorAll(".btnFiltro")
.forEach(boton=>{

boton.addEventListener(

"click",

()=>{

document
.querySelectorAll(".btnFiltro")
.forEach(btn=>btn.classList.remove("activo"));

boton.classList.add("activo");

filtroActual=boton.dataset.filtro;

aplicarFiltros();

}

);

});

function aplicarFiltros(){

const hoy=new Date();

let lista=[...pedidosGlobal];

if(filtroActual==="hoy"){

lista=lista.filter(pedido=>{

if(!pedido.fechaPagoServidor)return false;

const fecha=pedido.fechaPagoServidor.toDate();

return(

fecha.getDate()===hoy.getDate()&&
fecha.getMonth()===hoy.getMonth()&&
fecha.getFullYear()===hoy.getFullYear()

);

});

}

if(filtroActual==="semana"){

lista=lista.filter(pedido=>{

if(!pedido.fechaPagoServidor)return false;

const fecha=pedido.fechaPagoServidor.toDate();

const diferencia=(hoy-fecha)/(1000*60*60*24);

return diferencia<=7;

});

}

if(filtroActual==="mes"){

lista=lista.filter(pedido=>{

if(!pedido.fechaPagoServidor)return false;

const fecha=pedido.fechaPagoServidor.toDate();

return(

fecha.getMonth()===hoy.getMonth()&&
fecha.getFullYear()===hoy.getFullYear()

);

});

}

const texto=buscador.value
.toLowerCase()
.trim();

if(texto){

lista=lista.filter(pedido=>{

return(

(pedido.cliente||"")
.toLowerCase()
.includes(texto)

||

(pedido.mesero||"")
.toLowerCase()
.includes(texto)

||

String(pedido.mesa)
.includes(texto)

||

(pedido.folioTexto||"")
.toLowerCase()
.includes(texto)

);

});

}

renderizar(lista);

}

volver.addEventListener(

"click",

()=>{

window.location.href="panel.html";

}

);

function construirTicket(pedido){

let html=`

<div style="font-family:Poppins,sans-serif;
width:380px;
padding:25px;
background:white;
color:#222;">

<div style="text-align:center;">

<img
src="imagenes/logo1.png"
style="width:120px;margin-bottom:10px;">

<h2 style="margin:0;color:#8b1e14;">

Taquería Río Grande

</h2>

<p style="margin:8px 0;color:#666;">

¡Gracias por tu preferencia!

</p>

</div>

<hr>

<table style="width:100%;margin-top:15px;">

<tr>

<td><b>Cliente</b></td>

<td>${pedido.cliente}</td>

</tr>

<tr>

<td><b>Mesa</b></td>

<td>${pedido.mesa}</td>

</tr>

<tr>

<td><b>Mesero</b></td>

<td>${pedido.mesero}</td>

</tr>

<tr>

<td><b>Fecha</b></td>

<td>${pedido.fechaPago}</td>

</tr>

<tr>

<td><b>Hora</b></td>

<td>${pedido.horaPago}</td>

</tr>

</table>

<hr>

`;
pedido.personas.forEach(persona=>{

html+=`

<h3 style="
margin-top:25px;
color:#8b1e14;
border-bottom:2px solid #eee;
padding-bottom:8px;
">

👤 Persona ${persona.id}

</h3>

`;

persona.productos.forEach(producto=>{

html+=`

<div style="
display:flex;
justify-content:space-between;
padding:8px 0;
border-bottom:1px dashed #ddd;
">

<div>

${producto.nombre}

</div>

<div>

x${producto.cantidad}

</div>

<div>

$${producto.subtotal.toFixed(2)}

</div>

</div>

`;

});

const agregados=pedido.ordenesCocina
.filter(orden=>orden.tipo==="Agregado")
.flatMap(orden=>orden.personas)
.filter(p=>p.id===persona.id);

if(agregados.length){

html+=`

<div style="
margin-top:15px;
padding:12px;
background:#fff8e8;
border:2px dashed #f39c12;
border-radius:10px;
">

<b style="color:#f39c12;">

➕ Productos Agregados

</b>

`;

agregados.forEach(agregado=>{

agregado.productos.forEach(producto=>{

html+=`

<div style="
display:flex;
justify-content:space-between;
padding:6px 0;
">

<div>

${producto.nombre}

</div>

<div>

x${producto.cantidad}

</div>

<div>

$${producto.subtotal.toFixed(2)}

</div>

</div>

`;

});

});

html+=`

</div>

`;

}

html+=`

<div style="
text-align:right;
font-size:18px;
font-weight:bold;
margin-top:12px;
color:#8b1e14;
">

Total Persona:

$${persona.total.toFixed(2)}

</div>

`;

});
html+=`

<hr style="margin:25px 0;">

<h2 style="
text-align:right;
color:#0b9d35;
font-size:30px;
margin:0;
">

TOTAL

$${pedido.total.toFixed(2)}

</h2>

<div style="
margin-top:35px;
text-align:center;
font-size:16px;
color:#666;
">

❤️ Gracias por su visita ❤️

<br><br>

Esperamos verlo muy pronto nuevamente.

<br><br>

Taquería Río Grande

</div>

</div>

`;

ticketCompartir.innerHTML=html;

}