// Link: componente de react-router para ir a otra página sin recargar
import { Link } from 'react-router-dom';
// useColeccion: hook propio que trae una colección de db y se actualiza sola
import useColeccion from '../hooks/useColeccion';

// Página que muestra la lista de artículos del blog
// Ruta: /blogs (definida en App.jsx)
export default function Blogs() {
  // Trae todos los blogs guardados
  const blogs = useColeccion('blogs');
  // <> </> agrupa el título y la grilla sin agregar un div extra
  return (
    <>
      <h1 className="section-title">Blog</h1>
      {/* Una tarjeta por cada artículo del blog */}
      {/* col-md-6 = dos tarjetas por fila en pantallas medianas */}
      <div className="row g-4">
        {/* De cada blog se usan id, titulo y resumen; key={id} identifica la tarjeta */}
        {blogs.map(({ id, titulo, resumen }) => (
          <div className="col-md-6" key={id}>
            <article className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{titulo}</h2>
                <p>{resumen}</p>
                {/* Botón que lleva al artículo completo */}
                {/* Ejemplo: el blog 1 lleva a /blogs/1 (página DetalleBlog) */}
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
