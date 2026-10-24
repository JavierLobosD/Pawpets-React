// Navigate: redirige a otra ruta; Outlet: muestra la ruta hija que corresponda
import { Navigate, Outlet } from 'react-router-dom';
// useAuth: hook propio para saber quién tiene la sesión iniciada
import useAuth from '../hooks/useAuth';

/** Protege las rutas de administración: solo entra un usuario con rol admin. */
// En App.jsx envuelve a todas las rutas /admin
export default function RutaAdmin() {
  // Usuario que tiene la sesión iniciada (o null si no hay nadie)
  const { usuario } = useAuth();
  // Si es admin muestra la página pedida (Outlet); si no, lo manda al login
  // usuario?.rol no da error si usuario es null (simplemente da undefined)
  // replace reemplaza la ruta en el historial, así "Atrás" no vuelve al /admin bloqueado
  return usuario?.rol === 'admin' ? <Outlet /> : <Navigate to="/login" replace />;
}
