import { useNavigate, useParams } from 'react-router-dom';
import FormularioEntidad from '../../components/FormularioEntidad';
import db from '../../data/db';
import useColeccion from '../../hooks/useColeccion';
import { ENTIDADES } from './entidades';

/** Crea (/nuevo) o edita (/:id) un registro de la entidad indicada en la URL. */
export default function AdminFormulario() {
  const { entidad, id } = useParams();
  const navegar = useNavigate();
  const categorias = useColeccion('categorias');
  const config = ENTIDADES[entidad];
  const existente = id ? db.obtener(entidad, id) : null;

  if (!config || (id && !existente))
    return <p className="alert alert-warning">Registro no encontrado.</p>;

  const campos = config.campos(categorias);
  const valoresIniciales = Object.fromEntries(
    campos.map((c) => [
      c.nombre,
      existente?.[c.nombre] ?? config.inicial[c.nombre] ?? '',
    ]),
  );

  function guardar(datos) {
    if (existente) db.actualizar(entidad, existente.id, datos);
    else db.crear(entidad, { ...config.inicial, ...datos });
    navegar(`/admin/${entidad}`);
  }

  return (
    <div className="col-lg-6">
      <h1 className="h3">
        {existente ? 'Editar' : 'Nuevo'} {config.singular}
      </h1>
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
