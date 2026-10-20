import { useParams } from 'react-router-dom';
import ListaCategorias from '../components/ListaCategorias';
import ListaProductos from '../components/ListaProductos';
import useCarrito from '../hooks/useCarrito';
import useColeccion from '../hooks/useColeccion';
import { filtrarProductos } from '../utils/productos';

/** /categorias muestra todos los productos; /categorias/:id solo los de esa categoría. */
export default function Categorias() {
  const { id } = useParams();
  const categorias = useColeccion('categorias');
  const productos = useColeccion('productos');
  const { agregar } = useCarrito();
  const seleccionada = categorias.find((c) => c.id === Number(id));

  return (
    <>
      <h1 className="section-title">Categorías</h1>
      <ListaCategorias categorias={categorias} />
      <h2 className="section-title mt-5">
        {seleccionada ? seleccionada.nombre : 'Todos los productos'}
      </h2>
      <ListaProductos
        productos={filtrarProductos(productos, { categoriaId: id })}
        onAgregar={agregar}
      />
    </>
  );
}
