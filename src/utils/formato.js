/** Formatea un número como pesos chilenos: 18990 -> "$18.990". */
export function precioCLP(valor) {
  return `$${Number(valor).toLocaleString('es-CL')}`;
}
