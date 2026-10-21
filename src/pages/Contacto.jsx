import { useState } from 'react';
import CampoFormulario from '../components/CampoFormulario';
import useFormulario from '../hooks/useFormulario';
import { correo, minimo, requerido } from '../utils/validaciones';

// Validaciones de cada campo; el mensaje pide mínimo 10 letras
const REGLAS = {
  nombre: [requerido],
  correo: [requerido, correo],
  asunto: [requerido],
  mensaje: [requerido, minimo(10)],
};
// Opciones de asunto en formato para el select
const ASUNTOS = [
  'Consulta sobre un producto',
  'Seguimiento de compra',
  'Otra consulta',
].map((a) => ({ valor: a, texto: a }));

// Página con el formulario de contacto
export default function Contacto() {
  // Dice si el mensaje ya se envió bien
  const [enviado, setEnviado] = useState(false);
  // No hay backend: al validar correctamente solo se confirma en pantalla.
  const { valores, errores, cambiar, enviar } = useFormulario(
    { nombre: '', correo: '', asunto: '', mensaje: '' },
    REGLAS,
    () => setEnviado(true),
  );

  return (
    <section className="col-lg-6 mx-auto">
      <h1 className="section-title">Contacto</h1>
      {/* Formulario de contacto con sus cuatro campos */}
      <form className="card card-body shadow-sm" onSubmit={enviar} noValidate>
        <CampoFormulario
          etiqueta="Nombre"
          nombre="nombre"
          valor={valores.nombre}
          error={errores.nombre}
          onChange={cambiar}
        />
        <CampoFormulario
          etiqueta="Correo electrónico"
          nombre="correo"
          tipo="email"
          valor={valores.correo}
          error={errores.correo}
          onChange={cambiar}
        />
        <CampoFormulario
          etiqueta="Asunto"
          nombre="asunto"
          tipo="select"
          opciones={ASUNTOS}
          valor={valores.asunto}
          error={errores.asunto}
          onChange={cambiar}
        />
        <CampoFormulario
          etiqueta="Mensaje"
          nombre="mensaje"
          tipo="textarea"
          valor={valores.mensaje}
          error={errores.mensaje}
          onChange={cambiar}
        />
        <button type="submit" className="btn btn-primary">
          Enviar mensaje
        </button>
        {/* Mensaje de agradecimiento después de enviar */}
        {enviado && (
          <p className="alert alert-success mt-3 mb-0" role="status">
            ¡Gracias! Recibimos tu mensaje y te responderemos pronto.
          </p>
        )}
      </form>
    </section>
  );
}
