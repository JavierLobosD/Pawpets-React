/** Calcula los totales del reporte a partir de las órdenes; solo cuentan las pagadas. */
export function resumenVentas(ordenes) {
  const pagadas = ordenes.filter((o) => o.estado === 'Pagada');
  const acumulado = {};
  pagadas.forEach((orden) =>
    orden.items.forEach(({ nombre, cantidad, subtotal }) => {
      acumulado[nombre] ??= { nombre, unidades: 0, ingresos: 0 };
      acumulado[nombre].unidades += cantidad;
      acumulado[nombre].ingresos += subtotal;
    }),
  );
  return {
    ventasTotales: pagadas.reduce((suma, o) => suma + o.total, 0),
    ordenesPagadas: pagadas.length,
    ordenesRechazadas: ordenes.length - pagadas.length,
    porProducto: Object.values(acumulado).sort((a, b) => b.ingresos - a.ingresos),
  };
}
