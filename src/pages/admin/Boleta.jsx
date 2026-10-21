import { Link, useParams } from 'react-router-dom';
import ResumenOrden from '../../components/ResumenOrden';
import db from '../../data/db';

// Página del admin que muestra la boleta de una orden
export default function Boleta() {
  // Saca el id de la orden desde la URL
  const { id } = useParams();
  // Busca la orden guardada
  const orden = db.obtener('ordenes', id);

  // Si la orden no existe, muestra un aviso
  if (!orden) return <p className="alert alert-warning">Orden no encontrada.</p>;
  return (
    <section className="card card-body shadow-sm">
      {/* Número de boleta con su estado al lado */}
      <h1 className="h3">
        Boleta N° {orden.id}{' '}
        <span className="badge text-bg-secondary">{orden.estado}</span>
      </h1>
      {/* Detalle del cliente, productos y total */}
      <ResumenOrden orden={orden} />
      <Link to="/admin/ordenes">← Volver a órdenes</Link>
    </section>
  );
}
