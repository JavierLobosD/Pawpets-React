import { useState } from 'react';
import { Link } from 'react-router-dom';
import { precioCLP } from '../utils/formato';

/**
 * Tarjeta de un producto. Recibe sus datos y la acción de agregar por props;
 * su único estado propio es si la imagen falló (muestra un reemplazo).
 */
// Props: id, nombre, imagen, precio, precioOferta y stock son los datos del producto;
// onAgregar = función que agrega el producto al carrito usando su id
export default function Producto({
  id,
  nombre,
  imagen,
  precio,
  precioOferta,
  stock,
  onAgregar,
}) {
  // Se pone en true si la imagen no pudo cargar
  const [imagenFallo, setImagenFallo] = useState(false);
  // Si tiene precio de oferta mayor a 0, el producto está en oferta
  const enOferta = precioOferta > 0;

  return (
    <article className="card h-100 shadow-sm producto-card">
      {/* Muestra la imagen si existe y no falló; si no, un cuadro de reemplazo */}
      {imagen?.trim() && !imagenFallo ? (
        <img
          src={imagen}
          alt={nombre}
          className="card-img-top producto-imagen"
          loading="lazy"
          onError={() => setImagenFallo(true)}
        />
      ) : (
        <div className="producto-imagen producto-placeholder">Imagen no disponible</div>
      )}
      <div className="card-body d-flex flex-column">
        {/* Nombre del producto con link a su página de detalle */}
        <h3 className="h6 card-title">
          <Link to={`/productos/${id}`} className="text-reset">
            {nombre}
          </Link>
        </h3>
        {/* Precios: si está en oferta, muestra el precio normal tachado y el de oferta */}
        <p className="mb-3">
          {enOferta && (
            <span className="text-decoration-line-through text-secondary me-2">
              {precioCLP(precio)}
            </span>
          )}
          <strong>{precioCLP(enOferta ? precioOferta : precio)}</strong>
        </p>
        {/* Botón para agregar al carrito; se desactiva si no queda stock */}
        <button
          type="button"
          className="btn btn-primary mt-auto"
          disabled={stock === 0}
          onClick={() => onAgregar(id)}
        >
          {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  );
}
