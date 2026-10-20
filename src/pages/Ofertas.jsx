import ListaProductos from '../components/ListaProductos';
import useCarrito from '../hooks/useCarrito';
import useColeccion from '../hooks/useColeccion';
import { enOferta } from '../utils/productos';

export default function Ofertas() {
  const productos = useColeccion('productos');
  const { agregar } = useCarrito();
  return (
    <>
      <h1 className="section-title">Ofertas</h1>
      <ListaProductos productos={productos.filter(enOferta)} onAgregar={agregar} />
    </>
  );
}
