// useSearchParams: hook de react-router para leer y cambiar lo que va después del ? en la URL
import { useSearchParams } from 'react-router-dom';
// ListaProductos: componente propio que dibuja la grilla de productos
import ListaProductos from '../components/ListaProductos';
// Hooks propios: carrito compartido y colecciones de db
import useCarrito from '../hooks/useCarrito';
import useColeccion from '../hooks/useColeccion';
// filtrarProductos: filtra la lista por texto y/o categoría
import { filtrarProductos } from '../utils/productos';

/** Catálogo con filtros de búsqueda; los filtros viven en la URL (?q=...&categoria=...). */
// Ruta: /productos. Guardar los filtros en la URL permite que el buscador del Header
// mande aquí con ?q=texto, y que el link se pueda compartir con el filtro puesto
export default function Productos() {
  // Trae los productos y las categorías guardadas
  const productos = useColeccion('productos');
  const categorias = useColeccion('categorias');
  // Función para agregar productos al carrito
  const { agregar } = useCarrito();
  // Lee y cambia los filtros que están en la URL
  // Funciona parecido a useState: params es el valor y setParams lo cambia
  const [params, setParams] = useSearchParams();
  // Texto buscado y categoría elegida, vacíos si no hay
  // params.get devuelve null si no existe, y ?? '' lo cambia por texto vacío
  const texto = params.get('q') ?? '';
  const categoriaId = params.get('categoria') ?? '';

  // Cambia un filtro de la URL o lo borra
  // nombre = 'q' o 'categoria'; valor = lo que eligió el usuario
  function cambiarFiltro(nombre, valor) {
    // Copia los filtros actuales para no perder el otro filtro
    const nuevos = new URLSearchParams(params);
    // Si hay valor lo pone; si quedó vacío lo saca de la URL
    if (valor) nuevos.set(nombre, valor);
    else nuevos.delete(nombre);
    // replace evita llenar el historial con cada letra
    setParams(nuevos, { replace: true });
  }

  return (
    <>
      <h1 className="section-title">Productos</h1>
      {/* Filtros: buscador por nombre y select de categoría */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          {/* Buscador: muestra el texto de la URL y cada letra actualiza el filtro 'q' */}
          <input
            className="form-control"
            type="search"
            placeholder="Buscar por nombre"
            aria-label="Buscar por nombre"
            value={texto}
            onChange={(e) => cambiarFiltro('q', e.target.value)}
          />
        </div>
        <div className="col-md-4">
          {/* Select de categoría: al cambiarlo actualiza el filtro 'categoria' */}
          <select
            className="form-select"
            aria-label="Filtrar por categoría"
            value={categoriaId}
            onChange={(e) => cambiarFiltro('categoria', e.target.value)}
          >
            {/* Opción vacía = sin filtro de categoría */}
            <option value="">Todas las categorías</option>
            {/* Una opción por cada categoría */}
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Productos que cumplen con los filtros */}
      {/* Se filtra cada vez que se dibuja, con los valores actuales de la URL */}
      <ListaProductos
        productos={filtrarProductos(productos, { texto, categoriaId })}
        onAgregar={agregar}
      />
    </>
  );
}
