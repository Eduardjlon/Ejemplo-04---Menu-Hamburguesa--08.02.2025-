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

    // Formulario de contacto
    const contactoForm = document.getElementById("contacto-form");

    // Función para ocultar todas las secciones
    function ocultarSecciones() {
        [inicioSeccion, formularioContacto, quienesSomosSeccion, detalleCarrerasSeccion, queHacemosSeccion].forEach(seccion => {
            seccion?.classList.add("oculto");
        });
    }

    // Función para mostrar una sección específica
    function mostrarSeccion(seccion) {
        ocultarSecciones();
        carruselContainer.classList.add("oculto");
        seccion?.classList.remove("oculto");
        seccion?.scrollIntoView({ behavior: "smooth" });
    }

    // Eventos de navegación
    [
        [btnMostrarInicio, inicioSeccion], 
        [btnMostrarFormulario, formularioContacto], 
        [btnMostrarQuienesSomos, quienesSomosSeccion], 
        [btnMostrarServicios, detalleCarrerasSeccion], 
        [btnMostrarQueHacemos, queHacemosSeccion]
    ].forEach(([boton, seccion]) => {
        boton?.addEventListener("click", (e) => {
            e.preventDefault();
            mostrarSeccion(seccion);
        });
    });

    // Manejar el envío del formulario de contacto
    contactoForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("✅ Contacto registrado con éxito!");
        contactoForm.reset();  // Limpiar campos del formulario
        ocultarSecciones();    // Ocultar todas las secciones, incluyendo el formulario
        mostrarSeccion(inicioSeccion);  // Volver a mostrar la sección de inicio
    });

    // Funcionalidad para el carrusel de imágenes
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
