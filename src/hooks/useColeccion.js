import { useSyncExternalStore } from 'react';
import db from '../data/db';

/** Devuelve una colección y re-renderiza el componente cuando db la modifica. */
export default function useColeccion(coleccion) {
  return useSyncExternalStore(db.suscribir, () => db.listar(coleccion));
}
