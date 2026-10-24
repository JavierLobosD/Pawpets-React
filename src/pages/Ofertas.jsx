// ListaProductos: componente propio que dibuja la grilla de productos
import ListaProductos from '../components/ListaProductos';
// Hooks propios: carrito compartido y colecciones de db
import useCarrito from '../hooks/useCarrito';
import useColeccion from '../hooks/useColeccion';
// enOferta: devuelve true si el producto tiene precio de oferta
import { enOferta } from '../utils/productos';

// Página que muestra solo los productos en oferta
// Ruta: /ofertas
export default function Ofertas() {
  // Trae todos los productos guardados
  const productos = useColeccion('productos');
  // Función para agregar productos al carrito
  const { agregar } = useCarrito();
  return (
    <>
      <h1 className="section-title">Ofertas</h1>
      {/* Lista filtrada para mostrar solo las ofertas */}
      {/* filter(enOferta) llama a enOferta con cada producto y deja los que dan true */}
      <ListaProductos productos={productos.filter(enOferta)} onAgregar={agregar} />
    </>
  );
}
