import { Link, useParams } from 'react-router-dom';
import useColeccion from '../hooks/useColeccion';

export default function DetalleBlog() {
  const { id } = useParams();
  const blog = useColeccion('blogs').find((b) => b.id === Number(id));

  if (!blog) return <p className="alert alert-warning">Artículo no encontrado.</p>;
  return (
    <article className="col-lg-8 mx-auto">
      <h1 className="section-title">{blog.titulo}</h1>
      <p>{blog.contenido}</p>
      <Link to="/blogs">← Volver al blog</Link>
    </article>
  );
}
