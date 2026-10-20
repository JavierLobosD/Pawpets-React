import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext, CarritoContext } from '../context/contextos';

/** Producto de ejemplo para las pruebas. */
export const productoEjemplo = {
  id: 1,
  nombre: 'Alimento Perro',
  categoriaId: 1,
  precio: 10000,
  precioOferta: 0,
  stock: 10,
  imagen: 'https://ejemplo.cl/foto.jpg',
  descripcion: 'Descripción',
};

/** Renderiza dentro de un router en memoria y, opcionalmente, con contextos simulados (mocks). */
export function renderizar(ui, { ruta = '/', auth, carrito } = {}) {
  let arbol = <MemoryRouter initialEntries={[ruta]}>{ui}</MemoryRouter>;
  if (carrito)
    arbol = <CarritoContext.Provider value={carrito}>{arbol}</CarritoContext.Provider>;
  if (auth) arbol = <AuthContext.Provider value={auth}>{arbol}</AuthContext.Provider>;
  return render(arbol);
}
