// useEffect: hook para hacer algo después de dibujar; useState: hook de estado
import { useEffect, useState } from 'react';
// useColeccion: hook propio que entrega una colección de db y se actualiza sola
import useColeccion from '../hooks/useColeccion';
// precioFinal: devuelve el precio de oferta si hay, o el normal
import { precioFinal } from '../utils/productos';
// CarritoContext: el contexto que este Provider llena con datos
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
  // Se pasa una función a useState para leer localStorage solo la primera vez
  // Si no hay nada guardado, ?? '[]' hace que parta como lista vacía
  // JSON.parse convierte el texto guardado de vuelta en una lista
  const [lineas, setLineas] = useState(() =>
    JSON.parse(localStorage.getItem(CLAVE_CARRITO) ?? '[]'),
  );

  // Cada cambio del carrito se guarda para que sobreviva a recargar la página.
  // El arreglo [lineas] indica que el efecto se ejecuta cada vez que cambia lineas
  useEffect(() => {
    // JSON.stringify pasa la lista a texto, porque localStorage solo guarda texto
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(lineas));
  }, [lineas]);

  // Junta cada línea con su producto y calcula el subtotal
  // flatMap permite devolver [] para saltarse una línea
  const items = lineas.flatMap(({ id, cantidad }) => {
    // Busca el producto completo por su id
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
    // Stock del producto; si no se encuentra, ?? cantidad no pone límite
    const stock = productos.find((p) => p.id === id)?.stock ?? cantidad;
    // Math.max sube a 1 si es menor; Math.min baja al stock si se pasa
    return Math.min(Math.max(1, cantidad), stock);
  };

  // Agrega un producto; si ya estaba, le suma la cantidad
  // cantidad = 1 es el valor por defecto si no se indica otra
  function agregar(id, cantidad = 1) {
    // Se usa la forma con función para trabajar siempre con las líneas más nuevas
    setLineas((actuales) =>
      // ¿Ya está ese producto en el carrito?
      actuales.some((l) => l.id === id)
        // Sí: le suma la cantidad a esa línea y deja las demás iguales
        ? actuales.map((l) =>
            l.id === id ? { ...l, cantidad: limitar(id, l.cantidad + cantidad) } : l,
          )
        // No: agrega una línea nueva al final
        : [...actuales, { id, cantidad: limitar(id, cantidad) }],
    );
  }

  // Cambia la cantidad de un producto del carrito
  function cambiarCantidad(id, cantidad) {
    // Reemplaza la cantidad solo en la línea de ese producto
    setLineas((actuales) =>
      actuales.map((l) => (l.id === id ? { ...l, cantidad: limitar(id, cantidad) } : l)),
    );
  }

  // Saca un producto del carrito
  // filter deja todas las líneas menos la de ese id
  const quitar = (id) => setLineas((actuales) => actuales.filter((l) => l.id !== id));
  // Deja el carrito vacío
  const vaciar = () => setLineas([]);

  // Lo que se dibuja: el Provider con los datos y, adentro, toda la app
  return (
    // Comparte el carrito y sus funciones con toda la app
    // value es lo que reciben los componentes al usar useCarrito()
    <CarritoContext.Provider
      value={{ items, total, cantidadTotal, agregar, cambiarCantidad, quitar, vaciar }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
