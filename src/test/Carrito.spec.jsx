import { cleanup, fireEvent, screen } from '@testing-library/react';
import Carrito from '../pages/Carrito';
import { productoEjemplo, renderizar } from './ayudas';

describe('Página Carrito', () => {
  afterEach(cleanup);

  const carritoCon = (items) => ({
    items,
    total: items.reduce((s, i) => s + i.subtotal, 0),
    cambiarCantidad: jasmine.createSpy('cambiarCantidad'),
    quitar: jasmine.createSpy('quitar'),
    vaciar: jasmine.createSpy('vaciar'),
  });

  it('con el carrito vacío ofrece volver a los productos', () => {
    renderizar(<Carrito />, { carrito: carritoCon([]) });
    expect(screen.getByText(/carrito está vacío/)).toBeTruthy();
  });

  it('lista las líneas y muestra el total', () => {
    renderizar(<Carrito />, {
      carrito: carritoCon([{ producto: productoEjemplo, cantidad: 2, subtotal: 20000 }]),
    });
    expect(screen.getByText('Alimento Perro')).toBeTruthy();
    expect(screen.getByText('Total: $20.000')).toBeTruthy();
  });

  it('Eliminar y Limpiar invocan las acciones del contexto', () => {
    const carrito = carritoCon([
      { producto: productoEjemplo, cantidad: 1, subtotal: 10000 },
    ]);
    renderizar(<Carrito />, { carrito });
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Limpiar' }));
    expect(carrito.quitar).toHaveBeenCalledWith(1);
    expect(carrito.vaciar).toHaveBeenCalled();
  });

  it('cambiar la cantidad notifica el nuevo valor', () => {
    const carrito = carritoCon([
      { producto: productoEjemplo, cantidad: 1, subtotal: 10000 },
    ]);
    renderizar(<Carrito />, { carrito });
    fireEvent.change(screen.getByLabelText('Cantidad de Alimento Perro'), {
      target: { value: '3' },
    });
    expect(carrito.cambiarCantidad).toHaveBeenCalledWith(1, 3);
  });
});
