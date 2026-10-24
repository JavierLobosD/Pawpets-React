// Link: componente de react-router para ir a otra página sin recargar
import { Link } from 'react-router-dom';
// useColeccion: hook propio que trae una colección de db y se actualiza sola
import useColeccion from '../../hooks/useColeccion';
// precioCLP: da formato de pesos chilenos a un número
import { precioCLP } from '../../utils/formato';

// Página del admin con todas las órdenes
// Ruta: /admin/ordenes
export default function Ordenes() {
  // Trae todas las órdenes guardadas
  // Incluye las pagadas y las rechazadas
  const ordenes = useColeccion('ordenes');
  return (
    <>
      <h1 className="h3">Órdenes y boletas</h1>
      {/* Aviso si no hay órdenes; si hay, la tabla */}
      {ordenes.length === 0 ? (
        <p className="alert alert-info">Aún no hay órdenes.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            {/* Títulos de las columnas */}
            <thead>
              <tr>
                <th scope="col">N°</th>
                <th scope="col">Fecha</th>
                <th scope="col">Cliente</th>
                <th scope="col">Total</th>
                <th scope="col">Estado</th>
                <th scope="col">Boleta</th>
              </tr>
            </thead>
            <tbody>
              {/* Una fila por cada orden */}
              {ordenes.map((o) => (
                <tr key={o.id}>
                  {/* Número de la orden; scope="row" indica que es el título de la fila */}
                  <th scope="row">{o.id}</th>
                  {/* Fecha en formato chileno */}
                  <td>{new Date(o.fecha).toLocaleDateString('es-CL')}</td>
                  {/* Nombre del cliente que escribió en el checkout */}
                  <td>
                    {o.nombre} {o.apellidos}
                  </td>
                  <td>{precioCLP(o.total)}</td>
                  {/* 'Pagada' o 'Rechazada' */}
                  <td>{o.estado}</td>
                  <td>
                    {/* Link para ver la boleta de la orden */}
                    <Link
                      to={`/admin/ordenes/${o.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Ver boleta
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
