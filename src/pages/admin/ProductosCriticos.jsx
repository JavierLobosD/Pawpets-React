// Link: componente de react-router para ir a otra página sin recargar
import { Link } from 'react-router-dom';
// useColeccion: hook propio que trae una colección de db y se actualiza sola
import useColeccion from '../../hooks/useColeccion';
// esCritico: dice si queda poco stock; UMBRAL_CRITICO: el límite (5)
import { esCritico, UMBRAL_CRITICO } from '../../utils/productos';

// Página con los productos que tienen poco stock
// Ruta: /admin/productos/criticos (botón "Productos críticos" de la tabla de productos)
export default function ProductosCriticos() {
  // Solo los productos con stock crítico
  // filter(esCritico) deja los productos con stock igual o menor al umbral
  const criticos = useColeccion('productos').filter(esCritico);
  return (
    <>
      <h1 className="h3">Productos críticos</h1>
      {/* Texto que explica el criterio, usando la misma constante */}
      <p className="text-secondary">
        Productos con stock igual o menor a {UMBRAL_CRITICO} unidades.
      </p>
      {/* Aviso si no hay críticos; si hay, la lista */}
      {criticos.length === 0 ? (
        <p className="alert alert-success">No hay productos con stock crítico.</p>
      ) : (
        <ul className="list-group mb-3">
          {/* Cada producto con su stock en rojo */}
          {criticos.map((p) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={p.id}
            >
              {p.nombre}
              <span className="badge text-bg-danger">Stock: {p.stock}</span>
            </li>
          ))}
        </ul>
      )}
      {/* Link para volver a la tabla de productos */}
      <Link to="/admin/productos">← Volver a productos</Link>
    </>
  );
}
