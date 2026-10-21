import ListaProductos from '../components/ListaProductos';
import useCarrito from '../hooks/useCarrito';
import useColeccion from '../hooks/useColeccion';
import { enOferta } from '../utils/productos';

// Página que muestra solo los productos en oferta
export default function Ofertas() {
  // Trae todos los productos guardados
  const productos = useColeccion('productos');
  // Función para agregar productos al carrito
  const { agregar } = useCarrito();
  return (
    <>
      <h1 className="section-title">Ofertas</h1>
      {/* Lista filtrada para mostrar solo las ofertas */}
      <ListaProductos productos={productos.filter(enOferta)} onAgregar={agregar} />
    </>
  );
}
