// useState: hook de React para guardar datos que cambian (estado)
import { useState } from 'react';
// Link: componente de react-router para ir a otra página sin recargar
import { Link } from 'react-router-dom';
// precioCLP: da formato de pesos chilenos a un número
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
  // Parte en false porque al principio se intenta mostrar la imagen
  const [imagenFallo, setImagenFallo] = useState(false);
  // Si tiene precio de oferta mayor a 0, el producto está en oferta
  const enOferta = precioOferta > 0;

  // Lo que se dibuja: una tarjeta (card) de Bootstrap
  return (
    <article className="card h-100 shadow-sm producto-card">
      {/* Muestra la imagen si existe y no falló; si no, un cuadro de reemplazo */}
      {/* imagen?.trim() es falso si no hay imagen o si es un texto vacío */}
      {/* onError se ejecuta si la imagen no carga: cambia el estado y React muestra el reemplazo */}
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
      {/* Cuerpo de la tarjeta en columna, para dejar el botón siempre abajo (mt-auto) */}
      <div className="card-body d-flex flex-column">
        {/* Nombre del producto con link a su página de detalle */}
        <h3 className="h6 card-title">
          <Link to={`/productos/${id}`} className="text-reset">
            {nombre}
          </Link>
        </h3>
        {/* Precios: si está en oferta, muestra el precio normal tachado y el de oferta */}
        <p className="mb-3">
          {/* Precio normal tachado: solo aparece si enOferta es true */}
          {enOferta && (
            <span className="text-decoration-line-through text-secondary me-2">
              {precioCLP(precio)}
            </span>
          )}
          {/* Precio que se cobra, en negrita */}
          <strong>{precioCLP(enOferta ? precioOferta : precio)}</strong>
        </p>
        {/* Botón para agregar al carrito; se desactiva si no queda stock */}
        {/* Al hacer clic llama a onAgregar con el id; la función real viene del padre */}
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
