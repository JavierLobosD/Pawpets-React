/**
 * Campo de formulario con etiqueta y mensaje de error (clases Bootstrap).
 * tipo: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select'
 * opciones (solo select): [{ valor, texto }]
 */
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
  const clase = `${tipo === 'select' ? 'form-select' : 'form-control'} ${error ? 'is-invalid' : ''}`;
  const comunes = {
    id: nombre,
    name: nombre,
    value: valor,
    onChange,
    className: clase,
    ...resto,
  };

  let control;
  if (tipo === 'select') {
    control = (
      <select {...comunes}>
        <option value="">Selecciona una opción</option>
        {opciones.map((op) => (
          <option key={op.valor} value={op.valor}>
            {op.texto}
          </option>
        ))}
      </select>
    );
  } else if (tipo === 'textarea') {
    control = <textarea rows={3} {...comunes} />;
  } else {
    control = <input type={tipo} {...comunes} />;
  }

  return (
    <div className="mb-3">
      <label htmlFor={nombre} className="form-label fw-semibold">
        {etiqueta}
      </label>
      {control}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
