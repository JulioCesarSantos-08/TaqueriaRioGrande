import { personas } from "./personas.js";

export function actualizarPedidoPersona(idPersona){

    const persona = personas.find(

        p => p.id === idPersona

    );

    if(!persona){

        return;

    }

    const contenedor = document.getElementById(

        `pedidoPersona-${idPersona}`

    );

    if(!contenedor){

        return;

    }

    const lista = Object.values(persona.productos);

    if(lista.length===0){

        contenedor.innerHTML=`

        <span class="sinProductos">

        Sin productos

        </span>

        `;

        return;

    }

    contenedor.innerHTML="";

    lista.forEach(producto=>{

        contenedor.innerHTML+=`

        <div class="pedidoItem">

            <span>

                ${producto.nombre}

            </span>

            <strong>

                x${producto.cantidad}

            </strong>

        </div>

        `;

    });

}