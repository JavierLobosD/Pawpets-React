// useState: hook de React para guardar datos que cambian (estado)
import { useState } from 'react';
// FormularioEntidad: componente propio que arma el formulario según la configuración
import FormularioEntidad from '../../components/FormularioEntidad';
// useAuth: hook propio para saber quién tiene la sesión iniciada
import useAuth from '../../hooks/useAuth';
// db: base de datos simulada, para guardar los cambios del usuario
import db from '../../data/db';
// ENTIDADES: configuración de productos, categorías y usuarios (entidades.jsx)
import { ENTIDADES } from './entidades';

// Reutiliza los campos y reglas del formulario de usuarios
const { campos, reglas } = ENTIDADES.usuarios;
// campos es una función; los de usuarios no necesitan categorías, por eso va sin argumentos
const camposPerfil = campos();

/** Edita los datos de la cuenta con sesión iniciada reutilizando el formulario de usuarios. */
// Ruta: /admin/perfil
export default function Perfil() {
  // Usuario que tiene la sesión iniciada
  // Aquí siempre hay usuario, porque RutaAdmin solo deja entrar a un admin conectado
  const { usuario } = useAuth();
  // Dice si ya se guardaron los cambios
  // Parte en false: el aviso no se ve hasta guardar
  const [guardado, setGuardado] = useState(false);
  // Llena el formulario con los datos actuales del usuario
  // Arma { nombre: ..., apellidos: ..., correo: ... } con los valores del usuario
  const iniciales = Object.fromEntries(
    camposPerfil.map((c) => [c.nombre, usuario[c.nombre]]),
  );

  // Guarda los cambios y muestra el aviso
  function guardar(datos) {
    // Al actualizar en db, el AuthProvider ve el cambio y la sesión muestra los datos nuevos
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
