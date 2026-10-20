import { Link, NavLink, Outlet } from 'react-router-dom';
import Logo from '../components/Logo';
import useAuth from '../hooks/useAuth';

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
  const { cerrarSesion } = useAuth();
  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-md-3 col-lg-2 admin-menu py-3">
          <div className="mb-3 text-white">
            <Logo />
          </div>
          <nav className="nav nav-pills flex-md-column gap-1" aria-label="Administración">
            {SECCIONES.map(([ruta, etiqueta]) => (
              <NavLink key={ruta} to={ruta} end={ruta === '/admin'} className="nav-link">
                {etiqueta}
              </NavLink>
            ))}
            <Link to="/" className="btn btn-dark mt-md-4">
              Tienda
            </Link>
            <Link to="/" className="btn btn-danger" onClick={cerrarSesion}>
              Cerrar sesión
            </Link>
          </nav>
        </aside>
        <main className="col-md-9 col-lg-10 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
