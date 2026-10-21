import { useSyncExternalStore } from 'react';
import db from '../data/db';

/** Devuelve una colección y re-renderiza el componente cuando db la modifica. */
// Parámetro: coleccion = nombre, por ejemplo 'productos' o 'usuarios'
export default function useColeccion(coleccion) {
  // Escucha a db y relee la colección cuando cambia
  return useSyncExternalStore(db.suscribir, () => db.listar(coleccion));
}
