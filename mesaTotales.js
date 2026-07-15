import { pedidoMesa } from "./mesaCarrito.js";
import { productosMesa } from "./productosMesa.js";

document.addEventListener(

    "mesa-actualizada",

    calcularMesa

);

export function calcularMesa(){

    let totalMesa = 0;

    let cantidadMesa = 0;

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

        cantidadMesa += cantidad;

        totalMesa +=

            cantidad * producto.precio;

    });

    document.dispatchEvent(

        new CustomEvent(

            "mesa-total-actualizado",

            {

                detail:{

                    cantidad:cantidadMesa,

                    total:totalMesa

                }

            }

        )

    );

}