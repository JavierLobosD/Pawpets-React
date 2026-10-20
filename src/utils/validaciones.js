/**
 * Reglas de validación reutilizables. Cada regla recibe el valor (y todos los
 * valores del formulario) y devuelve '' si es válido o el mensaje de error.
 */
export const requerido = (valor) =>
  String(valor ?? '').trim() ? '' : 'Este campo es obligatorio.';

export const correo = (valor) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
    ? ''
    : 'Ingresa un correo válido, por ejemplo: nombre@correo.cl.';

export const minimo = (largo) => (valor) =>
  String(valor).length >= largo ? '' : `Debe tener al menos ${largo} caracteres.`;

export const numeroNoNegativo = (valor) =>
  valor !== '' && Number(valor) >= 0 ? '' : 'Ingresa un número igual o mayor a 0.';

export const coincideCon = (otroCampo, etiqueta) => (valor, valores) =>
  valor === valores[otroCampo] ? '' : `${etiqueta} no coincide.`;

/**
 * Aplica las reglas de cada campo en orden y devuelve solo los errores,
 * por ejemplo { correo: 'Este campo es obligatorio.' }. Vacío = formulario válido.
 */
export function validar(valores, reglas) {
  const errores = {};
  Object.entries(reglas).forEach(([campo, lista]) => {
    for (const regla of lista) {
      const mensaje = regla(valores[campo], valores);
      if (mensaje) {
        errores[campo] = mensaje;
        break;
      }
    }
  });
  return errores;
}
