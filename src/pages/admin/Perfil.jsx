import { useState } from 'react';
import FormularioEntidad from '../../components/FormularioEntidad';
import useAuth from '../../hooks/useAuth';
import db from '../../data/db';
import { ENTIDADES } from './entidades';

// Reutiliza los campos y reglas del formulario de usuarios
const { campos, reglas } = ENTIDADES.usuarios;
const camposPerfil = campos();

/** Edita los datos de la cuenta con sesión iniciada reutilizando el formulario de usuarios. */
export default function Perfil() {
  // Usuario que tiene la sesión iniciada
  const { usuario } = useAuth();
  // Dice si ya se guardaron los cambios
  const [guardado, setGuardado] = useState(false);
  // Llena el formulario con los datos actuales del usuario
  const iniciales = Object.fromEntries(
    camposPerfil.map((c) => [c.nombre, usuario[c.nombre]]),
  );

  // Guarda los cambios y muestra el aviso
  function guardar(datos) {
    db.actualizar('usuarios', usuario.id, datos);
    setGuardado(true);
  }

  return (
    <div className="col-lg-6">
      <h1 className="h3">Perfil</h1>
      {/* Formulario con los datos de la cuenta */}
      <FormularioEntidad
        campos={camposPerfil}
        reglas={reglas}
        valoresIniciales={iniciales}
        onGuardar={guardar}
        textoBoton="Guardar cambios"
      />
      {/* Aviso que aparece después de guardar */}
      {guardado && (
        <p className="alert alert-success mt-3" role="status">
          Perfil actualizado.
        </p>
      )}
    </div>
  );
}
