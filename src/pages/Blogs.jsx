import { Link } from 'react-router-dom';
import useColeccion from '../hooks/useColeccion';

// Página que muestra la lista de artículos del blog
export default function Blogs() {
  // Trae todos los blogs guardados
  const blogs = useColeccion('blogs');
  return (
    <>
      <h1 className="section-title">Blog</h1>
      {/* Una tarjeta por cada artículo del blog */}
      <div className="row g-4">
        {blogs.map(({ id, titulo, resumen }) => (
          <div className="col-md-6" key={id}>
            <article className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{titulo}</h2>
                <p>{resumen}</p>
                {/* Botón que lleva al artículo completo */}
                <Link to={`/blogs/${id}`} className="btn btn-primary">
                  Leer más
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  );
}
