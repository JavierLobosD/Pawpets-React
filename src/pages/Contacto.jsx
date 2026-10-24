// useState: hook de React para guardar datos que cambian (estado)
import { useState } from 'react';
// CampoFormulario: componente propio que dibuja un campo con etiqueta y error
import CampoFormulario from '../components/CampoFormulario';
// useFormulario: hook propio que maneja valores, errores y envío
import useFormulario from '../hooks/useFormulario';
// Reglas de validación que se usan en este formulario
import { correo, minimo, requerido } from '../utils/validaciones';

// Validaciones de cada campo; el mensaje pide mínimo 10 letras
// Cada campo tiene una lista de reglas que se revisan en orden
const REGLAS = {
  nombre: [requerido],
  correo: [requerido, correo],
  asunto: [requerido],
  mensaje: [requerido, minimo(10)],
};
// Opciones de asunto en formato para el select
// map convierte cada texto en { valor, texto }
const ASUNTOS = [
  'Consulta sobre un producto',
  'Seguimiento de compra',
  'Otra consulta',
].map((a) => ({ valor: a, texto: a }));

// Página con el formulario de contacto
// Ruta: /contacto
export default function Contacto() {
  // Dice si el mensaje ya se envió bien
  // Parte en false; cambia a true cuando el formulario pasa las validaciones
  const [enviado, setEnviado] = useState(false);
  // No hay backend: al validar correctamente solo se confirma en pantalla.
  // 1er argumento: valores iniciales (todo vacío); 2do: reglas; 3ro: qué hacer al enviar
  const { valores, errores, cambiar, enviar } = useFormulario(
    { nombre: '', correo: '', asunto: '', mensaje: '' },
    REGLAS,
    () => setEnviado(true),
  );

  // col-lg-6 mx-auto: el formulario ocupa media pantalla y queda centrado
  return (
    <section className="col-lg-6 mx-auto">
      <h1 className="section-title">Contacto</h1>
      {/* Formulario de contacto con sus cuatro campos */}
      {/* noValidate apaga la validación del navegador; se usa la de useFormulario */}
      <form className="card card-body shadow-sm" onSubmit={enviar} noValidate>
        {/* Campo nombre */}
        <CampoFormulario
          etiqueta="Nombre"
          nombre="nombre"
          valor={valores.nombre}
          error={errores.nombre}
          onChange={cambiar}
        />
        {/* Campo correo */}
        <CampoFormulario
          etiqueta="Correo electrónico"
          nombre="correo"
          tipo="email"
          valor={valores.correo}
          error={errores.correo}
          onChange={cambiar}
        />
        {/* Lista desplegable con los asuntos */}
        <CampoFormulario
          etiqueta="Asunto"
          nombre="asunto"
          tipo="select"
          opciones={ASUNTOS}
          valor={valores.asunto}
          error={errores.asunto}
          onChange={cambiar}
        />
        {/* Caja de texto grande para el mensaje */}
        <CampoFormulario
          etiqueta="Mensaje"
          nombre="mensaje"
          tipo="textarea"
          valor={valores.mensaje}
          error={errores.mensaje}
          onChange={cambiar}
        />
        {/* Botón que envía el formulario (llama a enviar) */}
        <button type="submit" className="btn btn-primary">
          Enviar mensaje
        </button>
        {/* Mensaje de agradecimiento después de enviar */}
        {/* role="status" hace que los lectores de pantalla lo anuncien */}
        {enviado && (
          <p className="alert alert-success mt-3 mb-0" role="status">
            ¡Gracias! Recibimos tu mensaje y te responderemos pronto.
          </p>
        )}
      </form>
    </section>
  );
}
