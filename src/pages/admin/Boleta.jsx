// Link: ir a otra página sin recargar; useParams: leer el :id de la URL
import { Link, useParams } from 'react-router-dom';
// ResumenOrden: componente propio que muestra cliente, dirección, productos y total
import ResumenOrden from '../../components/ResumenOrden';
// db: base de datos simulada, de aquí se lee la orden
import db from '../../data/db';

// Página del admin que muestra la boleta de una orden
// Ruta: /admin/ordenes/:id
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
      {/* {' '} agrega un espacio entre el número y la etiqueta del estado */}
      <h1 className="h3">
        Boleta N° {orden.id}{' '}
        <span className="badge text-bg-secondary">{orden.estado}</span>
      </h1>
      {/* Detalle del cliente, productos y total */}
      <ResumenOrden orden={orden} />
      {/* Link para volver a la tabla de órdenes */}
      <Link to="/admin/ordenes">← Volver a órdenes</Link>
    </section>
  );
}
