import { db } from "./firebase.js";

import {
doc,
updateDoc

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function guardarAgregado(

pedido,

personaId,

productosAgregar

){

console.log("Pedido");

console.log(pedido);

console.log("Persona");

console.log(personaId);

console.log("Productos");

console.log(productosAgregar);

const persona = pedido.personas.find(

p=>p.id===personaId

);

console.log("Persona encontrada");

console.log(persona);

productosAgregar.forEach(productoNuevo=>{

const productoExistente=

persona.productos.find(

p=>p.id===productoNuevo.id

);

console.log("Producto nuevo");

console.log(productoNuevo);

console.log("Producto existente");

console.log(productoExistente);

if(productoExistente){

productoExistente.cantidad+=

productoNuevo.cantidad;

productoExistente.subtotal=

productoExistente.cantidad*

productoExistente.precio;

}else{

persona.productos.push({

...productoNuevo

});

}

});

console.log("Persona actualizada");

console.log(persona);

persona.cantidadProductos=

persona.productos.reduce(

(total,producto)=>total+producto.cantidad,

0

);

persona.total=

persona.productos.reduce(

(total,producto)=>total+producto.subtotal,

0

);

console.log("Persona recalculada");

console.log(persona);

pedido.cantidadProductos=

pedido.personas.reduce(

(total,persona)=>total+persona.cantidadProductos,

0

);

pedido.total=

pedido.personas.reduce(

(total,persona)=>total+persona.total,

0

);

console.log("Pedido actualizado");

console.log(pedido);

const nuevaOrden={

id:`ORD-${(pedido.ordenesCocina?.length||0)+1}`,

tipo:"Agregado",

estado:"cocinando",

fecha:pedido.fecha,

hora:pedido.hora,

cantidadProductos:

productosAgregar.reduce(

(total,p)=>total+p.cantidad,

0

),

total:
productosAgregar.reduce(
    (total,p)=>total+p.subtotal,
    0
),

personas:[

{

id:persona.id,

nombre:persona.nombre,

productos:productosAgregar,

cantidadProductos:

productosAgregar.reduce(

(total,p)=>total+p.cantidad,

0

),

total:

productosAgregar.reduce(

(total,p)=>total+p.subtotal,

0

)

}

]

};

console.log("Nueva Orden");

console.log(nuevaOrden);

if(!pedido.ordenesCocina){

pedido.ordenesCocina=[];

}

pedido.ordenesCocina.push(

nuevaOrden

);

console.log("Ordenes Cocina");

console.log(pedido.ordenesCocina);

const pedidoRef = doc(

db,

"pedidos",

pedido.id

);

console.log("Pedido final a guardar");

console.log(pedido);

await updateDoc(

pedidoRef,

{

personas:pedido.personas,

cantidadProductos:pedido.cantidadProductos,

total:pedido.total,

ordenesCocina:pedido.ordenesCocina,

estado:"cocinando",

entregado:false,

esAgregado:true

}

);

console.log("Pedido actualizado en Firestore");

}