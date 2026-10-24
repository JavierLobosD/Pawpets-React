// De Testing Library: act (espera a que React termine de actualizar),
// cleanup (limpia lo dibujado) y renderHook (prueba un hook sin dibujar pantalla)
import { act, cleanup, renderHook } from '@testing-library/react';
// El provider real de la sesión, que es lo que se prueba
import { AuthProvider } from '../context/AuthProvider';
// db real, para leer usuarios y reiniciar los datos
import db from '../data/db';
// useAuth: hook que entrega lo que comparte el AuthProvider
import useAuth from '../hooks/useAuth';

// Pruebas de la sesión real, usando los datos de db
// describe agrupa las pruebas; cada it es una prueba
describe('AuthProvider (sesión del usuario)', () => {
  // Antes de cada prueba parte con todo limpio
  beforeEach(() => {
    localStorage.clear();
    // Vuelve a los datos de seed.js
    db.reiniciar();
  });
  // Después de cada prueba deja todo como estaba
  afterEach(() => {
    cleanup();
    localStorage.clear();
    db.reiniciar();
  });

  // Monta el hook useAuth dentro del AuthProvider
  // wrapper = componente que envuelve al hook (aquí, el provider real)
  const montar = () => renderHook(() => useAuth(), { wrapper: AuthProvider });

  // Un correo repetido no crea cuenta ni abre sesión
  it('registrar con un correo repetido devuelve null', () => {
    // result.current tiene lo que devuelve useAuth en este momento
    const { result } = montar();
    // Usa el correo de un usuario que ya existe, en mayúsculas
    // Así también se prueba que no importen las mayúsculas
    const repetido = db.obtener('usuarios', 1).correo.toUpperCase();
    let respuesta;
    // act asegura que React procese el cambio antes de revisar
    act(() => {
      respuesta = result.current.registrar({ nombre: 'Otra', correo: repetido, clave: '123456' });
    });
    // Comprueba que registrar devolvió null (no creó la cuenta)
    expect(respuesta).toBeNull();
    // Comprueba que no quedó nadie con la sesión abierta
    expect(result.current.usuario).toBeNull();
  });
});
