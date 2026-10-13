// ==========================================================
// Comportamiento de la página personal
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  // Año actual en el pie de página
  document.getElementById("anio").textContent = new Date().getFullYear();

  // Cierra el menú móvil al elegir una sección
  const menu = document.getElementById("menuPrincipal");
  menu.querySelectorAll(".nav-link, .btn").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 991.98px)").matches) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // ---------- Formulario ----------
  const form = document.getElementById("formContacto");
  const fecha = document.getElementById("fecha");
  const mensaje = document.getElementById("mensaje");
  const contador = document.getElementById("contador");
  const exito = document.getElementById("mensajeExito");

  // La fecha de entrega no puede ser anterior a hoy (ni más de 1 año adelante)
  const hoy = new Date();
  const aISO = (d) => {
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mes}-${dia}`;
  };
  const limite = new Date(hoy);
  limite.setFullYear(limite.getFullYear() + 1);
  fecha.min = aISO(hoy);
  fecha.max = aISO(limite);

  // Contador de caracteres del mensaje
  const actualizarContador = () => {
    contador.textContent = `${mensaje.value.length} / ${mensaje.maxLength}`;
  };
  mensaje.addEventListener("input", actualizarContador);

  // Validación con las reglas HTML5 (required, minlength, pattern, min, max...)
  form.addEventListener("submit", (evento) => {
    evento.preventDefault(); // no se envía a ningún servidor

    if (!form.checkValidity()) {
      evento.stopPropagation();
      form.classList.add("was-validated");
      const primerError = form.querySelector(":invalid");
      if (primerError) primerError.focus();
      return;
    }

    form.reset();
    form.classList.remove("was-validated");
    actualizarContador();
    exito.classList.remove("d-none");
    exito.focus();
  });

  form.addEventListener("reset", () => {
    form.classList.remove("was-validated");
    exito.classList.add("d-none");
    // el contador se actualiza después de que el formulario se limpie
    setTimeout(actualizarContador, 0);
  });

  // ---------- Modal de proyectos ----------
  const modal = document.getElementById("modalProyecto");
  modal.addEventListener("show.bs.modal", (evento) => {
    const boton = evento.relatedTarget;
    document.getElementById("modalTitulo").textContent = boton.dataset.titulo;
    document.getElementById("modalDetalle").textContent = boton.dataset.detalle;
    document.getElementById("modalTec").textContent = boton.dataset.tecnologias;
  });
});
