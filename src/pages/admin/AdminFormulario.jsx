// useNavigate: cambiar de página desde el código; useParams: leer :entidad e :id de la URL
import { useNavigate, useParams } from 'react-router-dom';
// FormularioEntidad: componente propio que arma el formulario según la configuración
import FormularioEntidad from '../../components/FormularioEntidad';
// db: base de datos simulada, para leer, crear y actualizar registros
import db from '../../data/db';
// useColeccion: hook propio que trae una colección de db y se actualiza sola
import useColeccion from '../../hooks/useColeccion';
// ENTIDADES: configuración de productos, categorías y usuarios (entidades.jsx)
import { ENTIDADES } from './entidades';

/** Crea (/nuevo) o edita (/:id) un registro de la entidad indicada en la URL. */
// Rutas: /admin/:entidad/nuevo y /admin/:entidad/:id (las dos usan esta página)
export default function AdminFormulario() {
  // Saca la entidad y el id desde la URL
  // En /nuevo no hay :id, entonces id queda undefined
  const { entidad, id } = useParams();
  // Para volver al listado después de guardar
  const navegar = useNavigate();
  // Categorías para el select de productos
  const categorias = useColeccion('categorias');
  // Configuración de la entidad que se está editando
  const config = ENTIDADES[entidad];
  // Con id busca el registro; sin id es nuevo
  const existente = id ? db.obtener(entidad, id) : null;

  // Si la entidad o el registro no existen, avisa
  if (!config || (id && !existente))
    return <p className="alert alert-warning">Registro no encontrado.</p>;

  // Lista de campos que tendrá el formulario
  // Se le pasan las categorías (solo productos las usa para su select)
  const campos = config.campos(categorias);
  // Valor inicial: el guardado, el por defecto o vacío
  // Object.fromEntries arma un objeto { campo: valor } a partir de pares [campo, valor]
  const valoresIniciales = Object.fromEntries(
    campos.map((c) => [
      c.nombre,
      existente?.[c.nombre] ?? config.inicial[c.nombre] ?? '',
    ]),
  );

  // Guarda los cambios o crea el registro, y vuelve
  function guardar(datos) {
    // Si existía se actualiza; si no, se crea con los valores por defecto más lo escrito
    if (existente) db.actualizar(entidad, existente.id, datos);
    else db.crear(entidad, { ...config.inicial, ...datos });
    // Vuelve a la tabla de esa entidad
    navegar(`/admin/${entidad}`);
  }

  return (
    <div className="col-lg-6">
      {/* Título: "Editar" o "Nuevo" según el caso */}
      <h1 className="h3">
        {existente ? 'Editar' : 'Nuevo'} {config.singular}
      </h1>
      {/* La key reinicia el formulario al cambiar de registro */}
      {/* Si cambia la key, React crea el formulario de nuevo con sus valores iniciales */}
      <FormularioEntidad
        key={id ?? 'nuevo'}
        campos={campos}
        reglas={config.reglas}
        valoresIniciales={valoresIniciales}
        onGuardar={guardar}
      />
    </div>
  );
}
