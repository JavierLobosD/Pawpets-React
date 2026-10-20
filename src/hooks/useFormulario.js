import { useState } from 'react';
import { validar } from '../utils/validaciones';

/**
 * Maneja el estado de un formulario controlado: valores, errores y envío.
 * onEnviar solo se ejecuta cuando todas las reglas se cumplen.
 */
export default function useFormulario(valoresIniciales, reglas, onEnviar) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});

  function cambiar(evento) {
    const { name, value } = evento.target;
    setValores((actuales) => ({ ...actuales, [name]: value }));
    // Al editar un campo se limpia su error para que el usuario vea que lo está corrigiendo.
    setErrores((actuales) => ({ ...actuales, [name]: '' }));
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validar(valores, reglas);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length === 0) onEnviar(valores);
  }

  return { valores, errores, cambiar, enviar };
}
