import { cleanup, fireEvent, screen } from '@testing-library/react';
import ListaProductos from '../components/ListaProductos';
import Producto from '../components/Producto';
import { productoEjemplo, renderizar } from './ayudas';

// Pruebas de la tarjeta de producto
describe('Componente Producto', () => {
  // Limpia la pantalla después de cada prueba
  afterEach(cleanup);

  // Debe mostrar el nombre y el precio con formato
  it('renderiza el nombre y el precio formateado recibidos por props', () => {
    renderizar(<Producto {...productoEjemplo} onAgregar={() => {}} />);
    expect(screen.getByRole('heading', { name: 'Alimento Perro' })).toBeTruthy();
    expect(screen.getByText('$10.000')).toBeTruthy();
  });

  // Con oferta deben verse los dos precios
  it('renderizado condicional: muestra el precio original tachado solo si hay oferta', () => {
    renderizar(
      <Producto {...productoEjemplo} precioOferta={8000} onAgregar={() => {}} />,
    );
    expect(screen.getByText('$10.000')).toBeTruthy();
    expect(screen.getByText('$8.000')).toBeTruthy();
  });

  // El botón debe llamar a onAgregar con el id
  it('el botón ejecuta onAgregar con el id del producto (evento + mock)', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    renderizar(<Producto {...productoEjemplo} onAgregar={onAgregar} />);
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));
    expect(onAgregar).toHaveBeenCalledOnceWith(1);
  });

  // Con stock 0 el botón no se puede apretar
  it('sin stock el botón se deshabilita', () => {
    renderizar(<Producto {...productoEjemplo} stock={0} onAgregar={() => {}} />);
    expect(screen.getByRole('button', { name: 'Sin stock' }).disabled).toBeTrue();
  });

  // Si la imagen falla, debe salir el texto de reemplazo
  it('estado interno: si la imagen falla se muestra el reemplazo', () => {
    renderizar(<Producto {...productoEjemplo} onAgregar={() => {}} />);
    // Simula que la imagen no pudo cargar
    fireEvent.error(screen.getByRole('img', { name: 'Alimento Perro' }));
    expect(screen.getByText('Imagen no disponible')).toBeTruthy();
  });
});

// Pruebas de la lista de productos
describe('Componente ListaProductos', () => {
  afterEach(cleanup);

  // Con 3 productos deben salir 3 tarjetas
  it('renderiza una tarjeta por cada producto del conjunto de datos', () => {
    // Tres productos basados en el de ejemplo
    const datos = [
      productoEjemplo,
      { ...productoEjemplo, id: 2, nombre: 'Snacks' },
      { ...productoEjemplo, id: 3, nombre: 'Juguete' },
    ];
    renderizar(<ListaProductos productos={datos} onAgregar={() => {}} />);
    expect(screen.getAllByRole('article')).toHaveSize(3);
  });

  // Lista vacía muestra aviso y ninguna tarjeta
  it('muestra un mensaje cuando no hay productos', () => {
    renderizar(<ListaProductos productos={[]} onAgregar={() => {}} />);
    expect(screen.getByText('No hay productos para mostrar.')).toBeTruthy();
    expect(screen.queryAllByRole('article')).toHaveSize(0);
  });
});
