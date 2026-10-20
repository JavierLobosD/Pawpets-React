import {
  esCritico,
  filtrarProductos,
  precioFinal,
  UMBRAL_CRITICO,
} from '../utils/productos';
import { resumenVentas } from '../utils/reportes';
import { productoEjemplo } from './ayudas';

describe('Lógica de productos y reportes', () => {
  const lista = [
    { ...productoEjemplo, id: 1, nombre: 'Alimento Perro', categoriaId: 1 },
    { ...productoEjemplo, id: 2, nombre: 'Alimento Gato', categoriaId: 2 },
  ];

  it('precioFinal usa la oferta cuando existe', () => {
    expect(precioFinal(productoEjemplo)).toBe(10000);
    expect(precioFinal({ ...productoEjemplo, precioOferta: 8000 })).toBe(8000);
  });

  it('esCritico depende del umbral de stock', () => {
    expect(esCritico({ stock: UMBRAL_CRITICO })).toBeTrue();
    expect(esCritico({ stock: UMBRAL_CRITICO + 1 })).toBeFalse();
  });

  it('filtrarProductos combina texto y categoría', () => {
    expect(filtrarProductos(lista, { texto: 'gato' }).map((p) => p.id)).toEqual([2]);
    expect(filtrarProductos(lista, { categoriaId: '1' }).map((p) => p.id)).toEqual([1]);
    expect(filtrarProductos(lista)).toHaveSize(2);
  });

  it('resumenVentas ignora las órdenes rechazadas', () => {
    const ordenes = [
      {
        estado: 'Pagada',
        total: 20000,
        items: [{ nombre: 'A', cantidad: 2, subtotal: 20000 }],
      },
      {
        estado: 'Rechazada',
        total: 5000,
        items: [{ nombre: 'B', cantidad: 1, subtotal: 5000 }],
      },
    ];
    const resumen = resumenVentas(ordenes);
    expect(resumen.ventasTotales).toBe(20000);
    expect(resumen.ordenesRechazadas).toBe(1);
    expect(resumen.porProducto).toEqual([{ nombre: 'A', unidades: 2, ingresos: 20000 }]);
  });
});
