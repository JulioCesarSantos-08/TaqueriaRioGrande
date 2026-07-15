export function construirOrdenInicial(pedido){

return{

id:"ORD-1",

tipo:"Inicial",

estado:"cocinando",

fecha:pedido.fecha,

hora:pedido.hora,

usuario:pedido.mesero,

personas:structuredClone(pedido.personas),

productosMesa:structuredClone(pedido.productosMesa),

cantidadProductos:pedido.cantidadProductos,

total:pedido.total

};

}