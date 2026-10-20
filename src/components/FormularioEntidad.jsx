import useFormulario from '../hooks/useFormulario';
import CampoFormulario from './CampoFormulario';

/**
 * Formulario genérico dirigido por configuración (lista de campos y reglas).
 * Los campos marcados como numerico se convierten a número antes de guardar.
 */
export default function FormularioEntidad({
  campos,
  reglas,
  valoresIniciales,
  onGuardar,
  textoBoton = 'Guardar',
}) {
  const { valores, errores, cambiar, enviar } = useFormulario(
    valoresIniciales,
    reglas,
    (datos) => {
      const convertidos = { ...datos };
      campos
        .filter((c) => c.numerico)
        .forEach((c) => (convertidos[c.nombre] = Number(datos[c.nombre])));
      onGuardar(convertidos);
    },
  );

  return (
    <form onSubmit={enviar} noValidate>
      {campos.map(({ nombre, etiqueta, tipo, opciones }) => (
        <CampoFormulario
          key={nombre}
          nombre={nombre}
          etiqueta={etiqueta}
          tipo={tipo}
          opciones={opciones}
          valor={valores[nombre]}
          error={errores[nombre]}
          onChange={cambiar}
        />
      ))}
      <button type="submit" className="btn btn-primary">
        {textoBoton}
      </button>
    </form>
  );
}
