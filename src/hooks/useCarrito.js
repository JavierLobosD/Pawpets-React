// useContext: hook de React para leer un contexto
import { useContext } from 'react';
// CarritoContext: el contexto del carrito, creado en context/contextos.js
import { CarritoContext } from '../context/contextos';

/** Acceso al carrito: { items, total, cantidadTotal, agregar, cambiarCantidad, quitar, vaciar }. */
// Hook propio: un atajo para que los componentes escriban useCarrito()
// en vez de useContext(CarritoContext) en cada archivo
export default function useCarrito() {
  // Lee lo que comparte el CarritoProvider
  // Solo funciona en componentes que estén dentro de <CarritoProvider>
  return useContext(CarritoContext);
}
