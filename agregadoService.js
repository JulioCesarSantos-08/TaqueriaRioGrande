export function construirAgregado({

personaId,

productos,

usuario

}){

let total=0;

let cantidadProductos=0;

const listaProductos=[];

productos.forEach(producto=>{

const subtotal=

producto.cantidad*

producto.precio;

cantidadProductos+=

producto.cantidad;

total+=subtotal;

listaProductos.push({

id:producto.id,

nombre:producto.nombre,

precio:producto.precio,

cantidad:producto.cantidad,

subtotal

});

});

return{

id:crypto.randomUUID(),

estado:"cocinando",

personaId,

productos:listaProductos,

cantidadProductos,

total,

usuario,

fecha:new Date().toLocaleDateString("es-MX"),

hora:new Date().toLocaleTimeString("es-MX",{

hour:"2-digit",

minute:"2-digit"

})

};

}