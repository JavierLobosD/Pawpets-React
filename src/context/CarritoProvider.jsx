import { useEffect, useState } from 'react';
import useColeccion from '../hooks/useColeccion';
import { precioFinal } from '../utils/productos';
import { CarritoContext } from './contextos';

// Nombre con que se guarda el carrito en localStorage
const CLAVE_CARRITO = 'pawpets:carrito';

/**
 * Carrito de compras compartido. Guarda solo { id, cantidad } y calcula el resto
 * desde los productos, así un cambio de precio en Admin se refleja en el carrito.
 */
// Prop: children = toda la app que va adentro
export function CarritoProvider({ children }) {
  // Lista de todos los productos
  const productos = useColeccion('productos');
  // Líneas del carrito; parte con lo guardado o vacío
  const [lineas, setLineas] = useState(() =>
    JSON.parse(localStorage.getItem(CLAVE_CARRITO) ?? '[]'),
  );

  // Cada cambio del carrito se guarda para que sobreviva a recargar la página.
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(lineas));
  }, [lineas]);

  // Junta cada línea con su producto y calcula el subtotal
  const items = lineas.flatMap(({ id, cantidad }) => {
    const producto = productos.find((p) => p.id === id);
    // Si el producto ya no existe, se salta
    return producto
      ? [{ producto, cantidad, subtotal: precioFinal(producto) * cantidad }]
      : [];
  });
  // Suma de todos los subtotales
  const total = items.reduce((suma, item) => suma + item.subtotal, 0);
  // Cantidad total de unidades en el carrito
  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0);

  // La cantidad nunca baja de 1 ni supera el stock disponible.
  const limitar = (id, cantidad) => {
    const stock = productos.find((p) => p.id === id)?.stock ?? cantidad;
    return Math.min(Math.max(1, cantidad), stock);
  };

  // Agrega un producto; si ya estaba, le suma la cantidad
  function agregar(id, cantidad = 1) {
    setLineas((actuales) =>
      actuales.some((l) => l.id === id)
        ? actuales.map((l) =>
            l.id === id ? { ...l, cantidad: limitar(id, l.cantidad + cantidad) } : l,
          )
        : [...actuales, { id, cantidad: limitar(id, cantidad) }],
    );
  }

  // Cambia la cantidad de un producto del carrito
  function cambiarCantidad(id, cantidad) {
    setLineas((actuales) =>
      actuales.map((l) => (l.id === id ? { ...l, cantidad: limitar(id, cantidad) } : l)),
    );
  }

  // Saca un producto del carrito
  const quitar = (id) => setLineas((actuales) => actuales.filter((l) => l.id !== id));
  // Deja el carrito vacío
  const vaciar = () => setLineas([]);

  return (
    // Comparte el carrito y sus funciones con toda la app
    <CarritoContext.Provider
      value={{ items, total, cantidadTotal, agregar, cambiarCantidad, quitar, vaciar }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
