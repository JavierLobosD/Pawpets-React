import { useState } from 'react';
import db from '../data/db';
import useColeccion from '../hooks/useColeccion';
import { AuthContext } from './contextos';

// Nombre con que se guarda la sesión en localStorage
const CLAVE_SESION = 'pawpets:sesion';

/** Comparte con toda la app quién tiene la sesión iniciada. */
// Prop: children = toda la app que va adentro
export function AuthProvider({ children }) {
  // Lista de todos los usuarios
  const usuarios = useColeccion('usuarios');
  // Id del usuario conectado; lo lee de localStorage al partir
  const [usuarioId, setUsuarioId] = useState(
    () => Number(localStorage.getItem(CLAVE_SESION)) || null,
  );
  // El usuario se deriva de la colección: si se edita en Admin, la sesión se actualiza sola.
  const usuario = usuarios.find((u) => u.id === usuarioId) ?? null;

  // Guarda la sesión para que no se pierda al recargar
  function abrirSesion(id) {
    localStorage.setItem(CLAVE_SESION, id);
    setUsuarioId(id);
  }

  /** Devuelve el usuario si las credenciales son correctas; si no, null. */
  function iniciarSesion(correo, clave) {
    // Busca el correo sin importar mayúsculas, y compara la clave
    const encontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.clave === clave,
    );
    if (encontrado) abrirSesion(encontrado.id);
    return encontrado ?? null;
  }

  /** Crea un cliente nuevo y abre su sesión. Devuelve null si el correo ya existe. */
  function registrar(datos) {
    // Revisa si ya hay alguien con ese correo
    const existe = usuarios.some(
      (u) => u.correo.toLowerCase() === datos.correo.trim().toLowerCase(),
    );
    if (existe) return null;
    // Guarda el usuario nuevo siempre como cliente
    const nuevo = db.crear('usuarios', {
      ...datos,
      correo: datos.correo.trim(),
      rol: 'cliente',
    });
    // Lo deja conectado altiro
    abrirSesion(nuevo.id);
    return nuevo;
  }

  // Borra la sesión guardada y deja sin usuario
  function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
    setUsuarioId(null);
  }

  return (
    // Comparte el usuario y las funciones con toda la app
    <AuthContext.Provider value={{ usuario, iniciarSesion, registrar, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}
