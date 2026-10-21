import { act, cleanup, renderHook } from '@testing-library/react';
import { AuthProvider } from '../context/AuthProvider';
import db from '../data/db';
import useAuth from '../hooks/useAuth';

// Pruebas de la sesión real, usando los datos de db
describe('AuthProvider (sesión del usuario)', () => {
  // Antes de cada prueba parte con todo limpio
  beforeEach(() => {
    localStorage.clear();
    db.reiniciar();
  });
  // Después de cada prueba deja todo como estaba
  afterEach(() => {
    cleanup();
    localStorage.clear();
    db.reiniciar();
  });

  // Monta el hook useAuth dentro del AuthProvider
  const montar = () => renderHook(() => useAuth(), { wrapper: AuthProvider });

  // Un correo repetido no crea cuenta ni abre sesión
  it('registrar con un correo repetido devuelve null', () => {
    const { result } = montar();
    // Usa el correo de un usuario que ya existe, en mayúsculas
    const repetido = db.obtener('usuarios', 1).correo.toUpperCase();
    let respuesta;
    act(() => {
      respuesta = result.current.registrar({ nombre: 'Otra', correo: repetido, clave: '123456' });
    });
    expect(respuesta).toBeNull();
    expect(result.current.usuario).toBeNull();
  });
});
