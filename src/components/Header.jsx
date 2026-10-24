// useState: hook de React para guardar datos que cambian (estado)
import { useState } from 'react';
// De react-router: Link (link normal), NavLink (link que sabe si está activo)
// y useNavigate (para cambiar de página desde el código)
import { Link, NavLink, useNavigate } from 'react-router-dom';
// Hooks propios para leer la sesión y el carrito compartidos
import useAuth from '../hooks/useAuth';
import useCarrito from '../hooks/useCarrito';
// precioCLP: da formato de pesos chilenos a un número
import { precioCLP } from '../utils/formato';
// Logo: componente con la huellita y el nombre de la tienda
import Logo from './Logo';

// Links del menú: cada uno es [ruta, texto que se muestra]
// Se define fuera del componente porque no cambia nunca
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
  // Parte en false (cerrado); setAbierto lo cambia y React redibuja el menú
  const [abierto, setAbierto] = useState(false);
  // Guarda lo que el usuario escribe en el buscador
  // Parte vacío ('')
  const [texto, setTexto] = useState('');
  // Datos del usuario que inició sesión y la función para salir
  // usuario es null si nadie inició sesión
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
    // encodeURIComponent cambia espacios y tildes para que la URL sea válida
    navegar(`/productos?q=${encodeURIComponent(texto.trim())}`);
    // Cierra el menú del celular después de buscar
    setAbierto(false);
  }

  // Lo que se dibuja en pantalla
  return (
    <header className="site-header">
      {/* navbar-expand-xl: en pantallas grandes el menú se ve completo; en chicas se esconde */}
      <nav
        className="navbar navbar-expand-xl container"
        aria-label="Navegación principal"
      >
        {/* Logo que lleva al inicio */}
        <Link className="navbar-brand" to="/">
          <Logo />
        </Link>
        {/* Botón de hamburguesa: abre y cierra el menú en pantallas chicas */}
        {/* Al hacer clic cambia abierto al valor contrario (true <-> false) */}
        {/* aria-expanded le dice a los lectores de pantalla si el menú está abierto */}
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
        {/* La clase 'show' de Bootstrap es la que lo hace visible */}
        <div
          id="menu-principal"
          className={`collapse navbar-collapse ${abierto ? 'show' : ''}`}
        >
          {/* Lista de links del menú, sale del arreglo ENLACES */}
          <ul className="navbar-nav me-auto">
            {/* Por cada [ruta, etiqueta] se dibuja un link; key = ruta para que React los distinga */}
            {ENLACES.map(([ruta, etiqueta]) => (
              <li className="nav-item" key={ruta}>
                {/* NavLink marca el link activo; "end" hace que Inicio solo se marque en "/" */}
                {/* Al hacer clic se cierra el menú del celular */}
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
          {/* onSubmit llama a buscar() al apretar Enter o el botón Buscar */}
          <form
            className="d-flex gap-2 my-2 my-xl-0 me-xl-3"
            role="search"
            onSubmit={buscar}
          >
            {/* Input que va guardando lo escrito en el estado "texto" */}
            {/* Es un input controlado: muestra texto y cada tecla llama a setTexto */}
            <input
              className="form-control"
              type="search"
              placeholder="Buscar productos"
              aria-label="Buscar productos"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            {/* type="submit" hace que el botón envíe el formulario */}
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
                {/* d-xl-none d-xxl-inline: se esconde en pantallas xl y vuelve a verse en xxl */}
                <span className="text-white small d-xl-none d-xxl-inline">
                  Hola, {usuario.nombre}
                </span>
                {/* Botón para cerrar sesión */}
                {/* Llama a cerrarSesion del AuthProvider */}
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
