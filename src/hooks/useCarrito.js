import { useContext } from 'react';
import { CarritoContext } from '../context/contextos';

/** Acceso al carrito: { items, total, cantidadTotal, agregar, cambiarCantidad, quitar, vaciar }. */
export default function useCarrito() {
  return useContext(CarritoContext);
}
