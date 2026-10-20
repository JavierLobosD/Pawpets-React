import { cleanup, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import RutaAdmin from '../components/RutaAdmin';
import { renderizar } from './ayudas';

describe('RutaAdmin (protección del panel)', () => {
  afterEach(cleanup);

  const rutas = (
    <Routes>
      <Route path="/login" element={<p>Pantalla login</p>} />
      <Route path="/admin" element={<RutaAdmin />}>
        <Route index element={<p>Panel secreto</p>} />
      </Route>
    </Routes>
  );

  it('un cliente es redirigido al login', () => {
    renderizar(rutas, { ruta: '/admin', auth: { usuario: { rol: 'cliente' } } });
    expect(screen.getByText('Pantalla login')).toBeTruthy();
    expect(screen.queryByText('Panel secreto')).toBeNull();
  });

  it('un administrador accede al panel', () => {
    renderizar(rutas, { ruta: '/admin', auth: { usuario: { rol: 'admin' } } });
    expect(screen.getByText('Panel secreto')).toBeTruthy();
  });
});
