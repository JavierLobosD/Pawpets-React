import { Link } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
import { precioCLP } from '../utils/formato';
import { precioFinal } from '../utils/productos';

export default function Carrito() {
  const { items, total, cambiarCantidad, quitar, vaciar } = useCarrito();

  if (items.length === 0) {
    return (
      <p className="alert alert-info">
        Tu carrito está vacío. <Link to="/productos">Ver productos</Link>
      </p>
    );
  }

  return (
    <>
      <h1 className="section-title">Carrito de compras</h1>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Subtotal</th>
              <th scope="col">
                <span className="visually-hidden">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ producto, cantidad, subtotal }) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{precioCLP(precioFinal(producto))}</td>
                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm cantidad-input"
                    aria-label={`Cantidad de ${producto.nombre}`}
                    min={1}
                    max={producto.stock}
                    value={cantidad}
                    onChange={(e) => cambiarCantidad(producto.id, Number(e.target.value))}
                  />
                </td>
                <td>{precioCLP(subtotal)}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => quitar(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="h4 text-end">Total: {precioCLP(total)}</p>
      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={vaciar}>
          Limpiar
        </button>
        <Link to="/checkout" className="btn btn-success">
          Comprar ahora
        </Link>
      </div>
    </>
  );
}
