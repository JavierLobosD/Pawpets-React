/**
 * Fuente de datos simulada (reemplaza a una base de datos real).
 * - CRUD genérico sobre colecciones: listar, obtener, crear, actualizar, eliminar.
 * - Persiste en localStorage: los cambios sobreviven a recargar la página.
 * - Avisa a los suscriptores (hook useColeccion) para que React actualice la interfaz.
 */
import * as seed from './seed';

const COLECCIONES = ['categorias', 'productos', 'usuarios', 'ordenes', 'blogs'];
const PREFIJO = 'pawpets:';
const suscriptores = new Set();
// Copia en memoria: evita parsear JSON en cada lectura y entrega una referencia estable.
const cache = {};

function cargar(coleccion) {
  const guardado = localStorage.getItem(PREFIJO + coleccion);
  return guardado ? JSON.parse(guardado) : (seed[coleccion] ?? []);
}

function guardar(coleccion, datos) {
  cache[coleccion] = datos;
  localStorage.setItem(PREFIJO + coleccion, JSON.stringify(datos));
  suscriptores.forEach((avisar) => avisar());
}

const db = {
  // READ
  listar(coleccion) {
    if (!COLECCIONES.includes(coleccion))
      throw new Error(`Colección desconocida: ${coleccion}`);
    cache[coleccion] ??= cargar(coleccion);
    return cache[coleccion];
  },

  obtener(coleccion, id) {
    return this.listar(coleccion).find((item) => item.id === Number(id));
  },

  // CREATE
  crear(coleccion, datos) {
    const items = this.listar(coleccion);
    const id = items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    const nuevo = { ...datos, id };
    guardar(coleccion, [...items, nuevo]);
    return nuevo;
  },

  // UPDATE
  actualizar(coleccion, id, cambios) {
    guardar(
      coleccion,
      this.listar(coleccion).map((item) =>
        item.id === Number(id) ? { ...item, ...cambios } : item,
      ),
    );
  },

  // DELETE
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
    COLECCIONES.forEach((coleccion) => {
      localStorage.removeItem(PREFIJO + coleccion);
      delete cache[coleccion];
    });
    suscriptores.forEach((avisar) => avisar());
  },
};

export default db;
