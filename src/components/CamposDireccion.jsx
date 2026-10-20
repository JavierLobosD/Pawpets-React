import { regiones } from '../data/seed';
import CampoFormulario from './CampoFormulario';

const aOpciones = (lista) => lista.map((texto) => ({ valor: texto, texto }));

/** Calle, región y comuna. Las comunas disponibles dependen de la región elegida. */
export default function CamposDireccion({ valores, errores, cambiar }) {
  function cambiarRegion(evento) {
    cambiar(evento);
    // La comuna anterior ya no pertenece a la nueva región: se limpia.
    cambiar({ target: { name: 'comuna', value: '' } });
  }

  return (
    <>
      <CampoFormulario
        etiqueta="Calle y número"
        nombre="calle"
        valor={valores.calle}
        error={errores.calle}
        onChange={cambiar}
      />
      <div className="row">
        <div className="col-md-6">
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
