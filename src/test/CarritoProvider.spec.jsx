import { act, cleanup, renderHook } from '@testing-library/react';
import { CarritoProvider } from '../context/CarritoProvider';
import db from '../data/db';
import useCarrito from '../hooks/useCarrito';

// Pruebas del carrito real, usando los datos de db
describe('CarritoProvider (estado compartido del carrito)', () => {
  // Antes de cada prueba parte con todo limpio
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
  const montar = () => renderHook(() => useCarrito(), { wrapper: CarritoProvider });

  // Agregar el mismo producto debe sumar cantidades
  it('agregar suma cantidades y calcula el total con el precio vigente', () => {
    const { result } = montar();
    act(() => result.current.agregar(1, 2)); // $18.990 c/u
    act(() => result.current.agregar(1));
    expect(result.current.cantidadTotal).toBe(3);
    expect(result.current.total).toBe(18990 * 3);
  });

  // No se puede agregar más que el stock
  it('la cantidad no puede superar el stock disponible', () => {
    const { result } = montar();
    const stock = db.obtener('productos', 5).stock;
    // Intenta agregar 10 más que el stock
    act(() => result.current.agregar(5, stock + 10));
    expect(result.current.items[0].cantidad).toBe(stock);
  });

  // Quitar saca un producto y vaciar saca todos
  it('quitar y vaciar eliminan líneas', () => {
    const { result } = montar();
    act(() => result.current.agregar(1));
    act(() => result.current.agregar(2));
    act(() => result.current.quitar(1));
    expect(result.current.items).toHaveSize(1);
    act(() => result.current.vaciar());
    expect(result.current.items).toHaveSize(0);
  });

  // Revisa que el carrito quede guardado en el navegador
  it('el carrito se guarda en localStorage', () => {
    const { result } = montar();
    act(() => result.current.agregar(3));
    expect(JSON.parse(localStorage.getItem('pawpets:carrito'))).toEqual([
      { id: 3, cantidad: 1 },
    ]);
  });
});
