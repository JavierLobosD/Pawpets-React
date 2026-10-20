import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCarrito from '../hooks/useCarrito';
import { precioCLP } from '../utils/formato';
import Logo from './Logo';

const ENLACES = [
  ['/', 'Inicio'],
  ['/productos', 'Productos'],
  ['/categorias', 'Categorías'],
  ['/ofertas', 'Ofertas'],
  ['/nosotros', 'Nosotros'],
  ['/blogs', 'Blog'],
  ['/contacto', 'Contacto'],
];

/** Navegación principal: menú móvil, buscador, carrito y sesión del usuario. */
export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [texto, setTexto] = useState('');
  const { usuario, cerrarSesion } = useAuth();
  const { total } = useCarrito();
  const navegar = useNavigate();

  function buscar(evento) {
    evento.preventDefault();
    navegar(`/productos?q=${encodeURIComponent(texto.trim())}`);
    setAbierto(false);
  }

  return (
    <header className="site-header">
      <nav
        className="navbar navbar-expand-xl container"
        aria-label="Navegación principal"
      >
        <Link className="navbar-brand" to="/">
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="menu-principal"
          aria-expanded={abierto}
          aria-label="Abrir o cerrar menú"
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          id="menu-principal"
          className={`collapse navbar-collapse ${abierto ? 'show' : ''}`}
        >
          <ul className="navbar-nav me-auto">
            {ENLACES.map(([ruta, etiqueta]) => (
              <li className="nav-item" key={ruta}>
                <NavLink
                  className="nav-link"
                  to={ruta}
                  end={ruta === '/'}
                  onClick={() => setAbierto(false)}
                >
                  {etiqueta}
                </NavLink>
              </li>
            ))}
          </ul>
          <form
            className="d-flex gap-2 my-2 my-xl-0 me-xl-3"
            role="search"
            onSubmit={buscar}
          >
            <input
              className="form-control"
              type="search"
              placeholder="Buscar productos"
              aria-label="Buscar productos"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Buscar
            </button>
          </form>
          <div className="d-flex flex-wrap flex-xl-nowrap align-items-center gap-2">
            <Link
              className="btn btn-success"
              to="/carrito"
              onClick={() => setAbierto(false)}
            >
              🛒 {precioCLP(total)}
            </Link>
            {usuario ? (
              <>
                {usuario.rol === 'admin' && (
                  <Link className="btn btn-outline-light" to="/admin">
                    Admin
                  </Link>
                )}
                <span className="text-white small d-xl-none d-xxl-inline">
                  Hola, {usuario.nombre}
                </span>
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={cerrarSesion}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-outline-light"
                  to="/login"
                  onClick={() => setAbierto(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  className="btn btn-primary"
                  to="/registro"
                  onClick={() => setAbierto(false)}
                >
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
