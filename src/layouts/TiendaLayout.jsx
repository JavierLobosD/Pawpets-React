import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

/** Estructura común de las vistas públicas: encabezado, contenido y pie de página. */
export default function TiendaLayout() {
  return (
    <>
      <Header />
      <main className="container py-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
