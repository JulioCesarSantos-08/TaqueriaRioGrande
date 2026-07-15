import { personas } from "./personas.js";
import { construirProductosMesa } from "./mesaService.js";
import { construirOrdenInicial } from "./ordenCocinaService.js";

import {

mesa,
cliente,
celular,
nombreUsuario

} from "./crearPedidoUI.js";

export function construirPedido(){

    let totalMesa = 0;

    let cantidadMesa = 0;

    const personasPedido = [];

    personas.forEach(persona=>{

        if(persona.cantidadProductos===0){

            return;

        }

        const productosPersona = Object.values(persona.productos).map(producto=>({

            id: producto.id,

            nombre: producto.nombre,

            precio: producto.precio,

            cantidad: producto.cantidad,

            subtotal: producto.cantidad * producto.precio

        }));

        personasPedido.push({

            id: persona.id,

            nombre: persona.nombre,

            productos: productosPersona,

            cantidadProductos: persona.cantidadProductos,

            total: persona.total

        });

        cantidadMesa += persona.cantidadProductos;

        totalMesa += persona.total;

    });

    const productosMesa = construirProductosMesa();

    let totalProductosMesa = 0;

    let cantidadProductosMesa = 0;

    productosMesa.forEach(producto=>{

        totalProductosMesa += producto.subtotal;

        cantidadProductosMesa += producto.cantidad;

    });

  const pedido={

    mesa:Number(mesa.value),

    cliente:cliente.value.trim(),

    celular:celular.value.trim(),

    mesero:nombreUsuario,

    fecha:new Date().toLocaleDateString("es-MX"),

    hora:new Date().toLocaleTimeString("es-MX",{

        hour:"2-digit",

        minute:"2-digit"

    }),

    estado:"cocinando",

    entregado:false,

    pagado:false,

    esAgregado:false,

    version:2,

    personas:personasPedido,

    productosMesa,

    cantidadProductos:
    cantidadMesa + cantidadProductosMesa,

    total:
    totalMesa + totalProductosMesa,

    creado:Date.now()

};

pedido.ordenesCocina=[

construirOrdenInicial(pedido)

];

return pedido;

}