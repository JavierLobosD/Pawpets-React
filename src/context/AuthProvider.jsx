// useState: hook de React para guardar datos que cambian (estado)
import { useState } from 'react';
// db: base de datos simulada, se usa para crear usuarios nuevos
import db from '../data/db';
// useColeccion: hook propio que entrega una colección de db y se actualiza sola
import useColeccion from '../hooks/useColeccion';
// AuthContext: el contexto que este Provider llena con datos
import { AuthContext } from './contextos';

// Nombre con que se guarda la sesión en localStorage
const CLAVE_SESION = 'pawpets:sesion';

/** Comparte con toda la app quién tiene la sesión iniciada. */
// Prop: children = toda la app que va adentro
// Un Provider es un componente que "envuelve" a otros y les entrega datos por contexto
export function AuthProvider({ children }) {
  // Lista de todos los usuarios
  // Si un usuario se edita en el admin, esta lista se actualiza sola
  const usuarios = useColeccion('usuarios');
  // Id del usuario conectado; lo lee de localStorage al partir
  // Se pasa una función a useState para que lea localStorage solo la primera vez
  // Number('') da 0, y 0 || null da null: así sin sesión guardada queda null
  const [usuarioId, setUsuarioId] = useState(
    () => Number(localStorage.getItem(CLAVE_SESION)) || null,
  );
  // El usuario se deriva de la colección: si se edita en Admin, la sesión se actualiza sola.
  // Si no lo encuentra (o no hay sesión), ?? null deja usuario en null
  const usuario = usuarios.find((u) => u.id === usuarioId) ?? null;

  // Guarda la sesión para que no se pierda al recargar
  function abrirSesion(id) {
    // Guarda el id en el navegador
    localStorage.setItem(CLAVE_SESION, id);
    // Cambia el estado: React redibuja y todos ven al usuario conectado
    setUsuarioId(id);
  }

  /** Devuelve el usuario si las credenciales son correctas; si no, null. */
  function iniciarSesion(correo, clave) {
    // Busca el correo sin importar mayúsculas, y compara la clave
    const encontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.clave === clave,
    );
    // Si lo encontró, deja la sesión abierta
    if (encontrado) abrirSesion(encontrado.id);
    // Devuelve el usuario, o null si no lo encontró
    return encontrado ?? null;
  }

  /** Crea un cliente nuevo y abre su sesión. Devuelve null si el correo ya existe. */
  function registrar(datos) {
    // Revisa si ya hay alguien con ese correo
    // some() devuelve true si al menos un usuario cumple
    const existe = usuarios.some(
      (u) => u.correo.toLowerCase() === datos.correo.trim().toLowerCase(),
    );
    // Si el correo ya está usado, no crea nada
    if (existe) return null;
    // Guarda el usuario nuevo siempre como cliente
    // ...datos copia lo que llegó del formulario; después se corrige correo y rol
    const nuevo = db.crear('usuarios', {
      ...datos,
      correo: datos.correo.trim(),
      rol: 'cliente',
    });
    // Lo deja conectado altiro
    abrirSesion(nuevo.id);
    // Devuelve el usuario creado (ya con su id)
    return nuevo;
  }

  // Borra la sesión guardada y deja sin usuario
  function cerrarSesion() {
    // Quita el id guardado en el navegador
    localStorage.removeItem(CLAVE_SESION);
    // Sin id, usuario queda en null y la app vuelve a modo visitante
    setUsuarioId(null);
  }

  // Lo que se dibuja: el Provider con los datos y, adentro, toda la app
  return (
    // Comparte el usuario y las funciones con toda la app
    // value es lo que reciben los componentes al usar useAuth()
    <AuthContext.Provider value={{ usuario, iniciarSesion, registrar, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}
