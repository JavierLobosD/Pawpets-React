// De Testing Library: cleanup (limpia) y screen (busca en pantalla)
import { cleanup, screen } from '@testing-library/react';
// Routes y Route para armar un mapa de rutas pequeño solo para la prueba
import { Route, Routes } from 'react-router-dom';
// El componente que se prueba
import RutaAdmin from '../components/RutaAdmin';
// Función para dibujar con router y contextos falsos
import { renderizar } from './ayudas';

// Pruebas de la protección de las rutas del admin
describe('RutaAdmin (protección del panel)', () => {
  // Limpia la pantalla después de cada prueba
  afterEach(cleanup);

  // Rutas de prueba: un login y un panel protegido
  // Se usan textos simples en vez de las páginas reales
  const rutas = (
    <Routes>
      {/* Si RutaAdmin redirige, se verá este texto */}
      <Route path="/login" element={<p>Pantalla login</p>} />
      {/* /admin protegido por RutaAdmin; su hija se ve solo si pasa */}
      <Route path="/admin" element={<RutaAdmin />}>
        <Route index element={<p>Panel secreto</p>} />
      </Route>
    </Routes>
  );

  // Un cliente que entra a /admin termina en el login
  it('un cliente es redirigido al login', () => {
    // Parte en /admin con una sesión falsa de rol cliente
    renderizar(rutas, { ruta: '/admin', auth: { usuario: { rol: 'cliente' } } });
    // Comprueba que terminó en el login
    expect(screen.getByText('Pantalla login')).toBeTruthy();
    // Comprueba que no se ve el panel
    expect(screen.queryByText('Panel secreto')).toBeNull();
  });

  // Un admin sí puede ver el panel
  it('un administrador accede al panel', () => {
    // Parte en /admin con una sesión falsa de rol admin
    renderizar(rutas, { ruta: '/admin', auth: { usuario: { rol: 'admin' } } });
    // Comprueba que se ve el contenido protegido
    expect(screen.getByText('Panel secreto')).toBeTruthy();
  });
});
