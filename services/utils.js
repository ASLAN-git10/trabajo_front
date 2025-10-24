export let expresionesRegulares = {
    // Permite letras ASCII y letras acentuadas comunes, y espacios. Longitud 2-60.
    regexNombre: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,60}$/,
    // Se mantiene una regex básica aquí, la validación más estricta se hace en script.js (normalizando dígitos)
    regexNumero: /^[0-9+\s()\-]{7,20}$/,
    regexCorreo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    // Texto obligatorio, hasta 500 caracteres
    regexTexto: /^.{1,500}$/,


}
