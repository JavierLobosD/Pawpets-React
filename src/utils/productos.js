/** Por debajo de este stock el producto aparece en el listado de productos críticos. */
export const UMBRAL_CRITICO = 5;

/** El precio de oferta (si existe) reemplaza al precio normal. */
export function precioFinal(producto) {
  return producto.precioOferta > 0 ? producto.precioOferta : producto.precio;
}

export const enOferta = (producto) => producto.precioOferta > 0;

export const esCritico = (producto) => producto.stock <= UMBRAL_CRITICO;

/** Filtra por texto (en el nombre) y por categoría; ambos criterios son opcionales. */
export function filtrarProductos(productos, { texto = '', categoriaId = '' } = {}) {
  const buscado = texto.trim().toLowerCase();
  return productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(buscado) &&
      (!categoriaId || p.categoriaId === Number(categoriaId)),
  );
}
