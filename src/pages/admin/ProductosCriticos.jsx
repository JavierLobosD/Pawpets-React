import { Link } from 'react-router-dom';
import useColeccion from '../../hooks/useColeccion';
import { esCritico, UMBRAL_CRITICO } from '../../utils/productos';

// Página con los productos que tienen poco stock
export default function ProductosCriticos() {
  // Solo los productos con stock crítico
  const criticos = useColeccion('productos').filter(esCritico);
  return (
    <>
      <h1 className="h3">Productos críticos</h1>
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
      <Link to="/admin/productos">← Volver a productos</Link>
    </>
  );
}
