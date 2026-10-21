import { Link } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
import { precioCLP } from '../utils/formato';
import { precioFinal } from '../utils/productos';

// Página del carrito con los productos que eligió el usuario
export default function Carrito() {
  // Productos, total y acciones para modificar el carrito
  const { items, total, cambiarCantidad, quitar, vaciar } = useCarrito();

  // Si el carrito está vacío, muestra un aviso
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
      {/* Tabla con los productos del carrito */}
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
            {/* Una fila por cada producto */}
            {items.map(({ producto, cantidad, subtotal }) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{precioCLP(precioFinal(producto))}</td>
                <td>
                  {/* Input para cambiar la cantidad, máximo el stock */}
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
                  {/* Botón para sacar este producto del carrito */}
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
      {/* Total a pagar */}
      <p className="h4 text-end">Total: {precioCLP(total)}</p>
      {/* Botones para vaciar el carrito o ir a pagar */}
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
