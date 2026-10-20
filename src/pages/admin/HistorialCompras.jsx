import { Link, useParams } from 'react-router-dom';
import useColeccion from '../../hooks/useColeccion';
import { precioCLP } from '../../utils/formato';

export default function HistorialCompras() {
  const { id } = useParams();
  const usuario = useColeccion('usuarios').find((u) => u.id === Number(id));
  const compras = useColeccion('ordenes').filter(
    (o) => o.clienteId === Number(id) && o.estado === 'Pagada',
  );

  if (!usuario) return <p className="alert alert-warning">Usuario no encontrado.</p>;
  return (
    <>
      <h1 className="h3">
        Historial de compras de {usuario.nombre} {usuario.apellidos}
      </h1>
      {compras.length === 0 ? (
        <p className="alert alert-info">Este usuario aún no tiene compras.</p>
      ) : (
        <ul className="list-group mb-3">
          {compras.map((o) => (
            <li className="list-group-item d-flex justify-content-between" key={o.id}>
              <Link to={`/admin/ordenes/${o.id}`}>
                Orden #{o.id} · {new Date(o.fecha).toLocaleDateString('es-CL')}
              </Link>
              <strong>{precioCLP(o.total)}</strong>
            </li>
          ))}
        </ul>
      )}
      <Link to="/admin/usuarios">← Volver a usuarios</Link>
    </>
  );
}
