// De Testing Library: cleanup (limpia), fireEvent (simula acciones) y screen (busca en pantalla)
import { cleanup, fireEvent, screen } from '@testing-library/react';
// La página que se prueba
import Carrito from '../pages/Carrito';
// Producto de ejemplo y función para dibujar con contextos falsos
import { productoEjemplo, renderizar } from './ayudas';

// Pruebas de la página del carrito
// Aquí el carrito es falso (mock): no se usa el CarritoProvider real
describe('Página Carrito', () => {
  // Limpia la pantalla después de cada prueba
  afterEach(cleanup);

  // Carrito falso con espías para ver qué se llama
  // Recibe las líneas y calcula el total sumando los subtotales
  // jasmine.createSpy crea una función falsa que recuerda si la llamaron y con qué
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
    // Comprueba que aparece el texto "carrito está vacío" (/.../ busca una parte del texto)
    expect(screen.getByText(/carrito está vacío/)).toBeTruthy();
  });

  // Con un producto debe mostrar su nombre y el total
  it('lista las líneas y muestra el total', () => {
    // Prepara un carrito con 2 unidades del producto de ejemplo ($20.000)
    renderizar(<Carrito />, {
      carrito: carritoCon([{ producto: productoEjemplo, cantidad: 2, subtotal: 20000 }]),
    });
    // Comprueba que se ve el nombre del producto
    expect(screen.getByText('Alimento Perro')).toBeTruthy();
    // Comprueba que el total sale con formato chileno
    expect(screen.getByText('Total: $20.000')).toBeTruthy();
  });

  // Los botones deben llamar a quitar y vaciar
  it('Eliminar y Limpiar invocan las acciones del contexto', () => {
    // Prepara un carrito con una unidad del producto de ejemplo
    const carrito = carritoCon([
      { producto: productoEjemplo, cantidad: 1, subtotal: 10000 },
    ]);
    renderizar(<Carrito />, { carrito });
    // Hace clic en los dos botones
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Limpiar' }));
    // Comprueba que quitar se llamó con el id del producto (1)
    expect(carrito.quitar).toHaveBeenCalledWith(1);
    // Comprueba que vaciar se llamó
    expect(carrito.vaciar).toHaveBeenCalled();
  });

  // Cambiar el input debe avisar la nueva cantidad
  it('cambiar la cantidad notifica el nuevo valor', () => {
    const carrito = carritoCon([
      { producto: productoEjemplo, cantidad: 1, subtotal: 10000 },
    ]);
    renderizar(<Carrito />, { carrito });
    // Escribe 3 en el input de cantidad
    // El input se busca por su aria-label
    fireEvent.change(screen.getByLabelText('Cantidad de Alimento Perro'), {
      target: { value: '3' },
    });
    // Comprueba que se llamó con el id 1 y el número 3 (ya convertido de texto a número)
    expect(carrito.cambiarCantidad).toHaveBeenCalledWith(1, 3);
  });
});
