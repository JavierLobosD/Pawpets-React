/** Calcula los totales del reporte a partir de las órdenes; solo cuentan las pagadas. */
// Recibe la lista de órdenes y devuelve un objeto con los totales
export function resumenVentas(ordenes) {
  // Se queda solo con las órdenes pagadas
  const pagadas = ordenes.filter((o) => o.estado === 'Pagada');
  // Aquí se van sumando las ventas de cada producto
  // La clave es el nombre del producto, por ejemplo { 'Collar': { ... } }
  const acumulado = {};
  // Recorre cada producto de cada orden pagada
  pagadas.forEach((orden) =>
    // De cada línea de la orden se sacan el nombre, la cantidad y el subtotal
    orden.items.forEach(({ nombre, cantidad, subtotal }) => {
      // Si el producto no estaba, lo crea en cero
      // ??= solo asigna si acumulado[nombre] todavía no existe
      acumulado[nombre] ??= { nombre, unidades: 0, ingresos: 0 };
      // Suma las unidades y la plata de esta venta
      acumulado[nombre].unidades += cantidad;
      acumulado[nombre].ingresos += subtotal;
    }),
  );
  // Objeto final que usa la página de reportes
  return {
    // Plata total de todas las ventas pagadas
    // reduce parte en 0 y le va sumando el total de cada orden
    ventasTotales: pagadas.reduce((suma, o) => suma + o.total, 0),
    // Cantidad de órdenes pagadas
    ordenesPagadas: pagadas.length,
    // Las que no se pagaron cuentan como rechazadas
    ordenesRechazadas: ordenes.length - pagadas.length,
    // Lista por producto, del que más vendió al que menos
    // Object.values pasa el objeto acumulado a una lista para poder ordenarla
    porProducto: Object.values(acumulado).sort((a, b) => b.ingresos - a.ingresos),
  };
}
