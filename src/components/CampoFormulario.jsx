/**
 * Campo de formulario con etiqueta y mensaje de error (clases Bootstrap).
 * tipo: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select'
 * opciones (solo select): [{ valor, texto }]
 */
// Props: etiqueta = texto que se ve arriba, nombre = id/name del campo,
// tipo = qué control dibujar, valor = lo escrito, error = mensaje si está malo,
// onChange = función que avisa los cambios, opciones = lista para el select,
// resto = cualquier otra prop extra que se pasa tal cual al control
// tipo = 'text' es el valor por defecto si no se manda tipo
export default function CampoFormulario({
  etiqueta,
  nombre,
  tipo = 'text',
  valor,
  error,
  onChange,
  opciones,
  ...resto
}) {
  // Elige la clase de Bootstrap según si es select o input, y la pone en rojo si hay error
  // 'is-invalid' es la clase de Bootstrap que pinta el borde rojo
  const clase = `${tipo === 'select' ? 'form-select' : 'form-control'} ${error ? 'is-invalid' : ''}`;
  // Props que comparten todos los tipos de control, así no las repito 3 veces
  // id y name usan el mismo nombre; useFormulario lee el name para saber qué campo cambió
  const comunes = {
    id: nombre,
    name: nombre,
    value: valor,
    onChange,
    className: clase,
    ...resto,
  };

  // Aquí se guarda el control que se va a mostrar (select, textarea o input)
  let control;
  if (tipo === 'select') {
    // Lista desplegable con una opción vacía al inicio y luego las opciones recibidas
    // {...comunes} pone todas las props comunes en el select
    control = (
      <select {...comunes}>
        <option value="">Selecciona una opción</option>
        {/* Una opción por cada elemento; key ayuda a React a identificar cada una */}
        {opciones.map((op) => (
          <option key={op.valor} value={op.valor}>
            {op.texto}
          </option>
        ))}
      </select>
    );
  } else if (tipo === 'textarea') {
    // Caja de texto grande para escribir varias líneas
    control = <textarea rows={3} {...comunes} />;
  } else {
    // Para cualquier otro tipo se usa un input normal (text, email, password, number)
    control = <input type={tipo} {...comunes} />;
  }

  // Lo que se dibuja: etiqueta, control y error dentro de un bloque con margen abajo
  return (
    <div className="mb-3">
      {/* Etiqueta del campo, conectada al control con htmlFor */}
      <label htmlFor={nombre} className="form-label fw-semibold">
        {etiqueta}
      </label>
      {/* El control que se eligió arriba */}
      {control}
      {/* Mensaje de error, solo aparece si hay alguno */}
      {/* Si error es '' (falso), && no dibuja nada */}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
