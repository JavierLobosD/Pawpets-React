// useState: hook de React para guardar datos que cambian (estado)
import { useState } from 'react';
// validar: revisa todos los campos con sus reglas (utils/validaciones.js)
import { validar } from '../utils/validaciones';

/**
 * Maneja el estado de un formulario controlado: valores, errores y envío.
 * onEnviar solo se ejecuta cuando todas las reglas se cumplen.
 */
// Parámetros: valores de partida, reglas y qué hacer al enviar
// Hook propio: lo usan Login, Registro, Contacto, Checkout y los formularios del admin
export default function useFormulario(valoresIniciales, reglas, onEnviar) {
  // Lo que el usuario lleva escrito en cada campo
  // valores = dato actual; setValores = función para cambiarlo y redibujar
  const [valores, setValores] = useState(valoresIniciales);
  // Mensajes de error de cada campo
  // Parte vacío ({}) porque al inicio no se muestra ningún error
  const [errores, setErrores] = useState({});

  // Se llama cuando el usuario escribe en un campo
  function cambiar(evento) {
    // Saca el nombre del campo y su nuevo valor
    // name es el atributo name del input; value es lo que tiene escrito
    const { name, value } = evento.target;
    // Actualiza solo ese campo, dejando los demás igual
    // ...actuales copia los campos; [name]: value reemplaza solo el que cambió
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
    // Guarda los errores para que se muestren bajo cada campo
    setErrores(nuevosErrores);
    // Si no hay errores, recién ahí se envía
    // onEnviar es la función que entregó la página (por ejemplo, iniciar sesión)
    if (Object.keys(nuevosErrores).length === 0) onEnviar(valores);
  }

  // Lo que pueden usar los formularios
  return { valores, errores, cambiar, enviar };
}
