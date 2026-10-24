// useParams: hook de react-router para leer los datos de la URL (por ejemplo :id)
import { useParams } from 'react-router-dom';
// Componentes propios que dibujan las tarjetas de categorías y de productos
import ListaCategorias from '../components/ListaCategorias';
import ListaProductos from '../components/ListaProductos';
// Hooks propios: carrito compartido y colecciones de db
import useCarrito from '../hooks/useCarrito';
import useColeccion from '../hooks/useColeccion';
// filtrarProductos: filtra la lista por texto y/o categoría
import { filtrarProductos } from '../utils/productos';

/** /categorias muestra todos los productos; /categorias/:id solo los de esa categoría. */
// App.jsx usa esta misma página para las dos rutas
export default function Categorias() {
  // Saca el id de la categoría desde la URL
  // En /categorias no hay id, entonces id queda undefined
  const { id } = useParams();
  // Trae las categorías y los productos guardados
  const categorias = useColeccion('categorias');
  const productos = useColeccion('productos');
  // Función para agregar productos al carrito
  const { agregar } = useCarrito();
  // Busca la categoría elegida según el id de la URL
  // Number(id) porque en la URL el id es texto
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
      {/* Si id es undefined, filtrarProductos no filtra y muestra todos */}
      {/* onAgregar={agregar}: el botón de cada tarjeta agrega al carrito */}
      <ListaProductos
        productos={filtrarProductos(productos, { categoriaId: id })}
        onAgregar={agregar}
      />
    </>
  );
}
