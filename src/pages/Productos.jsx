import { useSearchParams } from 'react-router-dom';
import ListaProductos from '../components/ListaProductos';
import useCarrito from '../hooks/useCarrito';
import useColeccion from '../hooks/useColeccion';
import { filtrarProductos } from '../utils/productos';

/** Catálogo con filtros de búsqueda; los filtros viven en la URL (?q=...&categoria=...). */
export default function Productos() {
  // Trae los productos y las categorías guardadas
  const productos = useColeccion('productos');
  const categorias = useColeccion('categorias');
  // Función para agregar productos al carrito
  const { agregar } = useCarrito();
  // Lee y cambia los filtros que están en la URL
  const [params, setParams] = useSearchParams();
  // Texto buscado y categoría elegida, vacíos si no hay
  const texto = params.get('q') ?? '';
  const categoriaId = params.get('categoria') ?? '';

  // Cambia un filtro de la URL o lo borra
  function cambiarFiltro(nombre, valor) {
    const nuevos = new URLSearchParams(params);
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
          <select
            className="form-select"
            aria-label="Filtrar por categoría"
            value={categoriaId}
            onChange={(e) => cambiarFiltro('categoria', e.target.value)}
          >
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
      <ListaProductos
        productos={filtrarProductos(productos, { texto, categoriaId })}
        onAgregar={agregar}
      />
    </>
  );
}
