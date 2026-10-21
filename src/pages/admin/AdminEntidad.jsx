import { Link, useParams } from 'react-router-dom';
import db from '../../data/db';
import useColeccion from '../../hooks/useColeccion';
import { ENTIDADES } from './entidades';

/** Listado de una entidad (productos, categorías o usuarios) con Crear, Editar y Eliminar. */
export default function AdminEntidad() {
  // Saca de la URL qué entidad mostrar
  const { entidad } = useParams();
  // Busca la configuración de esa entidad
  const config = ENTIDADES[entidad];
  // Si no existe la entidad, muestra un aviso
  if (!config) return <p className="alert alert-warning">Sección no encontrada.</p>;
  return <Listado entidad={entidad} config={config} />;
}

// Tabla con los registros de la entidad y sus botones
// Props: entidad = colección, config = cómo mostrarla
function Listado({ entidad, config }) {
  // Trae todos los registros de la entidad
  const filas = useColeccion(entidad);
  return (
    <>
      {/* Encabezado con el título y los botones de arriba */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 mb-0">{config.titulo}</h1>
        <div className="d-flex gap-2">
          {/* Links extra, solo si la entidad los tiene */}
          {config.enlaces?.map(([ruta, texto]) => (
            <Link key={ruta} to={ruta} className="btn btn-outline-dark">
              {texto}
            </Link>
          ))}
          {/* Botón para crear un registro nuevo */}
          <Link to={`/admin/${entidad}/nuevo`} className="btn btn-primary">
            Nuevo {config.singular}
          </Link>
        </div>
      </div>
      {/* Tabla con todos los registros */}
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              {/* Un título de columna por cada columna configurada */}
              {config.columnas.map(([campo, etiqueta]) => (
                <th scope="col" key={campo}>
                  {etiqueta}
                </th>
              ))}
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Una fila por cada registro */}
            {filas.map((fila) => (
              <tr key={fila.id}>
                {/* Cada celda usa su formato, o String si no tiene */}
                {config.columnas.map(([campo, , formato = String]) => (
                  <td key={campo}>{formato(fila[campo])}</td>
                ))}
                <td className="d-flex flex-wrap gap-1">
                  {/* Botón para editar este registro */}
                  <Link
                    to={`/admin/${entidad}/${fila.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Editar
                  </Link>
                  {/* Botones extra de la fila, si la entidad tiene */}
                  {config.accionesFila?.(fila)}
                  {/* Botón para borrar este registro */}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => db.eliminar(entidad, fila.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
