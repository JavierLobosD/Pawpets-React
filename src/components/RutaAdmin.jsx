import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/** Protege las rutas de administración: solo entra un usuario con rol admin. */
export default function RutaAdmin() {
  const { usuario } = useAuth();
  return usuario?.rol === 'admin' ? <Outlet /> : <Navigate to="/login" replace />;
}
