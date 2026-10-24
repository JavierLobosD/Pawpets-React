// Link: componente de react-router para ir a otra página sin recargar
import { Link } from 'react-router-dom';
// Componentes propios que dibujan las tarjetas de categorías y de productos
import ListaCategorias from '../components/ListaCategorias';
import ListaProductos from '../components/ListaProductos';
// Hooks propios: carrito compartido y colecciones de db
import useCarrito from '../hooks/useCarrito';
import useColeccion from '../hooks/useColeccion';

// Página de inicio de la tienda
// Ruta: / (la ruta "index" en App.jsx)
export default function Home() {
  // Trae las categorías y los productos guardados
  const categorias = useColeccion('categorias');
  const productos = useColeccion('productos');
  // Función para agregar productos al carrito
  const { agregar } = useCarrito();

  // La página se arma con varias secciones una debajo de otra
  return (
    <>
      {/* Portada grande con el mensaje principal */}
      <section className="hero text-center">
        <h1>Todo lo que tu mascota necesita, en un solo lugar</h1>
        <p>
          Alimentos premium, accesorios, juguetes y farmacia veterinaria para perros,
          gatos y animales exóticos.
        </p>
        {/* Botón grande que lleva al catálogo */}
        <Link to="/productos" className="btn btn-primary btn-lg">
          Ver productos
        </Link>
      </section>

      {/* Tarjetas de categorías */}
      <section className="mb-5">
        <h2 className="section-title">Categorías</h2>
        <ListaCategorias categorias={categorias} />
      </section>

      {/* Solo los productos marcados como destacados */}
      <section className="mb-5">
        <h2 className="section-title">Productos destacados</h2>
        {/* filter deja solo los productos con destacado: true */}
        <ListaProductos
          productos={productos.filter((p) => p.destacado)}
          onAgregar={agregar}
        />
      </section>

      {/* Video de YouTube de la tienda */}
      <section className="mb-5">
        <h2 className="section-title">Conoce a PawPets</h2>
        {/* ratio ratio-16x9 de Bootstrap mantiene la forma del video en cualquier pantalla */}
        {/* iframe muestra otra página (el reproductor de YouTube) dentro de la nuestra */}
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.youtube.com/embed/j9O8SdXVGZQ"
            title="Video institucional PawPets"
            allowFullScreen
          />
        </div>
      </section>

      {/* Banner que invita a adoptar mascotas */}
      <section className="hero hero-adopcion text-center">
        <h2>Adopta, no compres</h2>
        <p>
          PawPets apoya la tenencia responsable. Conoce a las mascotas que buscan un hogar
          en nuestro blog.
        </p>
        {/* Lleva a la lista de artículos del blog */}
        <Link to="/blogs" className="btn btn-dark">
          Conoce más
        </Link>
      </section>
    </>
  );
}
