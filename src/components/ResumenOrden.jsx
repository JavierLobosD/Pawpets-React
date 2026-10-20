import { precioCLP } from '../utils/formato';

/** Datos del cliente, dirección, detalle y total de una orden (compra, error y boleta). */
export default function ResumenOrden({ orden }) {
  const { nombre, apellidos, correo, calle, comuna, region, indicaciones, items, total } =
    orden;
  return (
    <>
      <dl className="row">
        <dt className="col-sm-3">Cliente</dt>
        <dd className="col-sm-9">
          {nombre} {apellidos} · {correo}
        </dd>
        <dt className="col-sm-3">Dirección</dt>
        <dd className="col-sm-9">
          {calle}, {comuna}, {region}
        </dd>
        {indicaciones && (
          <>
            <dt className="col-sm-3">Indicaciones</dt>
            <dd className="col-sm-9">{indicaciones}</dd>
          </>
        )}
      </dl>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.productoId}>
                <td>{item.nombre}</td>
                <td>{precioCLP(item.precio)}</td>
                <td>{item.cantidad}</td>
                <td>{precioCLP(item.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="h5 text-end">Total: {precioCLP(total)}</p>
    </>
  );
}
