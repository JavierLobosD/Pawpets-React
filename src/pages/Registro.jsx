import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario';
import CamposDireccion from '../components/CamposDireccion';
import useAuth from '../hooks/useAuth';
import useFormulario from '../hooks/useFormulario';
import { coincideCon, correo, minimo, requerido } from '../utils/validaciones';

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

export default function Registro() {
  const { registrar } = useAuth();
  const navegar = useNavigate();
  const [correoRepetido, setCorreoRepetido] = useState(false);

  const { valores, errores, cambiar, enviar } = useFormulario(
    INICIAL,
    REGLAS,
    ({ confirmar: _repetida, ...datos }) => {
      if (registrar(datos)) navegar('/');
      else setCorreoRepetido(true);
    },
  );

  return (
    <section className="col-lg-6 mx-auto">
      <h1 className="section-title">Crear cuenta</h1>
      <form className="card card-body shadow-sm" onSubmit={enviar} noValidate>
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
        <CamposDireccion valores={valores} errores={errores} cambiar={cambiar} />
        {correoRepetido && (
          <p className="alert alert-danger" role="alert">
            Ya existe una cuenta con ese correo.
          </p>
        )}
        <button type="submit" className="btn btn-primary">
          Crear cuenta
        </button>
        <p className="mt-3 mb-0 text-center">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </section>
  );
}
