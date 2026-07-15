import {

mesa,
cliente,
celular,
totalPedido,
contadorProductos

} from "./crearPedidoUI.js";

import {

reiniciarPersonas

} from "./personas.js";

export function limpiarPedido(){

    mesa.value="";

    cliente.value="";

    celular.value="";

    contadorProductos.textContent="0 productos";

    totalPedido.textContent="$0.00";

    reiniciarPersonas();

    document.dispatchEvent(

        new CustomEvent(

            "pedido-limpiado"

        )

    );

}