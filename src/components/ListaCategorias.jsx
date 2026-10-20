import { Link } from 'react-router-dom';

/** Tarjetas de categorías; cada una lleva a su vista filtrada. */
export default function ListaCategorias({ categorias }) {
  return (
    <div className="row g-4">
      {categorias.map(({ id, nombre, imagen }) => (
        <div className="col-6 col-lg-3" key={id}>
          <Link
            to={`/categorias/${id}`}
            className="card h-100 shadow-sm text-reset text-decoration-none"
          >
            <img
              src={imagen}
              alt={nombre}
              className="card-img-top categoria-imagen"
              loading="lazy"
            />
            <div className="card-body text-center">
              <h3 className="h6 mb-0">{nombre}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
