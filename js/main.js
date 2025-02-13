document.addEventListener("DOMContentLoaded", () => {
    // Elementos de navegación
    const btnMostrarInicio = document.getElementById("mostrar-inicio");
    const btnMostrarFormulario = document.getElementById("mostrar-formulario");
    const btnMostrarQuienesSomos = document.getElementById("mostrar-quienes-somos");
    const btnMostrarServicios = document.getElementById("mostrar-servicios");
    const btnMostrarQueHacemos = document.getElementById("mostrar-que-hacemos");

    // Secciones a mostrar/ocultar
    const formularioContacto = document.getElementById("formulario-contacto");
    const inicioSeccion = document.getElementById("inicio-seccion");
    const quienesSomosSeccion = document.getElementById("quienes-somos");
    const detalleCarrerasSeccion = document.getElementById("detalle-carreras");
    const queHacemosSeccion = document.getElementById("que-hacemos");

    // Carrusel
    const carruselContainer = document.querySelector(".carrusel-container");

    // Función para ocultar todas las secciones
    function ocultarSecciones() {
        [inicioSeccion, formularioContacto, quienesSomosSeccion, detalleCarrerasSeccion, queHacemosSeccion].forEach(seccion => {
            seccion?.classList.add("oculto");
        });
    }

    // Función para mostrar una sección específica
    function mostrarSeccion(seccion, mostrarCarrusel = false) {
        ocultarSecciones();
        if (mostrarCarrusel) {
            carruselContainer.classList.remove("oculto"); // Mostrar carrusel cuando sea la sección de inicio
        } else {
            carruselContainer.classList.add("oculto"); // Ocultar carrusel en otras secciones
        }
        seccion?.classList.remove("oculto");
        seccion?.scrollIntoView({ behavior: "smooth" });
    }

    // Eventos de navegación
    [
        [btnMostrarInicio, inicioSeccion, true], // Mostrar carrusel solo en la sección de inicio
        [btnMostrarFormulario, formularioContacto, false],
        [btnMostrarQuienesSomos, quienesSomosSeccion, false],
        [btnMostrarServicios, detalleCarrerasSeccion, false],
        [btnMostrarQueHacemos, queHacemosSeccion, false]
    ].forEach(([boton, seccion, mostrarCarrusel]) => {
        boton?.addEventListener("click", (e) => {
            e.preventDefault();
            mostrarSeccion(seccion, mostrarCarrusel);
        });
    });

    // Carrusel de imágenes
    const flechaIzquierda = document.getElementById("flecha-izquierda");
    const flechaDerecha = document.getElementById("flecha-derecha");
    const imagenesCarrusel = document.querySelector(".imagenes");
    const imagenes = document.querySelectorAll(".imagenes img");
    let indiceImagen = 0;

    function actualizarCarrusel() {
        imagenesCarrusel.style.transform = `translateX(-${indiceImagen * 100}%)`;
    }

    [[flechaIzquierda, -1], [flechaDerecha, 1]].forEach(([flecha, direccion]) => {
        flecha?.addEventListener("click", () => {
            indiceImagen = (indiceImagen + direccion + imagenes.length) % imagenes.length;
            actualizarCarrusel();
        });
    });
});
