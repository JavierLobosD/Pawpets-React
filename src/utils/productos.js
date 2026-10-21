/** Por debajo de este stock el producto aparece en el listado de productos críticos. */
export const UMBRAL_CRITICO = 5;

/** El precio de oferta (si existe) reemplaza al precio normal. */
export function precioFinal(producto) {
  return producto.precioOferta > 0 ? producto.precioOferta : producto.precio;
}

// Dice si el producto tiene un precio de oferta
export const enOferta = (producto) => producto.precioOferta > 0;

// Dice si al producto le queda poco stock
export const esCritico = (producto) => producto.stock <= UMBRAL_CRITICO;

/** Filtra por texto (en el nombre) y por categoría; ambos criterios son opcionales. */
export function filtrarProductos(productos, { texto = '', categoriaId = '' } = {}) {
  // Texto en minúsculas y sin espacios en los bordes
  const buscado = texto.trim().toLowerCase();
  return productos.filter(
    (p) =>
      // El nombre debe contener lo buscado
      p.nombre.toLowerCase().includes(buscado) &&
      // Y si hay categoría elegida, debe ser esa
      (!categoriaId || p.categoriaId === Number(categoriaId)),
  );
}
