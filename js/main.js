document.addEventListener("DOMContentLoaded", () => {
    // Elementos de navegación
    const btnMostrarInicio = document.getElementById("mostrar-inicio");
    const btnMostrarQuienesSomos = document.getElementById("mostrar-quienes-somos");
    const btnMostrarServicios = document.getElementById("mostrar-servicios");
    const btnMostrarQueHacemos = document.getElementById("mostrar-que-hacemos");
    const btnMostrarFormulario = document.getElementById("mostrar-formulario"); // Botón de contacto

    // Secciones a mostrar/ocultar
    const inicioSeccion = document.getElementById("inicio-seccion");
    const quienesSomosSeccion = document.getElementById("quienes-somos");
    const detalleCarrerasSeccion = document.getElementById("detalle-carreras");
    const queHacemosSeccion = document.getElementById("que-hacemos");
    const carruselContainer = document.querySelector(".carrusel-container");

    // Función para ocultar todas las secciones
    function ocultarSecciones() {
        [inicioSeccion, quienesSomosSeccion, detalleCarrerasSeccion, queHacemosSeccion].forEach(seccion => {
            seccion?.classList.add("oculto");
        });
    }

    // Función para mostrar una sección específica
    function mostrarSeccion(seccion, mostrarCarrusel = false) {
        ocultarSecciones();
        if (mostrarCarrusel) {
            carruselContainer.classList.remove("oculto");
        } else {
            carruselContainer.classList.add("oculto");
        }
        seccion?.classList.remove("oculto");
        seccion?.scrollIntoView({ behavior: "smooth" });
    }

    // Eventos de navegación (excepto el de "Ingresar Contacto", que será especial)
    [
        [btnMostrarInicio, inicioSeccion, true],
        [btnMostrarQuienesSomos, quienesSomosSeccion, false],
        [btnMostrarServicios, detalleCarrerasSeccion, false],
        [btnMostrarQueHacemos, queHacemosSeccion, false]
    ].forEach(([boton, seccion, mostrarCarrusel]) => {
        boton?.addEventListener("click", (e) => {
            e.preventDefault();
            mostrarSeccion(seccion, mostrarCarrusel);
        });
    });

    // ⚡ Evento especial para abrir el formulario emergente de contacto
    btnMostrarFormulario?.addEventListener("click", async (e) => {
        e.preventDefault();

        const { value: formValues } = await Swal.fire({
            title: "Contáctanos",
            html: `
                <input id="swal-nombre" class="swal2-input" placeholder="Nombre">
                <input id="swal-correo" class="swal2-input" type="email" placeholder="Correo">
                <textarea id="swal-mensaje" class="swal2-input" style="height: 100px;" placeholder="Escribe tu mensaje aquí"></textarea>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Enviar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                const nombre = document.getElementById("swal-nombre").value.trim();
                const correo = document.getElementById("swal-correo").value.trim();
                const mensaje = document.getElementById("swal-mensaje").value.trim();

                if (!nombre || !correo || !mensaje) {
                    Swal.showValidationMessage("Todos los campos son obligatorios");
                    return false;
                }
                return { nombre, correo, mensaje };
            }
        });

        if (formValues) {
            Swal.fire({
                title: "Mensaje enviado",
                text: `Gracias, ${formValues.nombre}. Te responderemos a ${formValues.correo}`,
                icon: "success"
            });

            console.log("Datos enviados:", formValues);
        }
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
const informacionCarreras = {
    "Ingeniería en Sistemas": "Aprenderás sobre programación, bases de datos, redes y seguridad informática, preparándote para resolver problemas tecnológicos en empresas de todo tipo.",
    "Administración de Empresas": "Te formarás en liderazgo, gestión de proyectos y finanzas, permitiéndote dirigir empresas o emprender tu propio negocio con éxito.",
    "Psicología": "Estudiarás el comportamiento humano y desarrollarás habilidades para ayudar a las personas a mejorar su bienestar emocional y mental.",
    "Diseño Gráfico": "Explorarás la creatividad digital y aprenderás a comunicar ideas visualmente mediante herramientas como Photoshop, Illustrator y más."
};
document.addEventListener("DOMContentLoaded", () => {
    const carreras = document.querySelectorAll(".carrera");

    const informacionCarreras = {
        "Ingeniería en Sistemas": {
            descripcion: "Aprenderás sobre programación, bases de datos, redes y seguridad informática, preparándote para resolver problemas tecnológicos en empresas de todo tipo.",
            icono: "💻"
        },
        "Administración de Empresas": {
            descripcion: "Te formarás en liderazgo, gestión de proyectos y finanzas, permitiéndote dirigir empresas o emprender tu propio negocio con éxito.",
            icono: "📊"
        },
        "Psicología": {
            descripcion:  "Estudiarás el comportamiento humano y desarrollarás habilidades para ayudar a las personas a mejorar su bienestar emocional y mental.",
            icono: "🧠"
        },
        "Diseño Gráfico": {
            descripcion: "Explorarás la creatividad digital y aprenderás a comunicar ideas visualmente mediante herramientas como Photoshop, Illustrator y más.",
            icono: "🎨"
        }
    };

    carreras.forEach((carrera) => {
        carrera.addEventListener("click", async () => {
            const nombreCarrera = carrera.querySelector("h3").innerText;
            const carreraInfo = informacionCarreras[nombreCarrera] || { descripcion: "Información no disponible.", icono: "❓" };

            const { isConfirmed } = await Swal.fire({
                title: `${carreraInfo.icono} ${nombreCarrera}`,
                html: `<p style="font-size: 20px; font-weight: bold;">${carreraInfo.descripcion}</p>`,
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Conocer más de la carrera",
                cancelButtonText: "Cerrar",
                showClass: {
                    popup: "animate__animated animate__fadeInUp animate__faster"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutDown animate__faster"
                }
            });

            if (isConfirmed) {
                await Swal.fire({
                    title: "Contáctanos",
                    html: `
                        <input id="swal-nombre" class="swal2-input" placeholder="Nombre">
                        <input id="swal-correo" class="swal2-input" type="email" placeholder="Correo">
                        <textarea id="swal-mensaje" class="swal2-input" style="height: 100px;" placeholder="Escribe tu mensaje aquí"></textarea>
                    `,
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: "Enviar",
                    cancelButtonText: "Cancelar",
                    showClass: {
                        popup: "animate__animated animate__fadeInUp animate__faster"
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutDown animate__faster"
                    },
                    preConfirm: () => {
                        const nombre = document.getElementById("swal-nombre").value.trim();
                        const correo = document.getElementById("swal-correo").value.trim();
                        const mensaje = document.getElementById("swal-mensaje").value.trim();

                        if (!nombre || !correo || !mensaje) {
                            Swal.showValidationMessage("Todos los campos son obligatorios");
                            return false;
                        }
                        return { nombre, correo, mensaje };
                    }
                }).then((result) => {
                    if (result.value) {
                        Swal.fire({
                            title: "Mensaje enviado",
                            text: `Gracias, ${result.value.nombre}. Te responderemos a ${result.value.correo}`,
                            icon: "success",
                            showClass: {
                                popup: "animate__animated animate__fadeInUp animate__faster"
                            },
                            hideClass: {
                                popup: "animate__animated animate__fadeOutDown animate__faster"
                            }
                        });
                    }
                });
            }
        });
    });
});
