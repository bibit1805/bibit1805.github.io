let escenaActual = 2;
document.addEventListener("DOMContentLoaded", function() {
    mostrarEscena(2);
});

function mostrarEscena(numero) {

    document.querySelectorAll(".escena").forEach(function(escena) {
        escena.classList.remove("activa");
    });

    document.getElementById("escena" + numero)
        .classList.add("activa");

    escenaActual = numero;
}


function siguienteEscena() {

    if (escenaActual < 8) {

        mostrarEscena(escenaActual + 1);

    }

}


function abrirCamara() {

    mostrarEscena(5);

}


function entrarOficina() {

    alert("Aquí comenzará la oficina.");

}
const sonidoNoche = document.getElementById("sonidoNoche");

sonidoNoche.volume = 0.25;
document.addEventListener("click", function() {

    sonidoNoche.play()
        .then(function() {
            console.log("🔊 El sonido sí comenzó");
        })
        .catch(function(error) {
            console.log("❌ El navegador rechazó el sonido:", error);
        });

}, { once: true });

// ================================
// MOVIMIENTO DEL REPORTERITO
// ================================

const reporterito = document.getElementById("reporterito");
const reporteritoContenedor = document.getElementById("reporterito-contenedor");
let posicionX = 45;
let posicionY = 5;

let teclas = {};
let frame = 0;

const pasosIzquierda = [
    "imagenes/paso1.png",
    "imagenes/paso2.png",
    "imagenes/paso3.png",
    "imagenes/paso4.png"
];

const pasosDerecha = [
    "imagenes/paso1derecha.png",
    "imagenes/paso2derecha.png",
    "imagenes/paso3derecha.png",
    "imagenes/paso4derecha.png"
];

let pasos = pasosIzquierda;

document.addEventListener("keydown", function(event) {

    if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
    ) {
        event.preventDefault();
        teclas[event.key] = true;
    }

});

document.addEventListener("keyup", function(event) {

    teclas[event.key] = false;

});

function moverReporterito() {

    if (!reporterito) return;

    let seEstaMoviendo = false;

  if (teclas["ArrowLeft"]) {
    posicionX -= 0.20;
    pasos = pasosIzquierda;
    seEstaMoviendo = true;
}

if (teclas["ArrowRight"]) {
    posicionX += 0.20;
    pasos = pasosDerecha;
    seEstaMoviendo = true;
}
    if (teclas["ArrowUp"]) {
        posicionY += 0.20;
        seEstaMoviendo = true;
    }

    if (teclas["ArrowDown"]) {
        posicionY -= 0.20;
        seEstaMoviendo = true;
    }

   // ================================
// LÍMITES DE LA RECEPCIÓN
// ================================

posicionX = Math.max(1, Math.min(89.9, posicionX));
posicionY = Math.max(2, Math.min(85, posicionY));

    reporteritoContenedor.style.left = posicionX + "%";
reporteritoContenedor.style.bottom = posicionY + "%";

    // MOSTRADOR
const mostrador = document.getElementById("mostrador");
const zonaMostrador = document.querySelector(".zona-mostrador");

if (zonaMostrador) {
    const zonaRect = zonaMostrador.getBoundingClientRect();
    const reporteritoRect = reporteritoContenedor.getBoundingClientRect();

    const estaEnMostrador =
        reporteritoRect.left < zonaRect.right &&
        reporteritoRect.right > zonaRect.left &&
        reporteritoRect.top < zonaRect.bottom &&
        reporteritoRect.bottom > zonaRect.top;

    if (estaEnMostrador) {
        mostrador.style.zIndex = "5";
        reporteritoContenedor.style.zIndex = "6";
    } else {
        mostrador.style.zIndex = "7";
    }
}

// DETECTOR
const detector = document.getElementById("detector");
const zonaDetector = document.querySelector(".zona-detector");

if (zonaDetector) {
    const zonaRect = zonaDetector.getBoundingClientRect();
    const reporteritoRect = reporteritoContenedor.getBoundingClientRect();

    const estaEnDetector =
        reporteritoRect.left < zonaRect.right &&
        reporteritoRect.right > zonaRect.left &&
        reporteritoRect.top < zonaRect.bottom &&
        reporteritoRect.bottom > zonaRect.top;

    if (estaEnDetector) {
        detector.style.zIndex = "7";
        reporteritoContenedor.style.zIndex = "6";
    } else {
        detector.style.zIndex = "5";
    }
}
// PUERTA
const puerta = document.getElementById("puerta");
const zonaPuerta = document.querySelector(".zona-puerta");

if (zonaPuerta) {
    const zonaRect = zonaPuerta.getBoundingClientRect();
    const reporteritoRect = reporteritoContenedor.getBoundingClientRect();

    const estaEnPuerta =
        reporteritoRect.left < zonaRect.right &&
        reporteritoRect.right > zonaRect.left &&
        reporteritoRect.top < zonaRect.bottom &&
        reporteritoRect.bottom > zonaRect.top;

    if (estaEnPuerta) {
        puerta.style.zIndex = "7";
        reporteritoContenedor.style.zIndex = "6";
    } else {
        puerta.style.zIndex = "5";
    }
}
// SILLÓN
const sillon = document.getElementById("sillon");

if (sillon) {

    const sillonRect = sillon.getBoundingClientRect();
    const reporteritoRect = reporteritoContenedor.getBoundingClientRect();

    // Los pies del reporterito
    const piesReporterito = reporteritoRect.bottom;

    // Línea frontal del sillón
    const lineaSillon = sillonRect.top + (sillonRect.height * 0.60);

    if (piesReporterito < lineaSillon) {

        // Reporterito está detrás del sillón
        sillon.style.zIndex = "10";

    } else {

        // Reporterito está delante del sillón
        sillon.style.zIndex = "5";

    }
}
// FUENTE
const fuente = document.querySelector(".fuente-recepcion");

if (fuente) {

    const fuenteRect = fuente.getBoundingClientRect();
    const reporteritoRect = reporteritoContenedor.getBoundingClientRect();

    // Los pies del reporterito
    const piesReporterito = reporteritoRect.bottom;

    // Línea de intercambio de la fuente
    const lineaFuente = fuenteRect.top + (fuenteRect.height * 0.40);

    if (piesReporterito < lineaFuente) {

        // Reporterito está detrás de la fuente
        fuente.style.zIndex = "10";

    } else {

        // Reporterito está delante de la fuente
        fuente.style.zIndex = "5";

    }
}
    // Cambia las imágenes mientras camina
    if (seEstaMoviendo) {

        frame++;

    if (frame % 10 === 0) {

    let pasoActual = Math.floor(frame / 15) % pasos.length;

    console.log("ESTOY MOSTRANDO:", pasos[pasoActual]);

    reporterito.src = pasos[pasoActual];
}

    } else {

        frame = 0;
        reporterito.src = pasos[0];

    }

    requestAnimationFrame(moverReporterito);
}

moverReporterito();

