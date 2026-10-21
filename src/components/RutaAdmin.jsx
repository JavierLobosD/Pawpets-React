import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/** Protege las rutas de administración: solo entra un usuario con rol admin. */
export default function RutaAdmin() {
  // Usuario que tiene la sesión iniciada (o null si no hay nadie)
  const { usuario } = useAuth();
  // Si es admin muestra la página pedida (Outlet); si no, lo manda al login
  return usuario?.rol === 'admin' ? <Outlet /> : <Navigate to="/login" replace />;
}
