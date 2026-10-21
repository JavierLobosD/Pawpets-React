/** Formatea un número como pesos chilenos: 18990 -> "$18.990". */
export function precioCLP(valor) {
  // Agrega el signo $ y los puntos de miles chilenos
  return `$${Number(valor).toLocaleString('es-CL')}`;
}
