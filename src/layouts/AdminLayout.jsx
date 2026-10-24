// De react-router: Link (link normal), NavLink (marca el link activo)
// y Outlet (lugar donde se dibuja la página hija)
import { Link, NavLink, Outlet } from 'react-router-dom';
// Logo: componente con la huellita y el nombre de la tienda
import Logo from '../components/Logo';
// useAuth: hook propio para usar la sesión (aquí, para cerrarla)
import useAuth from '../hooks/useAuth';

// Secciones del menú del admin: [ruta, texto]
// Productos, Categorías y Usuarios usan la ruta general /admin/:entidad de App.jsx
const SECCIONES = [
  ['/admin', 'Dashboard'],
  ['/admin/ordenes', 'Órdenes'],
  ['/admin/productos', 'Productos'],
  ['/admin/categorias', 'Categorías'],
  ['/admin/usuarios', 'Usuarios'],
  ['/admin/reportes', 'Reportes'],
  ['/admin/perfil', 'Perfil'],
];

/** Panel de administración: menú lateral (apilado en móvil) y contenido. */
export default function AdminLayout() {
  // Función para cerrar la sesión
  const { cerrarSesion } = useAuth();
  // container-fluid ocupa todo el ancho de la pantalla
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Menú lateral del admin */}
        {/* col-md-3 col-lg-2: angosto al lado en pantallas medianas; arriba a lo ancho en celular */}
        <aside className="col-md-3 col-lg-2 admin-menu py-3">
          <div className="mb-3 text-white">
            <Logo />
          </div>
          {/* flex-md-column: los links van uno debajo del otro desde pantallas medianas */}
          <nav className="nav nav-pills flex-md-column gap-1" aria-label="Administración">
            {/* Un link por sección; Dashboard solo se marca en /admin */}
            {/* Sin "end", el link /admin quedaría marcado en todas las páginas del admin */}
            {SECCIONES.map(([ruta, etiqueta]) => (
              <NavLink key={ruta} to={ruta} end={ruta === '/admin'} className="nav-link">
                {etiqueta}
              </NavLink>
            ))}
            {/* Botón para volver a la tienda */}
            <Link to="/" className="btn btn-dark mt-md-4">
              Tienda
            </Link>
            {/* Cierra la sesión y vuelve al inicio */}
            {/* Al hacer clic se llama a cerrarSesion y el link lleva a "/" */}
            <Link to="/" className="btn btn-danger" onClick={cerrarSesion}>
              Cerrar sesión
            </Link>
          </nav>
        </aside>
        {/* Aquí se muestra la página del admin elegida */}
        {/* Outlet se reemplaza por Dashboard, Ordenes, Reportes, etc. según la URL */}
        <main className="col-md-9 col-lg-10 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
