import { Link, useParams } from 'react-router-dom';
import useColeccion from '../../hooks/useColeccion';
import { precioCLP } from '../../utils/formato';

// Página con las compras pagadas de un usuario
export default function HistorialCompras() {
  // Saca el id del usuario desde la URL
  const { id } = useParams();
  // Busca el usuario con ese id
  const usuario = useColeccion('usuarios').find((u) => u.id === Number(id));
  // Solo las órdenes pagadas de ese usuario
  const compras = useColeccion('ordenes').filter(
    (o) => o.clienteId === Number(id) && o.estado === 'Pagada',
  );

  // Si el usuario no existe, muestra un aviso
  if (!usuario) return <p className="alert alert-warning">Usuario no encontrado.</p>;
  return (
    <>
      <h1 className="h3">
        Historial de compras de {usuario.nombre} {usuario.apellidos}
      </h1>
      {/* Aviso si no tiene compras; si tiene, la lista */}
      {compras.length === 0 ? (
        <p className="alert alert-info">Este usuario aún no tiene compras.</p>
      ) : (
        <ul className="list-group mb-3">
          {/* Cada compra con link a su boleta, fecha y total */}
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
