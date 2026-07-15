import { productosMesa } from "./productosMesa.js";

export const pedidoMesa = {};

productosMesa.forEach(producto=>{

    pedidoMesa[producto.id]=0;

});

document.addEventListener("click",(e)=>{

    const mas=e.target.closest(".masMesa");
    const menos=e.target.closest(".menosMesa");

    if(mas){

        const id=mas.dataset.id;

        pedidoMesa[id]++;

        actualizar(id);

    }

    if(menos){

        const id=menos.dataset.id;

        if(pedidoMesa[id]>0){

            pedidoMesa[id]--;

        }

        actualizar(id);

    }

});

function actualizar(id){

    const cantidad=document.getElementById(

        `cantidadMesa-${id}`

    );

    if(cantidad){

        cantidad.textContent=pedidoMesa[id];

    }

    document.dispatchEvent(

        new Event("mesa-actualizada")

    );

}