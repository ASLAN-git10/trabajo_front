// Funciones simples y reutilizables para trabajar con localStorage
export function guardarLocalStorage(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (err) {
		console.error("Error guardando en localStorage:", err);
	}
}

export function consultarLocalStorage(key) {
	try {
		const v = localStorage.getItem(key);
		return v ? JSON.parse(v) : null;
	} catch (err) {
		console.error("Error leyendo localStorage:", err);
		return null;
	}
}