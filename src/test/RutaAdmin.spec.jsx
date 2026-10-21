import { cleanup, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import RutaAdmin from '../components/RutaAdmin';
import { renderizar } from './ayudas';

// Pruebas de la protección de las rutas del admin
describe('RutaAdmin (protección del panel)', () => {
  // Limpia la pantalla después de cada prueba
  afterEach(cleanup);

  // Rutas de prueba: un login y un panel protegido
  const rutas = (
    <Routes>
      <Route path="/login" element={<p>Pantalla login</p>} />
      <Route path="/admin" element={<RutaAdmin />}>
        <Route index element={<p>Panel secreto</p>} />
      </Route>
    </Routes>
  );

  // Un cliente que entra a /admin termina en el login
  it('un cliente es redirigido al login', () => {
    renderizar(rutas, { ruta: '/admin', auth: { usuario: { rol: 'cliente' } } });
    expect(screen.getByText('Pantalla login')).toBeTruthy();
    expect(screen.queryByText('Panel secreto')).toBeNull();
  });

  // Un admin sí puede ver el panel
  it('un administrador accede al panel', () => {
    renderizar(rutas, { ruta: '/admin', auth: { usuario: { rol: 'admin' } } });
    expect(screen.getByText('Panel secreto')).toBeTruthy();
  });
});
