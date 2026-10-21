import { precioCLP } from '../utils/formato';

/** Datos del cliente, dirección, detalle y total de una orden (compra, error y boleta). */
// Prop: orden = objeto con los datos del cliente, la dirección, los productos y el total
export default function ResumenOrden({ orden }) {
  // Saca cada dato de la orden en su propia variable para usarlos más fácil
  const { nombre, apellidos, correo, calle, comuna, region, indicaciones, items, total } =
    orden;
  return (
    <>
      {/* Datos del cliente y de la dirección de envío */}
      <dl className="row">
        <dt className="col-sm-3">Cliente</dt>
        <dd className="col-sm-9">
          {nombre} {apellidos} · {correo}
        </dd>
        <dt className="col-sm-3">Dirección</dt>
        <dd className="col-sm-9">
          {calle}, {comuna}, {region}
        </dd>
        {/* Las indicaciones solo se muestran si el cliente escribió alguna */}
        {indicaciones && (
          <>
            <dt className="col-sm-3">Indicaciones</dt>
            <dd className="col-sm-9">{indicaciones}</dd>
          </>
        )}
      </dl>
      {/* Tabla con el detalle de los productos comprados */}
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
            {/* Una fila por cada producto de la orden */}
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
      {/* Total final de la orden */}
      <p className="h5 text-end">Total: {precioCLP(total)}</p>
    </>
  );
}
