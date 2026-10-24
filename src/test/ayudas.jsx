// Este archivo no es una prueba: tiene datos y funciones de apoyo que usan los .spec.jsx
// render: función de Testing Library que dibuja un componente en una página de prueba
import { render } from '@testing-library/react';
// MemoryRouter: router que guarda la URL en memoria (sirve en pruebas, sin navegador real)
import { MemoryRouter } from 'react-router-dom';
// Los contextos reales, para poder entregarles valores falsos
import { AuthContext, CarritoContext } from '../context/contextos';

/** Producto de ejemplo para las pruebas. */
// Datos inventados con la misma forma que un producto real (precio $10.000, sin oferta)
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
// ui = el componente a probar, por ejemplo <Header />
export function renderizar(ui, { ruta = '/', auth, carrito } = {}) {
  // Siempre envuelve en un router para que funcionen los links
  // initialEntries dice en qué URL parte la prueba
  let arbol = <MemoryRouter initialEntries={[ruta]}>{ui}</MemoryRouter>;
  // Si se pasa carrito, lo agrega como contexto
  // Así el componente cree que hay un carrito, sin usar el CarritoProvider real
  if (carrito)
    arbol = <CarritoContext.Provider value={carrito}>{arbol}</CarritoContext.Provider>;
  // Si se pasa sesión, la agrega como contexto
  // Así el componente cree que hay una sesión, sin usar el AuthProvider real
  if (auth) arbol = <AuthContext.Provider value={auth}>{arbol}</AuthContext.Provider>;
  // Dibuja todo y devuelve las herramientas de Testing Library
  return render(arbol);
}
