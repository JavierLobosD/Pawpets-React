// useSyncExternalStore: hook de React para leer datos que viven fuera de React
import { useSyncExternalStore } from 'react';
// db: nuestra base de datos simulada (data/db.js)
import db from '../data/db';

/** Devuelve una colección y re-renderiza el componente cuando db la modifica. */
// Parámetro: coleccion = nombre, por ejemplo 'productos' o 'usuarios'
// Hook propio: así cualquier componente puede escribir useColeccion('productos')
export default function useColeccion(coleccion) {
  // Escucha a db y relee la colección cuando cambia
  // 1er argumento (db.suscribir): React se anota para que db le avise de los cambios
  // 2do argumento: función que React llama para obtener los datos actuales
  // Cuando db avisa y la lista es distinta, React vuelve a dibujar el componente
  return useSyncExternalStore(db.suscribir, () => db.listar(coleccion));
}
