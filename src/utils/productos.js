/** Por debajo de este stock el producto aparece en el listado de productos críticos. */
// Es una constante para cambiar el límite en un solo lugar
export const UMBRAL_CRITICO = 5;

/** El precio de oferta (si existe) reemplaza al precio normal. */
// Recibe un producto y devuelve el precio que realmente se cobra
export function precioFinal(producto) {
  // Si precioOferta es mayor a 0 se usa ese; si no, el precio normal
  return producto.precioOferta > 0 ? producto.precioOferta : producto.precio;
}

// Dice si el producto tiene un precio de oferta
// Devuelve true o false
export const enOferta = (producto) => producto.precioOferta > 0;

// Dice si al producto le queda poco stock
// Es crítico si el stock es igual o menor al umbral (5)
export const esCritico = (producto) => producto.stock <= UMBRAL_CRITICO;

/** Filtra por texto (en el nombre) y por categoría; ambos criterios son opcionales. */
// El segundo parámetro trae texto y categoriaId; si no llegan, valen '' (sin filtro)
export function filtrarProductos(productos, { texto = '', categoriaId = '' } = {}) {
  // Texto en minúsculas y sin espacios en los bordes
  const buscado = texto.trim().toLowerCase();
  // filter devuelve una lista nueva solo con los productos que cumplen
  return productos.filter(
    (p) =>
      // El nombre debe contener lo buscado
      // (si buscado es '', includes da true y no filtra nada)
      p.nombre.toLowerCase().includes(buscado) &&
      // Y si hay categoría elegida, debe ser esa
      // Number() porque la categoría viene como texto desde la URL o el select
      (!categoriaId || p.categoriaId === Number(categoriaId)),
  );
}
