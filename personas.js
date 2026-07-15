import {

listaPersonas,
botonAgregarPersona

} from "./crearPedidoUI.js";

export const personas = [];

let contador = 0;

document.addEventListener("pedido-listo",()=>{

    agregarPersona();

    botonAgregarPersona.addEventListener(

        "click",

        agregarPersona

    );

});

export function agregarPersona(){

    contador++;

    const persona={

        id:contador,

        nombre:"",

        productos:{},

        cantidadProductos:0,

        total:0

    };

    personas.push(persona);

    listaPersonas.innerHTML+=`

    <div class="persona-card">

        <div class="persona-header">

            <h3>

                <i class="fa-solid fa-user"></i>

                Persona ${contador}

            </h3>

        </div>

        <label>

            Nombre (Opcional)

        </label>

        <input

            class="inputPersona"

            placeholder="Ejemplo: Niño, Mamá, Papá..."

            data-persona="${contador}"

        >

        <button

            type="button"

            class="eliminarPersona"

            data-persona="${contador}">

            <i class="fa-solid fa-trash"></i>

            Eliminar Persona

        </button>

        <h4 class="tituloPedidoPersona">

            Pedido

        </h4>

        <div

            id="pedidoPersona-${contador}"

            class="pedidoPersona">

            <span class="sinProductos">

                Sin productos

            </span>

        </div>

        <hr class="separadorPersona">

        <h4 class="tituloProductosPersona">

            Productos disponibles

        </h4>

        <div

            id="productosPersona-${contador}"

            class="productosPersona">

        </div>

        <div class="totalPersona">

            <div>

                Productos

            </div>

            <strong id="cantidadPersona-${contador}">

                0

            </strong>

            <div>

                Total

            </div>

            <strong id="totalPersona-${contador}">

                $0.00

            </strong>

        </div>

    </div>

    `;

    document.dispatchEvent(

        new CustomEvent(

            "persona-agregada",

            {

                detail:persona

            }

        )

    );

}

export function reiniciarPersonas(){

    personas.length=0;

    contador=0;

    listaPersonas.innerHTML="";

    agregarPersona();

}

document.addEventListener("click",(e)=>{

    const boton=e.target.closest(".eliminarPersona");

    if(!boton){

        return;

    }

    if(!confirm("¿Eliminar esta persona del pedido?")){

        return;

    }

    const tarjeta=boton.closest(".persona-card");

    if(!tarjeta){

        return;

    }

    const id=Number(

        boton.dataset.persona

    );

    const indice=personas.findIndex(

        persona=>persona.id===id

    );

    if(indice!==-1){

        personas.splice(indice,1);

    }

    tarjeta.remove();

    renumerarPersonas();

});

function renumerarPersonas(){

    const tarjetas=document.querySelectorAll(

        ".persona-card"

    );

    tarjetas.forEach((tarjeta,indice)=>{

        const titulo=tarjeta.querySelector("h3");

        if(titulo){

            titulo.innerHTML=`

                <i class="fa-solid fa-user"></i>

                Persona ${indice+1}

            `;

        }

    });

}