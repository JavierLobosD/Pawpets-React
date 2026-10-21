import { Link } from 'react-router-dom';

// Año actual, para que el copyright se actualice solo cada año
const anioActual = new Date().getFullYear();

// Pie de página que aparece abajo en todas las páginas de la tienda
export default function Footer() {
  return (
    <footer className="site-footer mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Columna con el nombre de la tienda y una frase corta */}
          <div className="col-md-4">
            <h2 className="h6">PawPets</h2>
            <p>Petshop y cuidado animal para toda la familia.</p>
          </div>
          {/* Columna con links a otras páginas del sitio */}
          <div className="col-6 col-md-4">
            <h2 className="h6">Enlaces</h2>
            <Link to="/productos">Productos</Link>
            <Link to="/blogs">Blog</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
          {/* Columna de contacto: al hacer clic llama o abre el correo */}
          <div className="col-6 col-md-4">
            <h2 className="h6">Contáctanos</h2>
            <a href="tel:+56912345678">+56 9 1234 5678</a>
            <a href="mailto:contacto@pawpets.cl">contacto@pawpets.cl</a>
          </div>
        </div>
        {/* Línea final con los derechos reservados */}
        <p className="footer-bottom">
          &copy; {anioActual} PawPets. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
