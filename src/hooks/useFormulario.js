import { useState } from 'react';
import { validar } from '../utils/validaciones';

/**
 * Maneja el estado de un formulario controlado: valores, errores y envío.
 * onEnviar solo se ejecuta cuando todas las reglas se cumplen.
 */
// Parámetros: valores de partida, reglas y qué hacer al enviar
export default function useFormulario(valoresIniciales, reglas, onEnviar) {
  // Lo que el usuario lleva escrito en cada campo
  const [valores, setValores] = useState(valoresIniciales);
  // Mensajes de error de cada campo
  const [errores, setErrores] = useState({});

  // Se llama cuando el usuario escribe en un campo
  function cambiar(evento) {
    // Saca el nombre del campo y su nuevo valor
    const { name, value } = evento.target;
    // Actualiza solo ese campo, dejando los demás igual
    setValores((actuales) => ({ ...actuales, [name]: value }));
    // Al editar un campo se limpia su error para que el usuario vea que lo está corrigiendo.
    setErrores((actuales) => ({ ...actuales, [name]: '' }));
  }

  // Se llama al enviar el formulario
  function enviar(evento) {
    // Evita que la página se recargue
    evento.preventDefault();
    // Revisa todos los campos con sus reglas
    const nuevosErrores = validar(valores, reglas);
    setErrores(nuevosErrores);
    // Si no hay errores, recién ahí se envía
    if (Object.keys(nuevosErrores).length === 0) onEnviar(valores);
  }

  // Lo que pueden usar los formularios
  return { valores, errores, cambiar, enviar };
}
