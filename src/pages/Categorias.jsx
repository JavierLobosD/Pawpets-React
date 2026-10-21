import { useParams } from 'react-router-dom';
import ListaCategorias from '../components/ListaCategorias';
import ListaProductos from '../components/ListaProductos';
import useCarrito from '../hooks/useCarrito';
import useColeccion from '../hooks/useColeccion';
import { filtrarProductos } from '../utils/productos';

/** /categorias muestra todos los productos; /categorias/:id solo los de esa categoría. */
export default function Categorias() {
  // Saca el id de la categoría desde la URL
  const { id } = useParams();
  // Trae las categorías y los productos guardados
  const categorias = useColeccion('categorias');
  const productos = useColeccion('productos');
  // Función para agregar productos al carrito
  const { agregar } = useCarrito();
  // Busca la categoría elegida según el id de la URL
  const seleccionada = categorias.find((c) => c.id === Number(id));

  return (
    <>
      <h1 className="section-title">Categorías</h1>
      {/* Tarjetas de todas las categorías */}
      <ListaCategorias categorias={categorias} />
      {/* Título: nombre de la categoría o "Todos los productos" */}
      <h2 className="section-title mt-5">
        {seleccionada ? seleccionada.nombre : 'Todos los productos'}
      </h2>
      {/* Productos filtrados por la categoría elegida */}
      <ListaProductos
        productos={filtrarProductos(productos, { categoriaId: id })}
        onAgregar={agregar}
      />
    </>
  );
}
