// Link: componente de react-router para ir a otra página sin recargar
import { Link } from 'react-router-dom';
// useColeccion: hook propio que trae una colección de db y se actualiza sola
import useColeccion from '../../hooks/useColeccion';

// Accesos rápidos: [ruta, título, descripción]
const ACCESOS = [
  ['/admin/ordenes', 'Órdenes', 'Seguimiento de las compras realizadas.'],
  ['/admin/productos', 'Productos', 'Inventario y detalle de productos.'],
  ['/admin/categorias', 'Categorías', 'Organiza los productos por categoría.'],
  ['/admin/usuarios', 'Usuarios', 'Gestión de cuentas y roles.'],
  ['/admin/reportes', 'Reportes', 'Ventas e inventario crítico.'],
  ['/admin/perfil', 'Perfil', 'Tu información de cuenta.'],
];

// Página principal del panel de administración
// Ruta: /admin (la ruta "index" del admin en App.jsx)
export default function Dashboard() {
  // Cuenta solo las compras que se pagaron
  // filter deja las pagadas y .length cuenta cuántas son
  const compras = useColeccion('ordenes').filter((o) => o.estado === 'Pagada').length;
  // Cantidad de productos y de usuarios
  const productos = useColeccion('productos').length;
  const usuarios = useColeccion('usuarios').length;

  return (
    <>
      <h1 className="h3">Dashboard</h1>
      {/* Tarjetas de colores con los totales */}
      <div className="row g-3 mb-4">
        {/* Lista de [título, número, color de Bootstrap] que se recorre con map */}
        {/* text-bg-primary = azul, success = verde, warning = amarillo */}
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
      {/* Tarjetas que llevan a cada sección del admin */}
      <div className="row g-3">
        {/* Una tarjeta por cada acceso; toda la tarjeta es un link */}
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
