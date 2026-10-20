import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RutaAdmin from './components/RutaAdmin';
import { AuthProvider } from './context/AuthProvider';
import { CarritoProvider } from './context/CarritoProvider';
import AdminLayout from './layouts/AdminLayout';
import TiendaLayout from './layouts/TiendaLayout';
import AdminEntidad from './pages/admin/AdminEntidad';
import AdminFormulario from './pages/admin/AdminFormulario';
import Boleta from './pages/admin/Boleta';
import Dashboard from './pages/admin/Dashboard';
import HistorialCompras from './pages/admin/HistorialCompras';
import Ordenes from './pages/admin/Ordenes';
import Perfil from './pages/admin/Perfil';
import ProductosCriticos from './pages/admin/ProductosCriticos';
import Reportes from './pages/admin/Reportes';
import Blogs from './pages/Blogs';
import Carrito from './pages/Carrito';
import Categorias from './pages/Categorias';
import Checkout from './pages/Checkout';
import Contacto from './pages/Contacto';
import DetalleBlog from './pages/DetalleBlog';
import DetalleProducto from './pages/DetalleProducto';
import Home from './pages/Home';
import Login from './pages/Login';
import Nosotros from './pages/Nosotros';
import Ofertas from './pages/Ofertas';
import PagoResultado from './pages/PagoResultado';
import Productos from './pages/Productos';
import Registro from './pages/Registro';

/** Define el mapa de navegación del diagrama: vistas de la tienda y del administrador. */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <Routes>
            <Route element={<TiendaLayout />}>
              <Route index element={<Home />} />
              <Route path="productos" element={<Productos />} />
              <Route path="productos/:id" element={<DetalleProducto />} />
              <Route path="categorias" element={<Categorias />} />
              <Route path="categorias/:id" element={<Categorias />} />
              <Route path="ofertas" element={<Ofertas />} />
              <Route path="nosotros" element={<Nosotros />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blogs/:id" element={<DetalleBlog />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="login" element={<Login />} />
              <Route path="registro" element={<Registro />} />
              <Route path="carrito" element={<Carrito />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="compra/exitosa/:id" element={<PagoResultado exito />} />
              <Route path="compra/error/:id" element={<PagoResultado exito={false} />} />
            </Route>

            <Route path="admin" element={<RutaAdmin />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="ordenes" element={<Ordenes />} />
                <Route path="ordenes/:id" element={<Boleta />} />
                <Route path="productos/criticos" element={<ProductosCriticos />} />
                <Route path="usuarios/:id/historial" element={<HistorialCompras />} />
                <Route path="reportes" element={<Reportes />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path=":entidad" element={<AdminEntidad />} />
                <Route path=":entidad/nuevo" element={<AdminFormulario />} />
                <Route path=":entidad/:id" element={<AdminFormulario />} />
              </Route>
            </Route>
          </Routes>
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
