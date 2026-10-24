// useFormulario: hook propio que maneja valores, errores y envío del formulario
import useFormulario from '../hooks/useFormulario';
// CampoFormulario: componente propio que dibuja un campo con etiqueta y error
import CampoFormulario from './CampoFormulario';

/**
 * Formulario genérico dirigido por configuración (lista de campos y reglas).
 * Los campos marcados como numerico se convierten a número antes de guardar.
 */
// Props: campos = lista de campos a dibujar, reglas = validaciones de cada campo,
// valoresIniciales = con qué parte lleno el formulario, onGuardar = qué hacer al guardar,
// textoBoton = lo que dice el botón (por defecto "Guardar")
// Lo usan las páginas del admin (crear/editar productos, categorías y usuarios) y Perfil
export default function FormularioEntidad({
  campos,
  reglas,
  valoresIniciales,
  onGuardar,
  textoBoton = 'Guardar',
}) {
  // El hook maneja los valores, los errores, los cambios y el envío del formulario
  const { valores, errores, cambiar, enviar } = useFormulario(
    valoresIniciales,
    reglas,
    // Esta función se llama cuando el formulario pasa las validaciones
    (datos) => {
      // Copia de los datos para no modificar los originales
      const convertidos = { ...datos };
      // Busca los campos numéricos y pasa su valor de texto a número
      // (los inputs siempre entregan texto, por ejemplo '3990')
      campos
        .filter((c) => c.numerico)
        .forEach((c) => (convertidos[c.nombre] = Number(datos[c.nombre])));
      // Le entrega los datos ya listos al componente padre
      onGuardar(convertidos);
    },
  );

  // noValidate apaga la validación del navegador; se usa la nuestra
  return (
    <form onSubmit={enviar} noValidate>
      {/* Dibuja un campo por cada elemento de la lista de campos */}
      {/* key={nombre} le da a React un identificador único por campo */}
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
      {/* Botón para enviar el formulario */}
      <button type="submit" className="btn btn-primary">
        {textoBoton}
      </button>
    </form>
  );
}
