import { Link, useParams } from 'react-router-dom';
import useColeccion from '../hooks/useColeccion';

// Página que muestra un artículo del blog completo
export default function DetalleBlog() {
  // Saca el id del artículo desde la URL
  const { id } = useParams();
  // Busca el blog que tiene ese id
  const blog = useColeccion('blogs').find((b) => b.id === Number(id));

  // Si no existe, avisa que no se encontró
  if (!blog) return <p className="alert alert-warning">Artículo no encontrado.</p>;
  return (
    <article className="col-lg-8 mx-auto">
      {/* Título y contenido del artículo */}
      <h1 className="section-title">{blog.titulo}</h1>
      <p>{blog.contenido}</p>
      {/* Link para volver a la lista de blogs */}
      <Link to="/blogs">← Volver al blog</Link>
    </article>
  );
}
