import { Link, NavLink, Outlet } from 'react-router-dom';
import Logo from '../components/Logo';
import useAuth from '../hooks/useAuth';

// Secciones del menú del admin: [ruta, texto]
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
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Menú lateral del admin */}
        <aside className="col-md-3 col-lg-2 admin-menu py-3">
          <div className="mb-3 text-white">
            <Logo />
          </div>
          <nav className="nav nav-pills flex-md-column gap-1" aria-label="Administración">
            {/* Un link por sección; Dashboard solo se marca en /admin */}
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
            <Link to="/" className="btn btn-danger" onClick={cerrarSesion}>
              Cerrar sesión
            </Link>
          </nav>
        </aside>
        {/* Aquí se muestra la página del admin elegida */}
        <main className="col-md-9 col-lg-10 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
