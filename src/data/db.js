/**
 * Fuente de datos simulada (reemplaza a una base de datos real).
 * - CRUD genérico sobre colecciones: listar, obtener, crear, actualizar, eliminar.
 * - Persiste en localStorage: los cambios sobreviven a recargar la página.
 * - Avisa a los suscriptores (hook useColeccion) para que React actualice la interfaz.
 */
import * as seed from './seed';

// Nombres de las colecciones que se pueden usar
const COLECCIONES = ['categorias', 'productos', 'usuarios', 'ordenes', 'blogs'];
// Prefijo para los nombres guardados en localStorage
const PREFIJO = 'pawpets:';
// Funciones que hay que avisar cuando cambian los datos
const suscriptores = new Set();
// Copia en memoria: evita parsear JSON en cada lectura y entrega una referencia estable.
const cache = {};

// Lee una colección de localStorage, o usa los datos iniciales
function cargar(coleccion) {
  const guardado = localStorage.getItem(PREFIJO + coleccion);
  return guardado ? JSON.parse(guardado) : (seed[coleccion] ?? []);
}

// Guarda en memoria y en localStorage, y avisa a todos
function guardar(coleccion, datos) {
  cache[coleccion] = datos;
  localStorage.setItem(PREFIJO + coleccion, JSON.stringify(datos));
  suscriptores.forEach((avisar) => avisar());
}

const db = {
  // READ
  // Devuelve todos los elementos de una colección
  listar(coleccion) {
    // Da error si el nombre de la colección no existe
    if (!COLECCIONES.includes(coleccion))
      throw new Error(`Colección desconocida: ${coleccion}`);
    // Solo la carga la primera vez, después usa la copia
    cache[coleccion] ??= cargar(coleccion);
    return cache[coleccion];
  },

  // Busca un elemento por su id
  obtener(coleccion, id) {
    return this.listar(coleccion).find((item) => item.id === Number(id));
  },

  // CREATE
  // Agrega un elemento nuevo y lo devuelve con su id
  crear(coleccion, datos) {
    const items = this.listar(coleccion);
    // El id nuevo es el más alto más uno
    const id = items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    const nuevo = { ...datos, id };
    guardar(coleccion, [...items, nuevo]);
    return nuevo;
  },

  // UPDATE
  // Cambia solo los campos indicados del elemento con ese id
  actualizar(coleccion, id, cambios) {
    guardar(
      coleccion,
      this.listar(coleccion).map((item) =>
        item.id === Number(id) ? { ...item, ...cambios } : item,
      ),
    );
  },

  // DELETE
  // Saca de la lista el elemento con ese id
  eliminar(coleccion, id) {
    guardar(
      coleccion,
      this.listar(coleccion).filter((item) => item.id !== Number(id)),
    );
  },

  /** Permite que un componente se entere de los cambios; devuelve la función para cancelar. */
  suscribir(avisar) {
    suscriptores.add(avisar);
    return () => suscriptores.delete(avisar);
  },

  /** Borra lo guardado y vuelve a los datos iniciales (pruebas y demostraciones). */
  reiniciar() {
    // Borra cada colección de localStorage y de la memoria
    COLECCIONES.forEach((coleccion) => {
      localStorage.removeItem(PREFIJO + coleccion);
      delete cache[coleccion];
    });
    // Avisa para que la pantalla se actualice
    suscriptores.forEach((avisar) => avisar());
  },
};

export default db;
