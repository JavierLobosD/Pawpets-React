// Link: ir a otra página sin recargar; useParams: leer el :id de la URL
import { Link, useParams } from 'react-router-dom';
// ResumenOrden: componente propio que muestra cliente, dirección, productos y total
import ResumenOrden from '../components/ResumenOrden';
// db: base de datos simulada, de aquí se lee la orden
import db from '../data/db';

/** Vista de compra exitosa (exito = true) o de pago con error (exito = false). */
// Prop: exito. App.jsx la usa en dos rutas:
// /compra/exitosa/:id con exito = true y /compra/error/:id con exito = false
export default function PagoResultado({ exito }) {
  // Saca el id de la orden desde la URL
  const { id } = useParams();
  // Busca la orden guardada con ese id
  // Se lee directo de db (sin useColeccion) porque la orden no cambia en esta página
  const orden = db.obtener('ordenes', id);

  // Si la orden no existe, muestra un aviso
  if (!orden) return <p className="alert alert-warning">Orden no encontrada.</p>;
  return (
    <section className="col-lg-8 mx-auto card card-body shadow-sm">
      {/* Título verde si salió bien, rojo si falló */}
      {/* Las clases y el texto cambian según el valor de exito */}
      <h1 className={`h3 ${exito ? 'text-success' : 'text-danger'}`}>
        {exito
          ? `Se ha realizado la compra. Nro #${orden.id}`
          : `No se pudo realizar el pago. Nro #${orden.id}`}
      </h1>
      {/* Detalle completo de la orden */}
      <ResumenOrden orden={orden} />
      {/* Botones: imprimir boleta o reintentar el pago */}
      <div className="d-flex flex-wrap gap-2 justify-content-center">
        {/* Si salió bien: window.print() abre la ventana de imprimir del navegador */}
        {/* Si falló: link para volver al checkout (el carrito sigue lleno) */}
        {exito ? (
          <button type="button" className="btn btn-danger" onClick={() => window.print()}>
            Imprimir boleta
          </button>
        ) : (
          <Link to="/checkout" className="btn btn-success">
            Volver a realizar el pago
          </Link>
        )}
        {/* Este botón aparece en los dos casos */}
        <Link to="/" className="btn btn-outline-dark">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
