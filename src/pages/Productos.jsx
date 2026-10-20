import { useSearchParams } from 'react-router-dom';
import ListaProductos from '../components/ListaProductos';
import useCarrito from '../hooks/useCarrito';
import useColeccion from '../hooks/useColeccion';
import { filtrarProductos } from '../utils/productos';

/** Catálogo con filtros de búsqueda; los filtros viven en la URL (?q=...&categoria=...). */
export default function Productos() {
  const productos = useColeccion('productos');
  const categorias = useColeccion('categorias');
  const { agregar } = useCarrito();
  const [params, setParams] = useSearchParams();
  const texto = params.get('q') ?? '';
  const categoriaId = params.get('categoria') ?? '';

  function cambiarFiltro(nombre, valor) {
    const nuevos = new URLSearchParams(params);
    if (valor) nuevos.set(nombre, valor);
    else nuevos.delete(nombre);
    setParams(nuevos, { replace: true });
  }

  return (
    <>
      <h1 className="section-title">Productos</h1>
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
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ListaProductos
        productos={filtrarProductos(productos, { texto, categoriaId })}
        onAgregar={agregar}
      />
    </>
  );
}
