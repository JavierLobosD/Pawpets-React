import { Link } from 'react-router-dom';
import useColeccion from '../../hooks/useColeccion';
import { precioCLP } from '../../utils/formato';

export default function Ordenes() {
  const ordenes = useColeccion('ordenes');
  return (
    <>
      <h1 className="h3">Órdenes y boletas</h1>
      {ordenes.length === 0 ? (
        <p className="alert alert-info">Aún no hay órdenes.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
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
              {ordenes.map((o) => (
                <tr key={o.id}>
                  <th scope="row">{o.id}</th>
                  <td>{new Date(o.fecha).toLocaleDateString('es-CL')}</td>
                  <td>
                    {o.nombre} {o.apellidos}
                  </td>
                  <td>{precioCLP(o.total)}</td>
                  <td>{o.estado}</td>
                  <td>
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
