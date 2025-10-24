// Modelo ligero para representar un contacto
export function Contacto({ nombre = "", correo = "", telefono = "", mensaje = "", fecha = null } = {}) {
	return {
		nombre,
		correo,
		telefono,
		mensaje,
		fecha: fecha || new Date().toISOString(),
	};
}
