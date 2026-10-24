// De Testing Library: act (espera a que React termine de actualizar),
// cleanup (limpia lo dibujado) y renderHook (prueba un hook sin dibujar pantalla)
import { act, cleanup, renderHook } from '@testing-library/react';
// El provider real del carrito, que es lo que se prueba
import { CarritoProvider } from '../context/CarritoProvider';
// db real, para leer precios y stock de los productos
import db from '../data/db';
// useCarrito: hook que entrega lo que comparte el CarritoProvider
import useCarrito from '../hooks/useCarrito';

// Pruebas del carrito real, usando los datos de db
// Aquí no hay mocks: se prueba el provider de verdad
describe('CarritoProvider (estado compartido del carrito)', () => {
  // Antes de cada prueba parte con todo limpio
  // (localStorage vacío = carrito vacío; db.reiniciar = productos de seed.js)
  beforeEach(() => {
    localStorage.clear();
    db.reiniciar();
  });
  // Después de cada prueba deja todo como estaba
  afterEach(() => {
    cleanup();
    db.reiniciar();
  });

  // Monta el hook useCarrito dentro del CarritoProvider
  // result.current tendrá items, total, agregar, quitar, etc.
  const montar = () => renderHook(() => useCarrito(), { wrapper: CarritoProvider });

  // Agregar el mismo producto debe sumar cantidades
  it('agregar suma cantidades y calcula el total con el precio vigente', () => {
    const { result } = montar();
    // Cambio: lee el precio desde db, antes estaba fijo y quedó viejo
    const precio = db.obtener('productos', 1).precio;
    // Agrega 2 unidades y después 1 más del producto 1
    act(() => result.current.agregar(1, 2)); // precio actual del producto 1 c/u
    act(() => result.current.agregar(1));
    // Comprueba que hay 3 unidades en total
    expect(result.current.cantidadTotal).toBe(3);
    // Comprueba que el total es 3 veces el precio (el producto 1 no tiene oferta)
    expect(result.current.total).toBe(precio * 3);
  });

  // No se puede agregar más que el stock
  it('la cantidad no puede superar el stock disponible', () => {
    const { result } = montar();
    // Stock real del producto 5
    const stock = db.obtener('productos', 5).stock;
    // Intenta agregar 10 más que el stock
    act(() => result.current.agregar(5, stock + 10));
    // Comprueba que la cantidad quedó en el stock, no más
    expect(result.current.items[0].cantidad).toBe(stock);
  });

  // Sumar a un producto ya agregado tampoco pasa el stock
  it('agregar más unidades a un producto ya en el carrito respeta el stock', () => {
    const { result } = montar();
    const stock = db.obtener('productos', 5).stock;
    // Primero agrega 1 unidad
    act(() => result.current.agregar(5));
    // Vuelve a agregar más de lo que queda
    act(() => result.current.agregar(5, stock));
    // Comprueba que la suma (1 + stock) se cortó en el stock
    expect(result.current.items[0].cantidad).toBe(stock);
  });

  // Quitar saca un producto y vaciar saca todos
  it('quitar y vaciar eliminan líneas', () => {
    const { result } = montar();
    // Agrega dos productos distintos y saca el primero
    act(() => result.current.agregar(1));
    act(() => result.current.agregar(2));
    act(() => result.current.quitar(1));
    // Comprueba que queda una sola línea
    expect(result.current.items).toHaveSize(1);
    act(() => result.current.vaciar());
    // Comprueba que no queda ninguna
    expect(result.current.items).toHaveSize(0);
  });

  // Revisa que el carrito quede guardado en el navegador
  it('el carrito se guarda en localStorage', () => {
    const { result } = montar();
    act(() => result.current.agregar(3));
    // Lee lo guardado, lo pasa de texto a lista y comprueba que solo tenga { id, cantidad }
    expect(JSON.parse(localStorage.getItem('pawpets:carrito'))).toEqual([
      { id: 3, cantidad: 1 },
    ]);
  });
});
