import { regiones } from '../data/seed';
import CampoFormulario from './CampoFormulario';

// Transforma una lista de textos al formato { valor, texto } que pide el select
const aOpciones = (lista) => lista.map((texto) => ({ valor: texto, texto }));

/** Calle, región y comuna. Las comunas disponibles dependen de la región elegida. */
// Props: valores = lo que lleva escrito el usuario, errores = mensajes de cada campo,
// cambiar = función del formulario padre para actualizar un campo
export default function CamposDireccion({ valores, errores, cambiar }) {
  // Se usa cuando el usuario cambia la región
  function cambiarRegion(evento) {
    // Primero guarda la región nueva
    cambiar(evento);
    // La comuna anterior ya no pertenece a la nueva región: se limpia.
    cambiar({ target: { name: 'comuna', value: '' } });
  }

  return (
    <>
      {/* Campo para la calle y el número de la casa */}
      <CampoFormulario
        etiqueta="Calle y número"
        nombre="calle"
        valor={valores.calle}
        error={errores.calle}
        onChange={cambiar}
      />
      {/* Fila con región y comuna, una al lado de la otra en pantallas medianas */}
      <div className="row">
        <div className="col-md-6">
          {/* Select de regiones: las opciones salen de los nombres de las regiones */}
          <CampoFormulario
            etiqueta="Región"
            nombre="region"
            tipo="select"
            opciones={aOpciones(Object.keys(regiones))}
            valor={valores.region}
            error={errores.region}
            onChange={cambiarRegion}
          />
        </div>
        <div className="col-md-6">
          {/* Select de comunas: muestra solo las de la región elegida (o nada si no hay región) */}
          <CampoFormulario
            etiqueta="Comuna"
            nombre="comuna"
            tipo="select"
            opciones={aOpciones(regiones[valores.region] ?? [])}
            valor={valores.comuna}
            error={errores.comuna}
            onChange={cambiar}
          />
        </div>
      </div>
    </>
  );
}
