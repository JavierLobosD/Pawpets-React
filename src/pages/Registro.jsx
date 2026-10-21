import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario';
import CamposDireccion from '../components/CamposDireccion';
import useAuth from '../hooks/useAuth';
import useFormulario from '../hooks/useFormulario';
import { coincideCon, correo, minimo, requerido } from '../utils/validaciones';

// Valores con que parte vacío el formulario de registro
const INICIAL = {
  nombre: '',
  apellidos: '',
  correo: '',
  clave: '',
  confirmar: '',
  calle: '',
  region: '',
  comuna: '',
};
// Validaciones: clave de 6 letras mínimo y que coincidan
const REGLAS = {
  nombre: [requerido],
  apellidos: [requerido],
  correo: [requerido, correo],
  clave: [requerido, minimo(6)],
  confirmar: [coincideCon('clave', 'Las contraseñas')],
  calle: [requerido],
  region: [requerido],
  comuna: [requerido],
};

// Página para crear una cuenta nueva
export default function Registro() {
  // Función que guarda el usuario nuevo
  const { registrar } = useAuth();
  // Para mandar al usuario a otra página
  const navegar = useNavigate();
  // Se pone en true si el correo ya está registrado
  const [correoRepetido, setCorreoRepetido] = useState(false);

  // Maneja el formulario de registro
  const { valores, errores, cambiar, enviar } = useFormulario(
    INICIAL,
    REGLAS,
    // Saca "confirmar" porque no se guarda, solo era para validar
    ({ confirmar: _repetida, ...datos }) => {
      // Si se registró va al inicio; si no, muestra error
      if (registrar(datos)) navegar('/');
      else setCorreoRepetido(true);
    },
  );

  return (
    <section className="col-lg-6 mx-auto">
      <h1 className="section-title">Crear cuenta</h1>
      <form className="card card-body shadow-sm" onSubmit={enviar} noValidate>
        {/* Nombre y apellidos lado a lado */}
        <div className="row">
          <div className="col-md-6">
            <CampoFormulario
              etiqueta="Nombre"
              nombre="nombre"
              valor={valores.nombre}
              error={errores.nombre}
              onChange={cambiar}
            />
          </div>
          <div className="col-md-6">
            <CampoFormulario
              etiqueta="Apellidos"
              nombre="apellidos"
              valor={valores.apellidos}
              error={errores.apellidos}
              onChange={cambiar}
            />
          </div>
        </div>
        <CampoFormulario
          etiqueta="Correo electrónico"
          nombre="correo"
          tipo="email"
          valor={valores.correo}
          error={errores.correo}
          onChange={cambiar}
        />
        {/* Contraseña y su confirmación */}
        <div className="row">
          <div className="col-md-6">
            <CampoFormulario
              etiqueta="Contraseña"
              nombre="clave"
              tipo="password"
              valor={valores.clave}
              error={errores.clave}
              onChange={cambiar}
            />
          </div>
          <div className="col-md-6">
            <CampoFormulario
              etiqueta="Repetir contraseña"
              nombre="confirmar"
              tipo="password"
              valor={valores.confirmar}
              error={errores.confirmar}
              onChange={cambiar}
            />
          </div>
        </div>
        {/* Calle, región y comuna */}
        <CamposDireccion valores={valores} errores={errores} cambiar={cambiar} />
        {/* Error si ya hay una cuenta con ese correo */}
        {correoRepetido && (
          <p className="alert alert-danger" role="alert">
            Ya existe una cuenta con ese correo.
          </p>
        )}
        <button type="submit" className="btn btn-primary">
          Crear cuenta
        </button>
        {/* Link para ir al login */}
        <p className="mt-3 mb-0 text-center">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </section>
  );
}
