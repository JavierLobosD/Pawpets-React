// Link: ir a otra página sin recargar; useParams: leer :entidad de la URL
import { Link, useParams } from 'react-router-dom';
// db: base de datos simulada, aquí se usa para eliminar registros
import db from '../../data/db';
// useColeccion: hook propio que trae una colección de db y se actualiza sola
import useColeccion from '../../hooks/useColeccion';
// ENTIDADES: configuración de productos, categorías y usuarios (entidades.jsx)
import { ENTIDADES } from './entidades';

/** Listado de una entidad (productos, categorías o usuarios) con Crear, Editar y Eliminar. */
// Ruta: /admin/:entidad. Una sola página sirve para las tres entidades
export default function AdminEntidad() {
  // Saca de la URL qué entidad mostrar
  // Ejemplo: en /admin/productos, entidad = 'productos'
  const { entidad } = useParams();
  // Busca la configuración de esa entidad
  const config = ENTIDADES[entidad];
  // Si no existe la entidad, muestra un aviso
  if (!config) return <p className="alert alert-warning">Sección no encontrada.</p>;
  // La tabla va en otro componente porque los hooks (useColeccion) no se pueden
  // llamar después de un return; así primero se revisa que la entidad exista
  return <Listado entidad={entidad} config={config} />;
}

// Tabla con los registros de la entidad y sus botones
// Props: entidad = colección, config = cómo mostrarla
function Listado({ entidad, config }) {
  // Trae todos los registros de la entidad
  // Si se elimina uno, db avisa y la tabla se actualiza sola
  const filas = useColeccion(entidad);
  return (
    <>
      {/* Encabezado con el título y los botones de arriba */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 mb-0">{config.titulo}</h1>
        <div className="d-flex gap-2">
          {/* Links extra, solo si la entidad los tiene */}
          {/* ?. evita un error si config.enlaces no existe (categorías y usuarios no tienen) */}
          {config.enlaces?.map(([ruta, texto]) => (
            <Link key={ruta} to={ruta} className="btn btn-outline-dark">
              {texto}
            </Link>
          ))}
          {/* Botón para crear un registro nuevo */}
          {/* Ejemplo: /admin/productos/nuevo abre AdminFormulario vacío */}
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
                {/* [campo, , formato] salta el 2do valor (el título), que aquí no se usa */}
                {/* Ejemplo: el precio usa precioCLP; el nombre usa String */}
                {config.columnas.map(([campo, , formato = String]) => (
                  <td key={campo}>{formato(fila[campo])}</td>
                ))}
                <td className="d-flex flex-wrap gap-1">
                  {/* Botón para editar este registro */}
                  {/* Ejemplo: /admin/productos/3 abre AdminFormulario con el producto 3 */}
                  <Link
                    to={`/admin/${entidad}/${fila.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Editar
                  </Link>
                  {/* Botones extra de la fila, si la entidad tiene */}
                  {/* ?.() solo llama a la función si existe (usuarios tiene el botón Historial) */}
                  {config.accionesFila?.(fila)}
                  {/* Botón para borrar este registro */}
                  {/* db.eliminar lo saca y avisa, así la tabla se redibuja sin esa fila */}
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
