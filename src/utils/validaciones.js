/**
 * Reglas de validación reutilizables. Cada regla recibe el valor (y todos los
 * valores del formulario) y devuelve '' si es válido o el mensaje de error.
 */
// Revisa que el campo no quede vacío ni con espacios
export const requerido = (valor) =>
  String(valor ?? '').trim() ? '' : 'Este campo es obligatorio.';

// Revisa que tenga forma de correo: algo@algo.algo
export const correo = (valor) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
    ? ''
    : 'Ingresa un correo válido, por ejemplo: nombre@correo.cl.';

// Crea una regla que pide un largo mínimo de letras
export const minimo = (largo) => (valor) =>
  String(valor).length >= largo ? '' : `Debe tener al menos ${largo} caracteres.`;

// Revisa que sea un número y que no sea negativo
export const numeroNoNegativo = (valor) =>
  valor !== '' && Number(valor) >= 0 ? '' : 'Ingresa un número igual o mayor a 0.';

// Crea una regla que compara con otro campo (ej: contraseñas)
export const coincideCon = (otroCampo, etiqueta) => (valor, valores) =>
  valor === valores[otroCampo] ? '' : `${etiqueta} no coincide.`;

/**
 * Aplica las reglas de cada campo en orden y devuelve solo los errores,
 * por ejemplo { correo: 'Este campo es obligatorio.' }. Vacío = formulario válido.
 */
export function validar(valores, reglas) {
  // Aquí se juntan los errores encontrados
  const errores = {};
  // Revisa campo por campo
  Object.entries(reglas).forEach(([campo, lista]) => {
    // Prueba cada regla del campo en orden
    for (const regla of lista) {
      const mensaje = regla(valores[campo], valores);
      // Guarda el primer error y deja de revisar ese campo
      if (mensaje) {
        errores[campo] = mensaje;
        break;
      }
    }
  });
  return errores;
}
