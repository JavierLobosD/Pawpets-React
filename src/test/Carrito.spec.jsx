import { cleanup, fireEvent, screen } from '@testing-library/react';
import Carrito from '../pages/Carrito';
import { productoEjemplo, renderizar } from './ayudas';

// Pruebas de la página del carrito
describe('Página Carrito', () => {
  // Limpia la pantalla después de cada prueba
  afterEach(cleanup);

  // Carrito falso con espías para ver qué se llama
  const carritoCon = (items) => ({
    items,
    total: items.reduce((s, i) => s + i.subtotal, 0),
    cambiarCantidad: jasmine.createSpy('cambiarCantidad'),
    quitar: jasmine.createSpy('quitar'),
    vaciar: jasmine.createSpy('vaciar'),
  });

  // Carrito vacío debe mostrar el aviso
  it('con el carrito vacío ofrece volver a los productos', () => {
    renderizar(<Carrito />, { carrito: carritoCon([]) });
    expect(screen.getByText(/carrito está vacío/)).toBeTruthy();
  });

  // Con un producto debe mostrar su nombre y el total
  it('lista las líneas y muestra el total', () => {
    renderizar(<Carrito />, {
      carrito: carritoCon([{ producto: productoEjemplo, cantidad: 2, subtotal: 20000 }]),
    });
    expect(screen.getByText('Alimento Perro')).toBeTruthy();
    expect(screen.getByText('Total: $20.000')).toBeTruthy();
  });

  // Los botones deben llamar a quitar y vaciar
  it('Eliminar y Limpiar invocan las acciones del contexto', () => {
    const carrito = carritoCon([
      { producto: productoEjemplo, cantidad: 1, subtotal: 10000 },
    ]);
    renderizar(<Carrito />, { carrito });
    // Hace clic en los dos botones
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Limpiar' }));
    expect(carrito.quitar).toHaveBeenCalledWith(1);
    expect(carrito.vaciar).toHaveBeenCalled();
  });

  // Cambiar el input debe avisar la nueva cantidad
  it('cambiar la cantidad notifica el nuevo valor', () => {
    const carrito = carritoCon([
      { producto: productoEjemplo, cantidad: 1, subtotal: 10000 },
    ]);
    renderizar(<Carrito />, { carrito });
    // Escribe 3 en el input de cantidad
    fireEvent.change(screen.getByLabelText('Cantidad de Alimento Perro'), {
      target: { value: '3' },
    });
    expect(carrito.cambiarCantidad).toHaveBeenCalledWith(1, 3);
  });
});
