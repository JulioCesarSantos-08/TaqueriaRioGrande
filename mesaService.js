import { pedidoMesa } from "./mesaCarrito.js";
import { productosMesa } from "./productosMesa.js";

export function construirProductosMesa(){

    const lista = [];

    Object.entries(pedidoMesa).forEach(([id,cantidad])=>{

        if(cantidad===0){

            return;

        }

        const producto = productosMesa.find(

            p=>p.id===id

        );

        if(!producto){

            return;

        }

        lista.push({

            id: producto.id,

            nombre: producto.nombre,

            precio: producto.precio,

            cantidad: cantidad,

            subtotal: cantidad * producto.precio

        });

    });

    return lista;

}