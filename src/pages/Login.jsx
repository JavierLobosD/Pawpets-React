import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario';
import useAuth from '../hooks/useAuth';
import useFormulario from '../hooks/useFormulario';
import { correo, requerido } from '../utils/validaciones';

// Validaciones: correo válido y contraseña obligatoria
const REGLAS = { correo: [requerido, correo], clave: [requerido] };

// Página para iniciar sesión
export default function Login() {
  // Función que revisa correo y contraseña
  const { iniciarSesion } = useAuth();
  // Para mandar al usuario a otra página
  const navegar = useNavigate();
  // Es true si el correo o la clave están mal
  const [credencialesInvalidas, setCredencialesInvalidas] = useState(false);

  // Maneja el formulario de login
  const { valores, errores, cambiar, enviar } = useFormulario(
    { correo: '', clave: '' },
    REGLAS,
    ({ correo, clave }) => {
      // Intenta entrar con los datos escritos
      const usuario = iniciarSesion(correo, clave);
      // Admin va al panel, cliente al inicio; si no, error
      if (usuario) navegar(usuario.rol === 'admin' ? '/admin' : '/');
      else setCredencialesInvalidas(true);
    },
  );

  return (
    <section className="col-md-6 col-lg-4 mx-auto">
      <h1 className="section-title">Iniciar sesión</h1>
      {/* Formulario con correo y contraseña */}
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
        {/* Error si los datos no coinciden con ninguna cuenta */}
        {credencialesInvalidas && (
          <p className="alert alert-danger" role="alert">
            Correo o contraseña incorrectos.
          </p>
        )}
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
        {/* Link para ir a crear una cuenta */}
        <p className="mt-3 mb-0 text-center">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </form>
    </section>
  );
}
