import { useState } from 'react';
import db from '../data/db';
import useColeccion from '../hooks/useColeccion';
import { AuthContext } from './contextos';

const CLAVE_SESION = 'pawpets:sesion';

/** Comparte con toda la app quién tiene la sesión iniciada. */
export function AuthProvider({ children }) {
  const usuarios = useColeccion('usuarios');
  const [usuarioId, setUsuarioId] = useState(
    () => Number(localStorage.getItem(CLAVE_SESION)) || null,
  );
  // El usuario se deriva de la colección: si se edita en Admin, la sesión se actualiza sola.
  const usuario = usuarios.find((u) => u.id === usuarioId) ?? null;

  function abrirSesion(id) {
    localStorage.setItem(CLAVE_SESION, id);
    setUsuarioId(id);
  }

  /** Devuelve el usuario si las credenciales son correctas; si no, null. */
  function iniciarSesion(correo, clave) {
    const encontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.clave === clave,
    );
    if (encontrado) abrirSesion(encontrado.id);
    return encontrado ?? null;
  }

  /** Crea un cliente nuevo y abre su sesión. Devuelve null si el correo ya existe. */
  function registrar(datos) {
    const existe = usuarios.some(
      (u) => u.correo.toLowerCase() === datos.correo.trim().toLowerCase(),
    );
    if (existe) return null;
    const nuevo = db.crear('usuarios', {
      ...datos,
      correo: datos.correo.trim(),
      rol: 'cliente',
    });
    abrirSesion(nuevo.id);
    return nuevo;
  }

  function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
    setUsuarioId(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, registrar, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}
