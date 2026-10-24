// Producto: componente propio que dibuja la tarjeta de un producto
import Producto from './Producto';

/** Grilla responsive: 1 columna en móvil, 2 en tablet y 3-4 en escritorio. */
// Props: productos = lista a mostrar, onAgregar = función para agregar al carrito
export default function ListaProductos({ productos, onAgregar }) {
  // Si no hay productos, muestra un aviso en vez de la grilla vacía
  if (productos.length === 0) {
    // return temprano: no sigue con el resto de la función
    return <p className="alert alert-info">No hay productos para mostrar.</p>;
  }
  // Si hay productos, dibuja la grilla
  return (
    <div className="row g-4">
      {/* Una tarjeta de Producto por cada producto, pasándole todos sus datos */}
      {/* col-sm-6 = 2 por fila, col-lg-4 = 3 por fila, col-xl-3 = 4 por fila */}
      {/* {...producto} pasa cada campo como prop (id, nombre, precio...) */}
      {productos.map((producto) => (
        <div className="col-sm-6 col-lg-4 col-xl-3" key={producto.id}>
          <Producto {...producto} onAgregar={onAgregar} />
        </div>
      ))}
    </div>
  );
}
