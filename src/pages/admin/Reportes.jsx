import useColeccion from '../../hooks/useColeccion';
import { precioCLP } from '../../utils/formato';
import { resumenVentas } from '../../utils/reportes';

// Página con los reportes de ventas
export default function Reportes() {
  // Calcula los totales de ventas a partir de las órdenes
  const { ventasTotales, ordenesPagadas, ordenesRechazadas, porProducto } = resumenVentas(
    useColeccion('ordenes'),
  );
  return (
    <>
      <h1 className="h3">Reportes</h1>
      {/* Tarjetas con los números principales */}
      <div className="row g-3 mb-4">
        {[
          ['Ventas totales', precioCLP(ventasTotales)],
          ['Órdenes pagadas', ordenesPagadas],
          ['Pagos rechazados', ordenesRechazadas],
        ].map(([titulo, valor]) => (
          <div className="col-md-4" key={titulo}>
            <div className="card card-body shadow-sm">
              <p className="mb-0 text-secondary">{titulo}</p>
              <p className="h3 mb-0">{valor}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Tabla con lo que vendió cada producto */}
      <h2 className="h5">Ventas por producto</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Unidades</th>
              <th scope="col">Ingresos</th>
            </tr>
          </thead>
          <tbody>
            {porProducto.map((p) => (
              <tr key={p.nombre}>
                <td>{p.nombre}</td>
                <td>{p.unidades}</td>
                <td>{precioCLP(p.ingresos)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Aviso si todavía no hay ventas */}
      {porProducto.length === 0 && (
        <p className="alert alert-info">Aún no hay ventas registradas.</p>
      )}
    </>
  );
}
