/**
 * Reglas de validación reutilizables. Cada regla recibe el valor (y todos los
 * valores del formulario) y devuelve '' si es válido o el mensaje de error.
 */
// Revisa que el campo no quede vacío ni con espacios
// valor ?? '' evita error si llega null o undefined; String() lo pasa a texto
// trim() quita espacios: si queda texto es válido (''), si no, devuelve el error
export const requerido = (valor) =>
  String(valor ?? '').trim() ? '' : 'Este campo es obligatorio.';

// Revisa que tenga forma de correo: algo@algo.algo
// La expresión regular pide: texto sin espacios, @, texto, un punto y más texto
// test() devuelve true si el valor calza con ese patrón
export const correo = (valor) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
    ? ''
    : 'Ingresa un correo válido, por ejemplo: nombre@correo.cl.';

// Crea una regla que pide un largo mínimo de letras
// Es una función que devuelve otra función: minimo(6) crea la regla "al menos 6"
export const minimo = (largo) => (valor) =>
  String(valor).length >= largo ? '' : `Debe tener al menos ${largo} caracteres.`;

// Revisa que sea un número y que no sea negativo
// Primero descarta el campo vacío y después revisa que sea 0 o más
export const numeroNoNegativo = (valor) =>
  valor !== '' && Number(valor) >= 0 ? '' : 'Ingresa un número igual o mayor a 0.';

// Crea una regla que compara con otro campo (ej: contraseñas)
// otroCampo = nombre del campo a comparar; etiqueta = nombre que sale en el mensaje
// valores trae todos los campos del formulario, así se puede leer el otro campo
export const coincideCon = (otroCampo, etiqueta) => (valor, valores) =>
  valor === valores[otroCampo] ? '' : `${etiqueta} no coincide.`;

/**
 * Aplica las reglas de cada campo en orden y devuelve solo los errores,
 * por ejemplo { correo: 'Este campo es obligatorio.' }. Vacío = formulario válido.
 */
// valores = lo escrito en el formulario; reglas = { campo: [regla1, regla2] }
export function validar(valores, reglas) {
  // Aquí se juntan los errores encontrados
  const errores = {};
  // Revisa campo por campo
  // Object.entries convierte { correo: [...] } en [['correo', [...]]]
  Object.entries(reglas).forEach(([campo, lista]) => {
    // Prueba cada regla del campo en orden
    for (const regla of lista) {
      // Llama a la regla con el valor del campo y con todos los valores
      const mensaje = regla(valores[campo], valores);
      // Guarda el primer error y deja de revisar ese campo
      if (mensaje) {
        errores[campo] = mensaje;
        // break sale del for: así se muestra un solo error por campo
        break;
      }
    }
  });
  // Si el objeto queda vacío, el formulario no tiene errores
  return errores;
}
