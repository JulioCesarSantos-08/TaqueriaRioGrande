const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});

const visorMenu = document.getElementById("visorMenu");
const verMenu = document.getElementById("verMenu");
const menuImagen = document.getElementById("menuImagen");
const cerrarMenu = document.getElementById("cerrarMenu");

function abrirMenu() {

    visorMenu.classList.add("mostrar");

}

function cerrarVisor() {

    visorMenu.classList.remove("mostrar");

}

verMenu.addEventListener("click", abrirMenu);

menuImagen.addEventListener("click", abrirMenu);

cerrarMenu.addEventListener("click", cerrarVisor);

visorMenu.addEventListener("click", e => {

    if (e.target === visorMenu) {

        cerrarVisor();

    }

});

const clabe = "722969010099182432";

const copiarBtn = document.querySelector(".copiar-clabe");

copiarBtn.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(clabe);

        copiarBtn.innerHTML = '<i class="fas fa-check"></i> CLABE copiada';

        setTimeout(() => {

            copiarBtn.innerHTML = '<i class="fas fa-copy"></i> Copiar CLABE';

        }, 2500);

    } catch {

        alert("No fue posible copiar la CLABE.");

    }

});

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {

    threshold: .15

});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("oculto");

    observer.observe(section);

});

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 40) {

        header.classList.add("scroll");

    } else {

        header.classList.remove("scroll");

    }

});

const btnTop = document.getElementById("btnTop");

if (btnTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            btnTop.classList.add("show");

        } else {

            btnTop.classList.remove("show");

        }

    });

    btnTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
window.addEventListener("load", () => {

    const splash = document.getElementById("splash");

    setTimeout(() => {

        splash.classList.add("ocultar");

    }, 1400);

});