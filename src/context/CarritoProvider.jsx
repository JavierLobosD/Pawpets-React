import { useEffect, useState } from 'react';
import useColeccion from '../hooks/useColeccion';
import { precioFinal } from '../utils/productos';
import { CarritoContext } from './contextos';

const CLAVE_CARRITO = 'pawpets:carrito';

/**
 * Carrito de compras compartido. Guarda solo { id, cantidad } y calcula el resto
 * desde los productos, así un cambio de precio en Admin se refleja en el carrito.
 */
export function CarritoProvider({ children }) {
  const productos = useColeccion('productos');
  const [lineas, setLineas] = useState(() =>
    JSON.parse(localStorage.getItem(CLAVE_CARRITO) ?? '[]'),
  );

  // Cada cambio del carrito se guarda para que sobreviva a recargar la página.
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(lineas));
  }, [lineas]);

  const items = lineas.flatMap(({ id, cantidad }) => {
    const producto = productos.find((p) => p.id === id);
    return producto
      ? [{ producto, cantidad, subtotal: precioFinal(producto) * cantidad }]
      : [];
  });
  const total = items.reduce((suma, item) => suma + item.subtotal, 0);
  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0);

  // La cantidad nunca baja de 1 ni supera el stock disponible.
  const limitar = (id, cantidad) => {
    const stock = productos.find((p) => p.id === id)?.stock ?? cantidad;
    return Math.min(Math.max(1, cantidad), stock);
  };

  function agregar(id, cantidad = 1) {
    setLineas((actuales) =>
      actuales.some((l) => l.id === id)
        ? actuales.map((l) =>
            l.id === id ? { ...l, cantidad: limitar(id, l.cantidad + cantidad) } : l,
          )
        : [...actuales, { id, cantidad: limitar(id, cantidad) }],
    );
  }

  function cambiarCantidad(id, cantidad) {
    setLineas((actuales) =>
      actuales.map((l) => (l.id === id ? { ...l, cantidad: limitar(id, cantidad) } : l)),
    );
  }

  const quitar = (id) => setLineas((actuales) => actuales.filter((l) => l.id !== id));
  const vaciar = () => setLineas([]);

  return (
    <CarritoContext.Provider
      value={{ items, total, cantidadTotal, agregar, cambiarCantidad, quitar, vaciar }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
