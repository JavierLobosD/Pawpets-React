# PawPets – Frontend React (Evaluación Parcial 2, DSY1104)

Tienda online de mascotas migrada de HTML a **React + Vite + Bootstrap**, con pruebas
unitarias en **Jasmine + Karma**. Sigue la estructura del `proyectoCero` del profesor.

## Cómo ejecutarlo

```sh
npm install
npm run dev          # sitio en http://localhost:5173
npm test             # Jasmine + Karma (necesita Google Chrome instalado)
npm run lint
npm run build
```

Cuentas de prueba: administrador `admin@pawpets.cl` / `Admin123`; cliente `camila@correo.cl` / `Cliente123`.
Para probar el **pago con error**, en el checkout elige el medio de pago "Tarjeta sin fondos (simula error)".

## Organización (cada carpeta tiene una sola responsabilidad)

| Ruta              | Contenido                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `src/App.jsx`     | Mapa de navegación (react-router): vistas de la tienda y del administrador (Figuras 3 y 10). |
| `src/pages/`      | Una vista por pantalla de la tienda. `src/pages/admin/`: vistas del panel.                   |
| `src/components/` | Componentes reutilizables: `Producto`, `ListaProductos`, `Header`, `CampoFormulario`, etc.   |
| `src/layouts/`    | `TiendaLayout` (header + footer) y `AdminLayout` (menú lateral).                             |
| `src/context/`    | `AuthProvider` (sesión) y `CarritoProvider` (carrito). Los hooks están en `src/hooks/`.      |
| `src/data/`       | `seed.js` (datos iniciales) y `db.js` (**CRUD** + persistencia en localStorage).             |
| `src/utils/`      | Funciones puras: validaciones, formato de precios, filtros, reportes.                        |
| `src/test/`       | Pruebas unitarias (`*.spec.jsx`).                                                            |

## Dónde está cada punto de la rúbrica

- **Framework JS bien estructurado (IE2.1.1 / IE2.1.3):** React 19 + Vite; todas las vistas del diagrama de flujo.
- **Props y estados (IE2.1.2 / IE2.1.4):**
  - Props: `Producto` recibe sus datos y `onAgregar`; `ListaProductos` recibe `productos`.
  - Estado local (`useState`): `Producto` (imagen fallida), `Header` (menú móvil), `DetalleProducto` (cantidad).
  - Estado compartido (Context): sesión y carrito.
  - Formularios controlados con el hook `useFormulario` + reglas de `utils/validaciones.js`.
- **Bootstrap responsive:** grilla (`row`/`col-*`), `navbar-expand-xl`, `table-responsive`, `form-control`, etc. La paleta de PawPets sobrescribe las variables de Bootstrap en `src/index.css`.
- **Archivo de datos + CRUD + persistencia:** `src/data/db.js` (`listar`, `obtener`, `crear`, `actualizar`, `eliminar`). `useColeccion` conecta `db` con React para que la interfaz se actualice sola.
- **Pruebas unitarias (IE2.2.1 / IE2.2.2):** 40 pruebas en `src/test/`.
- **Proceso de testeo (IE2.3.1 / IE2.3.2):**
  - Configuración del entorno: `karma.conf.cjs` (Jasmine + webpack + Babel + Istanbul).
  - Mocks: `jasmine.createSpy` (callbacks, `iniciarSesion`, `cerrarSesion`), contextos simulados (`src/test/ayudas.jsx`) y `spyOn(Storage.prototype, 'setItem')`.
  - Cobertura: se genera en `coverage/html/index.html` al ejecutar `npm test`.

## Notas

- Las contraseñas se guardan en texto plano en localStorage **solo porque `db.js` simula una base de datos**; con backend real irían cifradas.
- La cobertura mide los archivos que las pruebas importan; las páginas sin prueba propia no aparecen en el reporte.
- Las imágenes de categorías y productos son URLs externas (Unsplash); los productos sin imagen muestran un reemplazo.
