/**
 * Fuente de datos simulada (reemplaza a una base de datos real).
 * - CRUD genérico sobre colecciones: listar, obtener, crear, actualizar, eliminar.
 * - Persiste en localStorage: los cambios sobreviven a recargar la página.
 * - Avisa a los suscriptores (hook useColeccion) para que React actualice la interfaz.
 */
// seed: todos los datos iniciales (categorias, productos, usuarios, ordenes, blogs)
// "* as seed" junta todo lo exportado por seed.js en un solo objeto
import * as seed from './seed';

// Nombres de las colecciones que se pueden usar
const COLECCIONES = ['categorias', 'productos', 'usuarios', 'ordenes', 'blogs'];
// Prefijo para los nombres guardados en localStorage
// Ejemplo: los productos se guardan como 'pawpets:productos'
const PREFIJO = 'pawpets:';
// Funciones que hay que avisar cuando cambian los datos
// Set es una lista que no repite elementos
const suscriptores = new Set();
// Copia en memoria: evita parsear JSON en cada lectura y entrega una referencia estable.
// Referencia estable = la misma lista mientras no cambie; React la necesita para no redibujar de más
const cache = {};

// Lee una colección de localStorage, o usa los datos iniciales
function cargar(coleccion) {
  // Lo guardado viene como texto, o null si nunca se guardó
  const guardado = localStorage.getItem(PREFIJO + coleccion);
  // Si hay algo guardado lo convierte a lista; si no, usa seed (o [] si no existe)
  return guardado ? JSON.parse(guardado) : (seed[coleccion] ?? []);
}

// Guarda en memoria y en localStorage, y avisa a todos
function guardar(coleccion, datos) {
  // Reemplaza la copia en memoria por la lista nueva
  cache[coleccion] = datos;
  // localStorage solo guarda texto, por eso se usa JSON.stringify
  localStorage.setItem(PREFIJO + coleccion, JSON.stringify(datos));
  // Llama a cada suscriptor para que la pantalla se actualice
  suscriptores.forEach((avisar) => avisar());
}

// Objeto con todas las operaciones que usa el resto de la app
const db = {
  // READ
  // Devuelve todos los elementos de una colección
  listar(coleccion) {
    // Da error si el nombre de la colección no existe
    if (!COLECCIONES.includes(coleccion))
      throw new Error(`Colección desconocida: ${coleccion}`);
    // Solo la carga la primera vez, después usa la copia
    // ??= asigna solo si cache[coleccion] todavía no tiene nada
    cache[coleccion] ??= cargar(coleccion);
    return cache[coleccion];
  },

  // Busca un elemento por su id
  // Number(id) porque el id puede venir como texto desde la URL
  obtener(coleccion, id) {
    return this.listar(coleccion).find((item) => item.id === Number(id));
  },

  // CREATE
  // Agrega un elemento nuevo y lo devuelve con su id
  crear(coleccion, datos) {
    // Lista actual de esa colección
    const items = this.listar(coleccion);
    // El id nuevo es el más alto más uno
    // reduce recorre la lista guardando el id más alto (parte en 0)
    const id = items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    // Copia los datos y le agrega el id
    const nuevo = { ...datos, id };
    // Guarda una lista nueva con el elemento al final (no modifica la anterior)
    guardar(coleccion, [...items, nuevo]);
    return nuevo;
  },

  // UPDATE
  // Cambia solo los campos indicados del elemento con ese id
  actualizar(coleccion, id, cambios) {
    guardar(
      coleccion,
      // map arma una lista nueva: al elemento con ese id le mezcla los cambios
      // { ...item, ...cambios } = copia del elemento con los campos cambiados encima
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
      // filter deja todos los elementos menos el que tiene ese id
      this.listar(coleccion).filter((item) => item.id !== Number(id)),
    );
  },

  /** Permite que un componente se entere de los cambios; devuelve la función para cancelar. */
  // React (useSyncExternalStore en useColeccion) llama a esta función
  suscribir(avisar) {
    // Anota la función para llamarla en cada cambio
    suscriptores.add(avisar);
    // Devuelve una función que la borra (React la usa al quitar el componente)
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

// Se exporta para usarlo en hooks, providers, páginas y pruebas
export default db;
