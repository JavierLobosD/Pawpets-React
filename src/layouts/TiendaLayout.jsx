// Outlet: lugar donde react-router dibuja la página que corresponde a la URL
import { Outlet } from 'react-router-dom';
// Componentes propios del pie de página y del menú de arriba
import Footer from '../components/Footer';
import Header from '../components/Header';

/** Estructura común de las vistas públicas: encabezado, contenido y pie de página. */
// En App.jsx todas las rutas de la tienda van dentro de este layout,
// así el Header y el Footer se escriben una sola vez
export default function TiendaLayout() {
  // <> </> agrupa los tres bloques sin agregar un div extra
  return (
    <>
      {/* Menú de arriba */}
      <Header />
      {/* Aquí se muestra la página que se visita */}
      {/* Outlet se reemplaza por Home, Productos, Carrito, etc. según la URL */}
      <main className="container py-4">
        <Outlet />
      </main>
      {/* Pie de página */}
      <Footer />
    </>
  );
}
