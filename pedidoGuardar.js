import { botonCrear } from "./crearPedidoUI.js";

import { construirPedido } from "./pedidoService.js";

import { guardarPedido } from "./pedidoFirestore.js";

import { limpiarPedido } from "./pedidoLimpiar.js";

document.addEventListener("pedido-listo",()=>{

    botonCrear.addEventListener("click",async()=>{

        botonCrear.disabled=true;

        try{

            const pedido = construirPedido();

            const pedidoGuardado =

            await guardarPedido(pedido);

            console.clear();

            console.log("================================");

            console.log("PEDIDO GUARDADO CORRECTAMENTE");

            console.log("================================");

            console.log(pedidoGuardado);

            limpiarPedido();

            alert(

                `✅ Pedido ${pedidoGuardado.folioTexto} guardado correctamente.`

            );

        }catch(error){

            console.error(error);

            alert(

                "❌ Ocurrió un error al guardar el pedido."

            );

        }finally{

            botonCrear.disabled=false;

        }

    });

});