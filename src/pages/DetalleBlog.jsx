// Link: ir a otra página sin recargar; useParams: leer el :id de la URL
import { Link, useParams } from 'react-router-dom';
// useColeccion: hook propio que trae una colección de db y se actualiza sola
import useColeccion from '../hooks/useColeccion';

// Página que muestra un artículo del blog completo
// Ruta: /blogs/:id
export default function DetalleBlog() {
  // Saca el id del artículo desde la URL
  const { id } = useParams();
  // Busca el blog que tiene ese id
  // Number(id) porque en la URL el id es texto
  const blog = useColeccion('blogs').find((b) => b.id === Number(id));

  // Si no existe, avisa que no se encontró
  if (!blog) return <p className="alert alert-warning">Artículo no encontrado.</p>;
  // Si existe, muestra el artículo centrado (col-lg-8 mx-auto)
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
