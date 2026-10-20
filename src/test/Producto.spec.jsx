import { cleanup, fireEvent, screen } from '@testing-library/react';
import ListaProductos from '../components/ListaProductos';
import Producto from '../components/Producto';
import { productoEjemplo, renderizar } from './ayudas';

describe('Componente Producto', () => {
  afterEach(cleanup);

  it('renderiza el nombre y el precio formateado recibidos por props', () => {
    renderizar(<Producto {...productoEjemplo} onAgregar={() => {}} />);
    expect(screen.getByRole('heading', { name: 'Alimento Perro' })).toBeTruthy();
    expect(screen.getByText('$10.000')).toBeTruthy();
  });

  it('renderizado condicional: muestra el precio original tachado solo si hay oferta', () => {
    renderizar(
      <Producto {...productoEjemplo} precioOferta={8000} onAgregar={() => {}} />,
    );
    expect(screen.getByText('$10.000')).toBeTruthy();
    expect(screen.getByText('$8.000')).toBeTruthy();
  });

  it('el botón ejecuta onAgregar con el id del producto (evento + mock)', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    renderizar(<Producto {...productoEjemplo} onAgregar={onAgregar} />);
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));
    expect(onAgregar).toHaveBeenCalledOnceWith(1);
  });

  it('sin stock el botón se deshabilita', () => {
    renderizar(<Producto {...productoEjemplo} stock={0} onAgregar={() => {}} />);
    expect(screen.getByRole('button', { name: 'Sin stock' }).disabled).toBeTrue();
  });

  it('estado interno: si la imagen falla se muestra el reemplazo', () => {
    renderizar(<Producto {...productoEjemplo} onAgregar={() => {}} />);
    fireEvent.error(screen.getByRole('img', { name: 'Alimento Perro' }));
    expect(screen.getByText('Imagen no disponible')).toBeTruthy();
  });
});

describe('Componente ListaProductos', () => {
  afterEach(cleanup);

  it('renderiza una tarjeta por cada producto del conjunto de datos', () => {
    const datos = [
      productoEjemplo,
      { ...productoEjemplo, id: 2, nombre: 'Snacks' },
      { ...productoEjemplo, id: 3, nombre: 'Juguete' },
    ];
    renderizar(<ListaProductos productos={datos} onAgregar={() => {}} />);
    expect(screen.getAllByRole('article')).toHaveSize(3);
  });

  it('muestra un mensaje cuando no hay productos', () => {
    renderizar(<ListaProductos productos={[]} onAgregar={() => {}} />);
    expect(screen.getByText('No hay productos para mostrar.')).toBeTruthy();
    expect(screen.queryAllByRole('article')).toHaveSize(0);
  });
});
