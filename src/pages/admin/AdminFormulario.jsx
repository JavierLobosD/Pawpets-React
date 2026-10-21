import { useNavigate, useParams } from 'react-router-dom';
import FormularioEntidad from '../../components/FormularioEntidad';
import db from '../../data/db';
import useColeccion from '../../hooks/useColeccion';
import { ENTIDADES } from './entidades';

/** Crea (/nuevo) o edita (/:id) un registro de la entidad indicada en la URL. */
export default function AdminFormulario() {
  // Saca la entidad y el id desde la URL
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
  const campos = config.campos(categorias);
  // Valor inicial: el guardado, el por defecto o vacío
  const valoresIniciales = Object.fromEntries(
    campos.map((c) => [
      c.nombre,
      existente?.[c.nombre] ?? config.inicial[c.nombre] ?? '',
    ]),
  );

  // Guarda los cambios o crea el registro, y vuelve
  function guardar(datos) {
    if (existente) db.actualizar(entidad, existente.id, datos);
    else db.crear(entidad, { ...config.inicial, ...datos });
    navegar(`/admin/${entidad}`);
  }

  return (
    <div className="col-lg-6">
      {/* Título: "Editar" o "Nuevo" según el caso */}
      <h1 className="h3">
        {existente ? 'Editar' : 'Nuevo'} {config.singular}
      </h1>
      {/* La key reinicia el formulario al cambiar de registro */}
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
