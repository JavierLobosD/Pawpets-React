// De Testing Library: cleanup (limpia), fireEvent (simula acciones) y screen (busca en pantalla)
import { cleanup, fireEvent, screen } from '@testing-library/react';
// Los dos componentes que se prueban en este archivo
import ListaProductos from '../components/ListaProductos';
import Producto from '../components/Producto';
// Producto de ejemplo y función para dibujar dentro de un router
import { productoEjemplo, renderizar } from './ayudas';
// enOferta: función que dice si un producto tiene oferta
import { enOferta } from '../utils/productos';

// Pruebas de la tarjeta de producto
describe('Componente Producto', () => {
  // Limpia la pantalla después de cada prueba
  afterEach(cleanup);

  //Con precioOferta mayor a 0 esta en oferta; con 0, no
  it('enOferta es true solo si hay precio de oferta', () => {
    //Con oferta (8000)
    // {...productoEjemplo, precioOferta: 8000} = copia del ejemplo con otra oferta
    expect(enOferta({...productoEjemplo, precioOferta: 8000})).toBeTrue();
    //Sin oferta (0)
    expect(enOferta(productoEjemplo)).toBeFalse();
  })

  // Debe mostrar el nombre y el precio con formato
  it('renderiza el nombre y el precio formateado recibidos por props', () => {
    // {...productoEjemplo} pasa cada dato como prop; onAgregar es una función vacía
    renderizar(<Producto {...productoEjemplo} onAgregar={() => {}} />);
    // Comprueba que el nombre está como título (heading)
    expect(screen.getByRole('heading', { name: 'Alimento Perro' })).toBeTruthy();
    // Comprueba que el precio 10000 sale como $10.000
    expect(screen.getByText('$10.000')).toBeTruthy();
  });

  // Con oferta deben verse los dos precios
  it('renderizado condicional: muestra el precio original tachado solo si hay oferta', () => {
    renderizar(
      <Producto {...productoEjemplo} precioOferta={8000} onAgregar={() => {}} />,
    );
    // Comprueba que están el precio normal (tachado) y el de oferta
    expect(screen.getByText('$10.000')).toBeTruthy();
    expect(screen.getByText('$8.000')).toBeTruthy();
  });

  // El botón debe llamar a onAgregar con el id
  it('el botón ejecuta onAgregar con el id del producto (evento + mock)', () => {
    // Espía que reemplaza la función real de agregar al carrito
    const onAgregar = jasmine.createSpy('onAgregar');
    renderizar(<Producto {...productoEjemplo} onAgregar={onAgregar} />);
    // Simula el clic en el botón
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));
    // Comprueba que se llamó una sola vez y con el id 1
    expect(onAgregar).toHaveBeenCalledOnceWith(1);
  });

  // Con stock 0 el botón no se puede apretar
  it('sin stock el botón se deshabilita', () => {
    renderizar(<Producto {...productoEjemplo} stock={0} onAgregar={() => {}} />);
    // Comprueba que el botón dice "Sin stock" y está desactivado
    expect(screen.getByRole('button', { name: 'Sin stock' }).disabled).toBeTrue();
  });

  // Si la imagen falla, debe salir el texto de reemplazo
  it('estado interno: si la imagen falla se muestra el reemplazo', () => {
    renderizar(<Producto {...productoEjemplo} onAgregar={() => {}} />);
    // Simula que la imagen no pudo cargar
    // Eso dispara onError, que cambia el estado imagenFallo a true
    fireEvent.error(screen.getByRole('img', { name: 'Alimento Perro' }));
    // Comprueba que ahora se ve el cuadro de reemplazo
    expect(screen.getByText('Imagen no disponible')).toBeTruthy();
  });
});

// Pruebas de la lista de productos
describe('Componente ListaProductos', () => {
  // Limpia la pantalla después de cada prueba
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
    // Cada tarjeta es un <article>; comprueba que hay 3
    expect(screen.getAllByRole('article')).toHaveSize(3);
  });

  // Lista vacía muestra aviso y ninguna tarjeta
  it('muestra un mensaje cuando no hay productos', () => {
    renderizar(<ListaProductos productos={[]} onAgregar={() => {}} />);
    // Comprueba que sale el aviso
    expect(screen.getByText('No hay productos para mostrar.')).toBeTruthy();
    // Comprueba que no hay tarjetas (queryAll devuelve lista vacía en vez de dar error)
    expect(screen.queryAllByRole('article')).toHaveSize(0);
  });
});
