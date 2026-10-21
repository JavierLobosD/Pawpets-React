/** Calcula los totales del reporte a partir de las órdenes; solo cuentan las pagadas. */
export function resumenVentas(ordenes) {
  // Se queda solo con las órdenes pagadas
  const pagadas = ordenes.filter((o) => o.estado === 'Pagada');
  // Aquí se van sumando las ventas de cada producto
  const acumulado = {};
  // Recorre cada producto de cada orden pagada
  pagadas.forEach((orden) =>
    orden.items.forEach(({ nombre, cantidad, subtotal }) => {
      // Si el producto no estaba, lo crea en cero
      acumulado[nombre] ??= { nombre, unidades: 0, ingresos: 0 };
      // Suma las unidades y la plata de esta venta
      acumulado[nombre].unidades += cantidad;
      acumulado[nombre].ingresos += subtotal;
    }),
  );
  return {
    // Plata total de todas las ventas pagadas
    ventasTotales: pagadas.reduce((suma, o) => suma + o.total, 0),
    ordenesPagadas: pagadas.length,
    // Las que no se pagaron cuentan como rechazadas
    ordenesRechazadas: ordenes.length - pagadas.length,
    // Lista por producto, del que más vendió al que menos
    porProducto: Object.values(acumulado).sort((a, b) => b.ingresos - a.ingresos),
  };
}
