// De react-router: BrowserRouter (activa la navegación con la URL del navegador),
// Routes (agrupa las rutas) y Route (une una URL con una página)
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// RutaAdmin: deja pasar al panel solo a usuarios con rol admin
import RutaAdmin from './components/RutaAdmin';
// Providers: comparten la sesión y el carrito con toda la app
import { AuthProvider } from './context/AuthProvider';
import { CarritoProvider } from './context/CarritoProvider';
// Layouts: el "marco" común de cada parte (tienda con Header/Footer, admin con menú lateral)
import AdminLayout from './layouts/AdminLayout';
import TiendaLayout from './layouts/TiendaLayout';
// Páginas del panel de administración (src/pages/admin)
import AdminEntidad from './pages/admin/AdminEntidad';
import AdminFormulario from './pages/admin/AdminFormulario';
import Boleta from './pages/admin/Boleta';
import Dashboard from './pages/admin/Dashboard';
import HistorialCompras from './pages/admin/HistorialCompras';
import Ordenes from './pages/admin/Ordenes';
import Perfil from './pages/admin/Perfil';
import ProductosCriticos from './pages/admin/ProductosCriticos';
import Reportes from './pages/admin/Reportes';
// Páginas de la tienda (src/pages)
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
// Componente raíz: main.jsx lo dibuja dentro del div "root"
export default function App() {
  return (
    // Router para poder cambiar de página sin recargar
    // Todo lo que use Link, useNavigate o useParams debe estar dentro de él
    <BrowserRouter>
      {/* Comparte la sesión con toda la app */}
      {/* Por eso cualquier página puede usar useAuth() */}
      <AuthProvider>
        {/* Comparte el carrito con toda la app */}
        {/* Por eso cualquier página puede usar useCarrito() */}
        <CarritoProvider>
          {/* Routes revisa la URL y muestra solo la Route que coincide */}
          <Routes>
            {/* Páginas de la tienda, con menú y pie de página */}
            {/* Route sin path: no agrega nada a la URL, solo envuelve a sus hijas con TiendaLayout */}
            {/* Cada página hija se dibuja en el <Outlet /> del layout */}
            <Route element={<TiendaLayout />}>
              {/* index = la página que se ve en "/" */}
              <Route index element={<Home />} />
              <Route path="productos" element={<Productos />} />
              {/* :id es el número del producto en la URL */}
              {/* Ejemplo: /productos/3; la página lo lee con useParams() */}
              <Route path="productos/:id" element={<DetalleProducto />} />
              {/* Categorias sirve para las dos: sin id muestra todo, con id filtra */}
              <Route path="categorias" element={<Categorias />} />
              <Route path="categorias/:id" element={<Categorias />} />
              <Route path="ofertas" element={<Ofertas />} />
              <Route path="nosotros" element={<Nosotros />} />
              <Route path="blogs" element={<Blogs />} />
              {/* :id es el número del artículo */}
              <Route path="blogs/:id" element={<DetalleBlog />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="login" element={<Login />} />
              <Route path="registro" element={<Registro />} />
              <Route path="carrito" element={<Carrito />} />
              <Route path="checkout" element={<Checkout />} />
              {/* Misma página para compra exitosa y pago con error */}
              {/* La prop exito cambia el título y los botones; :id es el número de la orden */}
              <Route path="compra/exitosa/:id" element={<PagoResultado exito />} />
              <Route path="compra/error/:id" element={<PagoResultado exito={false} />} />
            </Route>

            {/* Páginas del admin, solo entra quien tiene rol admin */}
            {/* RutaAdmin revisa el rol: si es admin muestra la hija (Outlet); si no, manda a /login */}
            <Route path="admin" element={<RutaAdmin />}>
              {/* Todas usan el menú lateral del admin */}
              <Route element={<AdminLayout />}>
                {/* index = la página que se ve en "/admin" */}
                <Route index element={<Dashboard />} />
                <Route path="ordenes" element={<Ordenes />} />
                {/* Boleta de una orden: /admin/ordenes/5 */}
                <Route path="ordenes/:id" element={<Boleta />} />
                <Route path="productos/criticos" element={<ProductosCriticos />} />
                {/* Compras de un usuario: /admin/usuarios/2/historial */}
                <Route path="usuarios/:id/historial" element={<HistorialCompras />} />
                <Route path="reportes" element={<Reportes />} />
                <Route path="perfil" element={<Perfil />} />
                {/* Rutas generales para productos, categorías y usuarios */}
                {/* :entidad puede ser productos, categorias o usuarios (ver entidades.jsx) */}
                {/* Las rutas fijas de arriba (ordenes, reportes, perfil...) ganan sobre :entidad */}
                <Route path=":entidad" element={<AdminEntidad />} />
                {/* Formulario vacío para crear: /admin/productos/nuevo */}
                <Route path=":entidad/nuevo" element={<AdminFormulario />} />
                {/* Mismo formulario para editar: /admin/productos/3 */}
                <Route path=":entidad/:id" element={<AdminFormulario />} />
              </Route>
            </Route>
          </Routes>
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
