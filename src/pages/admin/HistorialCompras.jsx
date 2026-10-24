// Link: ir a otra página sin recargar; useParams: leer el :id de la URL
import { Link, useParams } from 'react-router-dom';
// useColeccion: hook propio que trae una colección de db y se actualiza sola
import useColeccion from '../../hooks/useColeccion';
// precioCLP: da formato de pesos chilenos a un número
import { precioCLP } from '../../utils/formato';

// Página con las compras pagadas de un usuario
// Ruta: /admin/usuarios/:id/historial (se llega con el botón Historial de la tabla de usuarios)
export default function HistorialCompras() {
  // Saca el id del usuario desde la URL
  const { id } = useParams();
  // Busca el usuario con ese id
  // Number(id) porque en la URL el id es texto
  const usuario = useColeccion('usuarios').find((u) => u.id === Number(id));
  // Solo las órdenes pagadas de ese usuario
  // clienteId es el id del usuario que hizo la compra (se guarda en Checkout)
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
          {/* toLocaleDateString('es-CL') muestra la fecha como día-mes-año */}
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
      {/* Link para volver a la tabla de usuarios */}
      <Link to="/admin/usuarios">← Volver a usuarios</Link>
    </>
  );
}
