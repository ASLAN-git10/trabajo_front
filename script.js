import { expresionesRegulares } from "./services/utils.js";
import { guardarLocalStorage, consultarLocalStorage } from "./services/local-storage.js";
import { Contacto } from "./models/Modelcontacto.js";

// Debounce util
function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

// Validación de teléfono: normaliza y verifica cantidad de dígitos
function isPhoneValid(value) {
  const digits = value.replace(/\D/g, "");
  // acepta entre 7 y 15 dígitos (soporta códigos de país como 57)
  return digits.length >= 7 && digits.length <= 15;
}

// Obtiene el span de error correspondiente
function getErrorEl(id) {
  return document.getElementById(`error-${id}`);
}

// Espera a que el DOM esté listo y solo actúa si existe el formulario de contacto
// Función global para ver mensajes guardados
window.verMensajes = () => {
  const mensajes = consultarLocalStorage("contactos") || [];
  console.table(mensajes);
  return `Se encontraron ${mensajes.length} mensajes guardados`;
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.formulario");
  if (!form) return; // nada que hacer en otras páginas

  const inputs = form.querySelectorAll(".formulario_entrada");
  const feedback = document.getElementById("form-feedback");

  // estado simple para saber si cada campo es válido
  const estados = {
    nombre: false,
    correo: false,
    telefono: false,
    mensaje: false,
  };

  // Validación en tiempo real con debounce
  inputs.forEach((input) => input.addEventListener("input", debounce(validarCampo, 300)));

  // Interceptar envío
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Validar todos los campos antes de enviar
    inputs.forEach((i) => validarCampo({ target: i }));

    const todoValido = Object.values(estados).every((v) => v === true);
    if (!todoValido) {
      feedback.textContent = "Corrige los campos en rojo antes de enviar.";
      feedback.classList.add("error");
      return;
    }

    // Construir objeto contacto y guardar en localStorage
    const data = Contacto({
      nombre: form.nombre.value.trim(),
      correo: form.correo.value.trim(),
      telefono: form.telefono.value.trim(),
      mensaje: form.mensaje.value.trim(),
      fecha: new Date().toISOString(),
    });

    const contactos = consultarLocalStorage("contactos") || [];
    contactos.push(data);
    guardarLocalStorage("contactos", contactos);

    // Retroalimentación al usuario
    form.reset();
    inputs.forEach((i) => {
      i.style.borderColor = "";
      i.style.color = "";
    });
    feedback.classList.remove("error");
    feedback.textContent = "Mensaje enviado con éxito (guardado localmente).";

    // limpiar el mensaje pasados 4s
    setTimeout(() => (feedback.textContent = ""), 4000);
  });

  function validarCampo(e) {
    const target = e.target;
    const id = target.id;
    let valido = false;
    let mensaje = "";

    const value = target.value || "";

    switch (id) {
      case "nombre":
        valido = expresionesRegulares.regexNombre.test(value.trim());
        if (!valido) mensaje = "Ingresa un nombre válido (2–60 letras).";
        break;
      case "correo":
        valido = expresionesRegulares.regexCorreo.test(value.trim());
        if (!valido) mensaje = "Correo no válido.";
        break;
      case "telefono":
        valido = isPhoneValid(value);
        if (!valido) mensaje = "Teléfono no válido (ej: +57 300 000 0000 o 3000000000).";
        break;
      case "mensaje":
        valido = expresionesRegulares.regexTexto.test(value);
        if (!valido) mensaje = "El mensaje es obligatorio y debe tener hasta 500 caracteres.";
        break;
      default:
        valido = value.trim().length > 0;
    }

    // Actualiza estado
    if (id in estados) estados[id] = valido;

    // estilos
    if (valido) {
      target.style.outline = "none";
      target.style.borderColor = "green";
      target.style.borderWidth = "2px";
      target.style.color = "black";
      const err = getErrorEl(id);
      if (err) err.textContent = "";
    } else {
      target.style.color = "red";
      target.style.borderColor = "red";
      const err = getErrorEl(id);
      if (err) err.textContent = mensaje;
    }
  }
});
