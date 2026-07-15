import { productosMesa } from "./productosMesa.js";

const contenedorMesa = document.getElementById("productosMesa");

document.addEventListener("pedido-listo", () => {

    if (!contenedorMesa) return;

    renderizarProductosMesa();

});

function renderizarProductosMesa() {

    contenedorMesa.innerHTML = "";

    productosMesa.forEach(producto => {

        contenedorMesa.innerHTML += `

        <div class="productoMesaCard">

            <div class="productoMesaInfo">

                <strong>${producto.nombre}</strong>

                <div>$${producto.precio}</div>

            </div>

            <div class="productoMesaControles">

                <button
                    class="menosMesa"
                    data-id="${producto.id}">
                    −
                </button>

                <strong
                    id="cantidadMesa-${producto.id}">
                    0
                </strong>

                <button
                    class="masMesa"
                    data-id="${producto.id}">
                    +
                </button>

            </div>

        </div>

        `;

    });

}