import Producto from './Producto';

/** Grilla responsive: 1 columna en móvil, 2 en tablet y 3-4 en escritorio. */
export default function ListaProductos({ productos, onAgregar }) {
  if (productos.length === 0) {
    return <p className="alert alert-info">No hay productos para mostrar.</p>;
  }
  return (
    <div className="row g-4">
      {productos.map((producto) => (
        <div className="col-sm-6 col-lg-4 col-xl-3" key={producto.id}>
          <Producto {...producto} onAgregar={onAgregar} />
        </div>
      ))}
    </div>
  );
}
