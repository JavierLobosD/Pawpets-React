import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
import useColeccion from '../hooks/useColeccion';
import { precioCLP } from '../utils/formato';
import { enOferta, precioFinal } from '../utils/productos';

// Página con toda la información de un producto
export default function DetalleProducto() {
  // Saca el id del producto desde la URL
  const { id } = useParams();
  // Busca el producto que tiene ese id
  const producto = useColeccion('productos').find((p) => p.id === Number(id));
  // Función para agregar al carrito
  const { agregar } = useCarrito();
  // Cantidad que el usuario quiere comprar, parte en 1
  const [cantidad, setCantidad] = useState(1);
  // Dice si ya se agregó al carrito, para mostrar aviso
  const [agregado, setAgregado] = useState(false);

  // Si el producto no existe, muestra un aviso
  if (!producto) {
    return (
      <p className="alert alert-warning">
        Producto no encontrado. <Link to="/productos">Volver al catálogo</Link>
      </p>
    );
  }

  // Agrega la cantidad elegida al carrito y muestra el aviso
  function agregarAlCarrito() {
    agregar(producto.id, cantidad);
    setAgregado(true);
  }

  return (
    <div className="row g-4">
      {/* Columna de la imagen, o un reemplazo si no tiene */}
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
      {/* Columna con los datos del producto */}
      <div className="col-md-6">
        <h1 className="h2">{producto.nombre}</h1>
        {/* Precio: si está en oferta, muestra el normal tachado */}
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
        {/* Elegir cantidad y botón para agregar al carrito */}
        <div className="d-flex gap-2 align-items-center mb-3">
          <label htmlFor="cantidad" className="form-label mb-0">
            Cantidad
          </label>
          {/* La cantidad nunca baja de 1 */}
          <input
            id="cantidad"
            type="number"
            className="form-control w-auto"
            min={1}
            max={producto.stock}
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
          />
          {/* Se desactiva si no queda stock */}
          <button
            type="button"
            className="btn btn-primary"
            disabled={producto.stock === 0}
            onClick={agregarAlCarrito}
          >
            Agregar al carrito
          </button>
        </div>
        {/* Aviso que aparece después de agregar al carrito */}
        {agregado && (
          <p className="alert alert-success" role="status">
            Producto agregado. <Link to="/carrito">Ver carrito</Link>
          </p>
        )}
      </div>
    </div>
  );
}
