/** Formatea un número como pesos chilenos: 18990 -> "$18.990". */
// Se exporta para usarla en cualquier pantalla que muestre precios
export function precioCLP(valor) {
  // Agrega el signo $ y los puntos de miles chilenos
  // Number() asegura que sea número aunque llegue como texto ('18990')
  // toLocaleString('es-CL') pone los puntos como se usan en Chile
  return `$${Number(valor).toLocaleString('es-CL')}`;
}
