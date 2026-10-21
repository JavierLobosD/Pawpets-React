import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCarrito from '../hooks/useCarrito';
import { precioCLP } from '../utils/formato';
import Logo from './Logo';

// Links del menú: cada uno es [ruta, texto que se muestra]
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
  // Dice si el menú del celular está abierto o cerrado
  const [abierto, setAbierto] = useState(false);
  // Guarda lo que el usuario escribe en el buscador
  const [texto, setTexto] = useState('');
  // Datos del usuario que inició sesión y la función para salir
  const { usuario, cerrarSesion } = useAuth();
  // Total en plata de lo que hay en el carrito
  const { total } = useCarrito();
  // Sirve para mandar al usuario a otra página desde el código
  const navegar = useNavigate();

  // Se ejecuta al enviar el buscador
  function buscar(evento) {
    // Evita que la página se recargue
    evento.preventDefault();
    // Va a la página de productos con lo buscado en la URL
    navegar(`/productos?q=${encodeURIComponent(texto.trim())}`);
    // Cierra el menú del celular después de buscar
    setAbierto(false);
  }

  return (
    <header className="site-header">
      <nav
        className="navbar navbar-expand-xl container"
        aria-label="Navegación principal"
      >
        {/* Logo que lleva al inicio */}
        <Link className="navbar-brand" to="/">
          <Logo />
        </Link>
        {/* Botón de hamburguesa: abre y cierra el menú en pantallas chicas */}
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
        {/* Contenido del menú: se muestra si "abierto" es true (en celular) */}
        <div
          id="menu-principal"
          className={`collapse navbar-collapse ${abierto ? 'show' : ''}`}
        >
          {/* Lista de links del menú, sale del arreglo ENLACES */}
          <ul className="navbar-nav me-auto">
            {ENLACES.map(([ruta, etiqueta]) => (
              <li className="nav-item" key={ruta}>
                {/* NavLink marca el link activo; "end" hace que Inicio solo se marque en "/" */}
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
          {/* Buscador de productos */}
          <form
            className="d-flex gap-2 my-2 my-xl-0 me-xl-3"
            role="search"
            onSubmit={buscar}
          >
            {/* Input que va guardando lo escrito en el estado "texto" */}
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
          {/* Zona de la derecha: carrito y botones de sesión */}
          <div className="d-flex flex-wrap flex-xl-nowrap align-items-center gap-2">
            {/* Botón del carrito que muestra el total a pagar */}
            <Link
              className="btn btn-success"
              to="/carrito"
              onClick={() => setAbierto(false)}
            >
              🛒 {precioCLP(total)}
            </Link>
            {/* Si hay usuario conectado muestra saludo y salir; si no, login y registro */}
            {usuario ? (
              <>
                {/* Botón Admin, solo para usuarios con rol admin */}
                {usuario.rol === 'admin' && (
                  <Link className="btn btn-outline-light" to="/admin">
                    Admin
                  </Link>
                )}
                {/* Saludo con el nombre del usuario */}
                <span className="text-white small d-xl-none d-xxl-inline">
                  Hola, {usuario.nombre}
                </span>
                {/* Botón para cerrar sesión */}
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
                {/* Link para iniciar sesión */}
                <Link
                  className="btn btn-outline-light"
                  to="/login"
                  onClick={() => setAbierto(false)}
                >
                  Iniciar sesión
                </Link>
                {/* Link para crear una cuenta nueva */}
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
