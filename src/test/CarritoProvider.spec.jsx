import { act, cleanup, renderHook } from '@testing-library/react';
import { CarritoProvider } from '../context/CarritoProvider';
import db from '../data/db';
import useCarrito from '../hooks/useCarrito';

describe('CarritoProvider (estado compartido del carrito)', () => {
  beforeEach(() => {
    localStorage.clear();
    db.reiniciar();
  });
  afterEach(() => {
    cleanup();
    db.reiniciar();
  });

  const montar = () => renderHook(() => useCarrito(), { wrapper: CarritoProvider });

  it('agregar suma cantidades y calcula el total con el precio vigente', () => {
    const { result } = montar();
    act(() => result.current.agregar(1, 2)); // $18.990 c/u
    act(() => result.current.agregar(1));
    expect(result.current.cantidadTotal).toBe(3);
    expect(result.current.total).toBe(18990 * 3);
  });

  it('la cantidad no puede superar el stock disponible', () => {
    const { result } = montar();
    const stock = db.obtener('productos', 5).stock;
    act(() => result.current.agregar(5, stock + 10));
    expect(result.current.items[0].cantidad).toBe(stock);
  });

  it('quitar y vaciar eliminan líneas', () => {
    const { result } = montar();
    act(() => result.current.agregar(1));
    act(() => result.current.agregar(2));
    act(() => result.current.quitar(1));
    expect(result.current.items).toHaveSize(1);
    act(() => result.current.vaciar());
    expect(result.current.items).toHaveSize(0);
  });

  it('el carrito se guarda en localStorage', () => {
    const { result } = montar();
    act(() => result.current.agregar(3));
    expect(JSON.parse(localStorage.getItem('pawpets:carrito'))).toEqual([
      { id: 3, cantidad: 1 },
    ]);
  });
});
