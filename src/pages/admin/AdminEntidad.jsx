import { Link, useParams } from 'react-router-dom';
import db from '../../data/db';
import useColeccion from '../../hooks/useColeccion';
import { ENTIDADES } from './entidades';

/** Listado de una entidad (productos, categorías o usuarios) con Crear, Editar y Eliminar. */
export default function AdminEntidad() {
  const { entidad } = useParams();
  const config = ENTIDADES[entidad];
  if (!config) return <p className="alert alert-warning">Sección no encontrada.</p>;
  return <Listado entidad={entidad} config={config} />;
}

function Listado({ entidad, config }) {
  const filas = useColeccion(entidad);
  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 mb-0">{config.titulo}</h1>
        <div className="d-flex gap-2">
          {config.enlaces?.map(([ruta, texto]) => (
            <Link key={ruta} to={ruta} className="btn btn-outline-dark">
              {texto}
            </Link>
          ))}
          <Link to={`/admin/${entidad}/nuevo`} className="btn btn-primary">
            Nuevo {config.singular}
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              {config.columnas.map(([campo, etiqueta]) => (
                <th scope="col" key={campo}>
                  {etiqueta}
                </th>
              ))}
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila) => (
              <tr key={fila.id}>
                {config.columnas.map(([campo, , formato = String]) => (
                  <td key={campo}>{formato(fila[campo])}</td>
                ))}
                <td className="d-flex flex-wrap gap-1">
                  <Link
                    to={`/admin/${entidad}/${fila.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Editar
                  </Link>
                  {config.accionesFila?.(fila)}
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
