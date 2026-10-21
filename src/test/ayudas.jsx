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
// Opciones: ruta inicial, sesión falsa y carrito falso
export function renderizar(ui, { ruta = '/', auth, carrito } = {}) {
  // Siempre envuelve en un router para que funcionen los links
  let arbol = <MemoryRouter initialEntries={[ruta]}>{ui}</MemoryRouter>;
  // Si se pasa carrito, lo agrega como contexto
  if (carrito)
    arbol = <CarritoContext.Provider value={carrito}>{arbol}</CarritoContext.Provider>;
  // Si se pasa sesión, la agrega como contexto
  if (auth) arbol = <AuthContext.Provider value={auth}>{arbol}</AuthContext.Provider>;
  return render(arbol);
}
