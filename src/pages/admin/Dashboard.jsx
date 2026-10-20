import { Link } from 'react-router-dom';
import useColeccion from '../../hooks/useColeccion';

const ACCESOS = [
  ['/admin/ordenes', 'Órdenes', 'Seguimiento de las compras realizadas.'],
  ['/admin/productos', 'Productos', 'Inventario y detalle de productos.'],
  ['/admin/categorias', 'Categorías', 'Organiza los productos por categoría.'],
  ['/admin/usuarios', 'Usuarios', 'Gestión de cuentas y roles.'],
  ['/admin/reportes', 'Reportes', 'Ventas e inventario crítico.'],
  ['/admin/perfil', 'Perfil', 'Tu información de cuenta.'],
];

export default function Dashboard() {
  const compras = useColeccion('ordenes').filter((o) => o.estado === 'Pagada').length;
  const productos = useColeccion('productos').length;
  const usuarios = useColeccion('usuarios').length;

  return (
    <>
      <h1 className="h3">Dashboard</h1>
      <div className="row g-3 mb-4">
        {[
          ['Compras', compras, 'primary'],
          ['Productos', productos, 'success'],
          ['Usuarios', usuarios, 'warning'],
        ].map(([titulo, valor, color]) => (
          <div className="col-md-4" key={titulo}>
            <div className={`card text-bg-${color}`}>
              <div className="card-body">
                <p className="mb-0">{titulo}</p>
                <p className="display-6 mb-0">{valor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row g-3">
        {ACCESOS.map(([ruta, titulo, texto]) => (
          <div className="col-sm-6 col-xl-4" key={ruta}>
            <Link
              to={ruta}
              className="card h-100 text-reset text-decoration-none shadow-sm"
            >
              <div className="card-body">
                <h2 className="h5">{titulo}</h2>
                <p className="mb-0 text-secondary">{texto}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
