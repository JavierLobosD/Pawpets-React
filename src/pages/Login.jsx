import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario';
import useAuth from '../hooks/useAuth';
import useFormulario from '../hooks/useFormulario';
import { correo, requerido } from '../utils/validaciones';

const REGLAS = { correo: [requerido, correo], clave: [requerido] };

export default function Login() {
  const { iniciarSesion } = useAuth();
  const navegar = useNavigate();
  const [credencialesInvalidas, setCredencialesInvalidas] = useState(false);

  const { valores, errores, cambiar, enviar } = useFormulario(
    { correo: '', clave: '' },
    REGLAS,
    ({ correo, clave }) => {
      const usuario = iniciarSesion(correo, clave);
      if (usuario) navegar(usuario.rol === 'admin' ? '/admin' : '/');
      else setCredencialesInvalidas(true);
    },
  );

  return (
    <section className="col-md-6 col-lg-4 mx-auto">
      <h1 className="section-title">Iniciar sesión</h1>
      <form className="card card-body shadow-sm" onSubmit={enviar} noValidate>
        <CampoFormulario
          etiqueta="Correo electrónico"
          nombre="correo"
          tipo="email"
          valor={valores.correo}
          error={errores.correo}
          onChange={cambiar}
        />
        <CampoFormulario
          etiqueta="Contraseña"
          nombre="clave"
          tipo="password"
          valor={valores.clave}
          error={errores.clave}
          onChange={cambiar}
        />
        {credencialesInvalidas && (
          <p className="alert alert-danger" role="alert">
            Correo o contraseña incorrectos.
          </p>
        )}
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
        <p className="mt-3 mb-0 text-center">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </form>
    </section>
  );
}
