import { Link, useParams } from 'react-router-dom';
import ResumenOrden from '../components/ResumenOrden';
import db from '../data/db';

/** Vista de compra exitosa (exito = true) o de pago con error (exito = false). */
export default function PagoResultado({ exito }) {
  const { id } = useParams();
  const orden = db.obtener('ordenes', id);

  if (!orden) return <p className="alert alert-warning">Orden no encontrada.</p>;
  return (
    <section className="col-lg-8 mx-auto card card-body shadow-sm">
      <h1 className={`h3 ${exito ? 'text-success' : 'text-danger'}`}>
        {exito
          ? `Se ha realizado la compra. Nro #${orden.id}`
          : `No se pudo realizar el pago. Nro #${orden.id}`}
      </h1>
      <ResumenOrden orden={orden} />
      <div className="d-flex flex-wrap gap-2 justify-content-center">
        {exito ? (
          <button type="button" className="btn btn-danger" onClick={() => window.print()}>
            Imprimir boleta
          </button>
        ) : (
          <Link to="/checkout" className="btn btn-success">
            Volver a realizar el pago
          </Link>
        )}
        <Link to="/" className="btn btn-outline-dark">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
