// Link: componente de react-router para ir a otra página sin recargar
import { Link } from 'react-router-dom';

/** Tarjetas de categorías; cada una lleva a su vista filtrada. */
// Prop: categorias = lista de categorías con id, nombre e imagen
// No tiene estado propio: solo dibuja lo que recibe por props
export default function ListaCategorias({ categorias }) {
  return (
    <div className="row g-4">
      {/* Una tarjeta por cada categoría */}
      {/* Se sacan id, nombre e imagen de cada categoría; key={id} identifica cada tarjeta */}
      {categorias.map(({ id, nombre, imagen }) => (
        <div className="col-6 col-lg-3" key={id}>
          {/* Toda la tarjeta es un link a la página de esa categoría */}
          {/* Ejemplo: la categoría 2 lleva a /categorias/2 */}
          <Link
            to={`/categorias/${id}`}
            className="card h-100 shadow-sm text-reset text-decoration-none"
          >
            {/* Imagen de la categoría; lazy hace que cargue solo cuando se va a ver */}
            <img
              src={imagen}
              alt={nombre}
              className="card-img-top categoria-imagen"
              loading="lazy"
            />
            {/* Nombre de la categoría */}
            <div className="card-body text-center">
              <h3 className="h6 mb-0">{nombre}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
