import { Link } from 'react-router-dom';
import useColeccion from '../../hooks/useColeccion';
import { esCritico, UMBRAL_CRITICO } from '../../utils/productos';

export default function ProductosCriticos() {
  const criticos = useColeccion('productos').filter(esCritico);
  return (
    <>
      <h1 className="h3">Productos críticos</h1>
      <p className="text-secondary">
        Productos con stock igual o menor a {UMBRAL_CRITICO} unidades.
      </p>
      {criticos.length === 0 ? (
        <p className="alert alert-success">No hay productos con stock crítico.</p>
      ) : (
        <ul className="list-group mb-3">
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
