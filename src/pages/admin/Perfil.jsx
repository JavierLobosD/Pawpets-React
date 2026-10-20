import { useState } from 'react';
import FormularioEntidad from '../../components/FormularioEntidad';
import useAuth from '../../hooks/useAuth';
import db from '../../data/db';
import { ENTIDADES } from './entidades';

const { campos, reglas } = ENTIDADES.usuarios;
const camposPerfil = campos();

/** Edita los datos de la cuenta con sesión iniciada reutilizando el formulario de usuarios. */
export default function Perfil() {
  const { usuario } = useAuth();
  const [guardado, setGuardado] = useState(false);
  const iniciales = Object.fromEntries(
    camposPerfil.map((c) => [c.nombre, usuario[c.nombre]]),
  );

  function guardar(datos) {
    db.actualizar('usuarios', usuario.id, datos);
    setGuardado(true);
  }

  return (
    <div className="col-lg-6">
      <h1 className="h3">Perfil</h1>
      <FormularioEntidad
        campos={camposPerfil}
        reglas={reglas}
        valoresIniciales={iniciales}
        onGuardar={guardar}
        textoBoton="Guardar cambios"
      />
      {guardado && (
        <p className="alert alert-success mt-3" role="status">
          Perfil actualizado.
        </p>
      )}
    </div>
  );
}
