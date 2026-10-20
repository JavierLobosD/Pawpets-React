import { Link, useParams } from 'react-router-dom';
import ResumenOrden from '../../components/ResumenOrden';
import db from '../../data/db';

export default function Boleta() {
  const { id } = useParams();
  const orden = db.obtener('ordenes', id);

  if (!orden) return <p className="alert alert-warning">Orden no encontrada.</p>;
  return (
    <section className="card card-body shadow-sm">
      <h1 className="h3">
        Boleta N° {orden.id}{' '}
        <span className="badge text-bg-secondary">{orden.estado}</span>
      </h1>
      <ResumenOrden orden={orden} />
      <Link to="/admin/ordenes">← Volver a órdenes</Link>
    </section>
  );
}
