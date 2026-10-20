import { useContext } from 'react';
import { AuthContext } from '../context/contextos';

/** Acceso a la sesión: { usuario, iniciarSesion, registrar, cerrarSesion }. */
export default function useAuth() {
  return useContext(AuthContext);
}
