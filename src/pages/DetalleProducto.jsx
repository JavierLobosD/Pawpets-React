import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
import useColeccion from '../hooks/useColeccion';
import { precioCLP } from '../utils/formato';
import { enOferta, precioFinal } from '../utils/productos';

export default function DetalleProducto() {
  const { id } = useParams();
  const producto = useColeccion('productos').find((p) => p.id === Number(id));
  const { agregar } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  if (!producto) {
    return (
      <p className="alert alert-warning">
        Producto no encontrado. <Link to="/productos">Volver al catálogo</Link>
      </p>
    );
  }

  function agregarAlCarrito() {
    agregar(producto.id, cantidad);
    setAgregado(true);
  }

  return (
    <div className="row g-4">
      <div className="col-md-6">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded"
          />
        ) : (
          <div className="producto-placeholder rounded">Imagen no disponible</div>
        )}
      </div>
      <div className="col-md-6">
        <h1 className="h2">{producto.nombre}</h1>
        <p className="h4">
          {enOferta(producto) && (
            <span className="text-decoration-line-through text-secondary me-2">
              {precioCLP(producto.precio)}
            </span>
          )}
          {precioCLP(precioFinal(producto))}
        </p>
        <p>{producto.descripcion}</p>
        <p className="text-secondary">Stock disponible: {producto.stock}</p>
        <div className="d-flex gap-2 align-items-center mb-3">
          <label htmlFor="cantidad" className="form-label mb-0">
            Cantidad
          </label>
          <input
            id="cantidad"
            type="number"
            className="form-control w-auto"
            min={1}
            max={producto.stock}
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
          />
          <button
            type="button"
            className="btn btn-primary"
            disabled={producto.stock === 0}
            onClick={agregarAlCarrito}
          >
            Agregar al carrito
          </button>
        </div>
        {agregado && (
          <p className="alert alert-success" role="status">
            Producto agregado. <Link to="/carrito">Ver carrito</Link>
          </p>
        )}
      </div>
    </div>
  );
}
