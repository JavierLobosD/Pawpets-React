import { Link } from 'react-router-dom';

const anioActual = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h2 className="h6">PawPets</h2>
            <p>Petshop y cuidado animal para toda la familia.</p>
          </div>
          <div className="col-6 col-md-4">
            <h2 className="h6">Enlaces</h2>
            <Link to="/productos">Productos</Link>
            <Link to="/blogs">Blog</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
          <div className="col-6 col-md-4">
            <h2 className="h6">Contáctanos</h2>
            <a href="tel:+56912345678">+56 9 1234 5678</a>
            <a href="mailto:contacto@pawpets.cl">contacto@pawpets.cl</a>
          </div>
        </div>
        <p className="footer-bottom">
          &copy; {anioActual} PawPets. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
