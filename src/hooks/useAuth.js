// useContext: hook de React para leer un contexto
import { useContext } from 'react';
// AuthContext: el contexto de la sesión, creado en context/contextos.js
import { AuthContext } from '../context/contextos';

/** Acceso a la sesión: { usuario, iniciarSesion, registrar, cerrarSesion }. */
// Hook propio: un atajo para que los componentes escriban useAuth()
// en vez de useContext(AuthContext) en cada archivo
export default function useAuth() {
  // Lee lo que comparte el AuthProvider
  // Solo funciona en componentes que estén dentro de <AuthProvider>
  return useContext(AuthContext);
}
