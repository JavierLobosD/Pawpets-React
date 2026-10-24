# Cobertura de testing – PawPets React

Este documento explica cómo se prueba el proyecto, qué pruebas hay y cuánto código cubren.
Todos los números salen de una ejecución real de `npm test` hecha el **24-10-2026**
(Chrome Headless 156, Windows).

**Resultado de la ejecución:** `Executed 48 of 48 SUCCESS` → **48 pruebas en 13 archivos, 48 aprobadas, 0 fallidas**.

---

## 1. Herramientas

| Herramienta         | Qué hace (explicado simple)                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Jasmine**         | Es con lo que se escriben las pruebas. `describe` agrupa pruebas, `it` es una prueba, `expect` dice lo que se espera. También trae mocks: `createSpy` y `spyOn`. |
| **Karma**           | Es el que corre las pruebas. Abre Google Chrome sin ventana (ChromeHeadless), carga las pruebas, las ejecuta y muestra el resultado en la terminal.              |
| **webpack**         | Junta cada archivo `*.spec.jsx` con todo lo que importa (componentes, hooks, datos) en un solo paquete que el navegador puede cargar.                            |
| **Babel**           | Traduce el código: pasa el JSX (`<Header />`) y el JavaScript moderno a JavaScript normal que Chrome entiende.                                                  |
| **Istanbul**        | Mide la cobertura. Marca cada línea, función y rama del código y cuenta cuáles se ejecutaron en las pruebas (`babel-plugin-istanbul` + `karma-coverage`).       |
| **Testing Library** | (`@testing-library/react`) Dibuja los componentes en la prueba (`render`, `renderHook`), busca elementos como lo haría una persona (`getByRole`, `getByText`) y simula clics y escritura (`fireEvent`). |

Todo se configura en `karma.conf.cjs`. El archivo es `.cjs` porque Karma usa el formato
antiguo de Node (`module.exports`) y el `package.json` tiene `"type": "module"`.
En resumen, ese archivo dice:

- Las pruebas son todos los `src/test/**/*.spec.jsx`.
- Antes de ir al navegador pasan por webpack, que usa Babel para traducir el JSX.
- Babel usa el plugin de Istanbul para medir todo `src/`, menos las pruebas (`src/test/`) y
  `src/main.jsx` (solo monta la app en el HTML).
- Se muestran dos reportes: la lista de pruebas (`spec`) y la cobertura (`coverage`).
- La cobertura se guarda en `coverage/html` y también se muestra en la terminal.
- Usa ChromeHeadless y corre las pruebas una sola vez (`singleRun: true`).

---

## 2. Cantidad de pruebas

Hay **13 archivos de prueba** en `src/test/` (más `ayudas.jsx`, que no es una prueba: tiene
funciones de apoyo) con **48 pruebas** en total.

| Archivo                    | Qué prueba                                | Pruebas |
| -------------------------- | ----------------------------------------- | ------: |
| `Producto.spec.jsx`        | Componentes `Producto` y `ListaProductos` |       8 |
| `CarritoProvider.spec.jsx` | Carrito compartido (provider real)        |       5 |
| `db.spec.jsx`              | Fuente de datos con CRUD                  |       5 |
| `Header.spec.jsx`          | Componente `Header`                       |       5 |
| `validaciones.spec.jsx`    | Reglas de los formularios                 |       5 |
| `Carrito.spec.jsx`         | Página Carrito                            |       4 |
| `productos.spec.jsx`       | Lógica de productos y reportes            |       4 |
| `Login.spec.jsx`           | Página Login                              |       3 |
| `Contacto.spec.jsx`        | Página Contacto                           |       2 |
| `ListaCategorias.spec.jsx` | Componente `ListaCategorias`              |       2 |
| `Registro.spec.jsx`        | Página Registro                           |       2 |
| `RutaAdmin.spec.jsx`       | Protección del panel admin                |       2 |
| `AuthProvider.spec.jsx`    | Sesión del usuario (provider real)        |       1 |
| **Total**                  |                                           |  **48** |

### Detalle de cada prueba

**`Producto.spec.jsx` (8)**

- enOferta es true solo si hay precio de oferta
- renderiza el nombre y el precio formateado recibidos por props
- renderizado condicional: muestra el precio original tachado solo si hay oferta
- el botón ejecuta onAgregar con el id del producto (evento + mock)
- sin stock el botón se deshabilita
- estado interno: si la imagen falla se muestra el reemplazo
- renderiza una tarjeta por cada producto del conjunto de datos (`ListaProductos`)
- muestra un mensaje cuando no hay productos (`ListaProductos`)

**`CarritoProvider.spec.jsx` (5)**

- agregar suma cantidades y calcula el total con el precio vigente
- la cantidad no puede superar el stock disponible
- agregar más unidades a un producto ya en el carrito respeta el stock
- quitar y vaciar eliminan líneas
- el carrito se guarda en localStorage

**`db.spec.jsx` (5)**

- listar entrega los datos iniciales y rechaza colecciones inexistentes
- crear agrega un registro con id autoincremental
- actualizar modifica solo el registro indicado
- eliminar quita el registro
- cada cambio se persiste en localStorage y avisa a los suscriptores (mocks)

**`Header.spec.jsx` (5)**

- visitante: muestra Iniciar sesión y Crear cuenta, y el total del carrito
- usuario con sesión: muestra su nombre y el botón Salir que llama a cerrarSesion
- un administrador ve el enlace al panel
- el botón del menú móvil alterna el estado abierto/cerrado
- el buscador navega a /productos?q=texto al enviar el formulario

**`validaciones.spec.jsx` (5)**

- requerido rechaza vacíos y espacios, y acepta texto
- correo exige usuario, arroba y dominio con punto
- minimo valida el largo mínimo
- coincideCon compara contra otro campo del formulario
- validar devuelve solo el primer error de cada campo inválido

**`Carrito.spec.jsx` (4)**

- con el carrito vacío ofrece volver a los productos
- lista las líneas y muestra el total
- Eliminar y Limpiar invocan las acciones del contexto
- cambiar la cantidad notifica el nuevo valor

**`productos.spec.jsx` (4)**

- precioFinal usa la oferta cuando existe
- esCritico depende del umbral de stock
- filtrarProductos combina texto y categoría
- resumenVentas ignora las órdenes rechazadas

**`Login.spec.jsx` (3)**

- estado del formulario: el campo refleja lo que escribe el usuario
- muestra errores de validación y no llama a iniciarSesion con campos vacíos
- con credenciales incorrectas muestra la alerta de error (mock de autenticación)

**`Contacto.spec.jsx` (2)**

- un correo inválido muestra su error y no confirma el envío
- con datos válidos muestra la confirmación

**`ListaCategorias.spec.jsx` (2)**

- muestra el nombre de cada categoría recibida por props
- cada tarjeta es un link a /categorias/id

**`Registro.spec.jsx` (2)**

- con datos válidos llama a registrar (mock de autenticación)
- con un correo ya existente muestra el error

**`RutaAdmin.spec.jsx` (2)**

- un cliente es redirigido al login
- un administrador accede al panel

**`AuthProvider.spec.jsx` (1)**

- registrar con un correo repetido devuelve null

### Mocks que se usan

- **Contextos simulados (`ayudas.jsx`):** la función `renderizar(ui, { ruta, auth, carrito })`
  dibuja el componente dentro de un `MemoryRouter` y con una sesión o un carrito falsos. Así se
  prueba `Header`, `Login`, `Registro`, `Carrito` y `RutaAdmin` sin usar los providers reales.
- **`jasmine.createSpy`:** funciones falsas que recuerdan si las llamaron y con qué datos
  (`onAgregar`, `cerrarSesion`, `iniciarSesion`, `registrar`, `cambiarCantidad`, `quitar`, `vaciar`, `aviso`).
- **`spyOn(Storage.prototype, 'setItem')`:** en `db.spec.jsx`, para revisar que se escriba en localStorage.
- **Sin mocks:** `CarritoProvider.spec.jsx` y `AuthProvider.spec.jsx` usan los providers y los
  datos reales. Antes y después de cada prueba limpian `localStorage` y llaman a `db.reiniciar()`.

---

## 3. Cobertura

**Qué significa cada columna:**

- **Sentencias:** instrucciones del código que se ejecutaron.
- **Ramas:** caminos de los `if`, `? :`, `&&`, `??` que se recorrieron (el "sí" y el "no" de un `if`).
- **Funciones:** funciones que se llamaron al menos una vez.
- **Líneas:** líneas con código que se ejecutaron.

### Total

| Métrica    | %       | Cubiertas / total |
| ---------- | ------- | ----------------- |
| Sentencias | 90.21 % | 212 / 235         |
| Ramas      | 79.24 % | 84 / 106          |
| Funciones  | 87.38 % | 97 / 111          |
| Líneas     | 90.68 % | 185 / 204         |

### Por carpeta

| Carpeta       | Sentencias | Ramas   | Funciones | Líneas  |
| ------------- | ---------- | ------- | --------- | ------- |
| `components/` | 91.3 %     | 100 %   | 83.33 %   | 90.9 %  |
| `context/`    | 73.68 %    | 52 %    | 75.86 %   | 70.45 % |
| `data/`       | 97.5 %     | 75 %    | 94.11 %   | 100 %   |
| `hooks/`      | 100 %      | 100 %   | 100 %     | 100 %   |
| `pages/`      | 97.05 %    | 78.57 % | 100 %     | 100 %   |
| `utils/`      | 95.12 %    | 79.16 % | 90.47 %   | 94.44 % |

### Por archivo

| Archivo                          | Sentencias | Ramas   | Funciones | Líneas  | Líneas sin cubrir |
| -------------------------------- | ---------- | ------- | --------- | ------- | ----------------- |
| `components/CampoFormulario.jsx` | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `components/CamposDireccion.jsx` | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `components/Header.jsx`          | 76.47 %    | 100 %   | 55.55 %   | 76.47 % | 77, 109-149       |
| `components/ListaCategorias.jsx` | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `components/ListaProductos.jsx`  | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `components/Logo.jsx`            | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `components/Producto.jsx`        | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `components/RutaAdmin.jsx`       | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `context/AuthProvider.jsx`       | 47.82 %    | 41.66 % | 55.55 %   | 45 %    | 23-34, 45-58      |
| `context/CarritoProvider.jsx`    | 90.62 %    | 61.53 % | 85 %      | 90.9 %  | 59-60             |
| `context/contextos.js`           | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `data/db.js`                     | 97.14 %    | 75 %    | 94.11 %   | 100 %   | 21                |
| `data/seed.js`                   | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `hooks/useAuth.js`               | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `hooks/useCarrito.js`            | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `hooks/useColeccion.js`          | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `hooks/useFormulario.js`         | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `pages/Carrito.jsx`              | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `pages/Contacto.jsx`             | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `pages/Login.jsx`                | 90 %       | 50 %    | 100 %     | 100 %   | 28                |
| `pages/Registro.jsx`             | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `utils/formato.js`               | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `utils/productos.js`             | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `utils/reportes.js`              | 90.9 %     | 100 %   | 83.33 %   | 90 %    | 24                |
| `utils/validaciones.js`          | 95 %       | 68.75 % | 88.88 %   | 94.44 % | 21                |

### Ojo: el porcentaje no es de toda la app

Istanbul **solo mide los archivos que alguna prueba importa**. En `src/` hay 52 archivos de
código (sin contar `src/test/`). Se midieron **25** (los de la tabla) y quedan **27 fuera**:

- `main.jsx`: se excluye a propósito en `karma.conf.cjs`.
- Los otros 26 no aparecen porque ninguna prueba los importa:
  - `App.jsx`
  - `components/`: `Footer.jsx`, `FormularioEntidad.jsx`, `ResumenOrden.jsx`
  - `layouts/`: `AdminLayout.jsx`, `TiendaLayout.jsx`
  - `pages/`: `Blogs`, `Categorias`, `Checkout`, `DetalleBlog`, `DetalleProducto`, `Home`,
    `Nosotros`, `Ofertas`, `PagoResultado`, `Productos`
  - `pages/admin/`: `AdminEntidad`, `AdminFormulario`, `Boleta`, `Dashboard`, `HistorialCompras`,
    `Ordenes`, `Perfil`, `ProductosCriticos`, `Reportes` y `entidades.jsx`

Sobre las vistas: según `App.jsx`, la app tiene **23 vistas**: 14 de la tienda (`Home`,
`Productos`, `DetalleProducto`, `Categorias`, `Ofertas`, `Nosotros`, `Blogs`, `DetalleBlog`,
`Contacto`, `Login`, `Registro`, `Carrito`, `Checkout`, `PagoResultado`) y **9 del panel admin**.
La carpeta `pages/admin/` tiene 10 archivos, pero `entidades.jsx` no es una vista: es la
configuración (columnas, campos y reglas) que usan `AdminEntidad` y `AdminFormulario`.
De las 23 vistas, solo 4 tienen prueba: `Login`, `Registro`, `Contacto` y `Carrito`.

Por eso el ≈90 % habla de los archivos probados, no de toda la app.

---

## 4. Puntos débiles y qué prueba falta

| Archivo                               | Qué no se ejecuta                                                                                                                                                         | Por qué                                                                                                                                         | Prueba que falta                                                                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AuthProvider.jsx` (45 % líneas)      | `abrirSesion`, `iniciarSesion`, el registro exitoso (`db.crear`) y `cerrarSesion` (líneas 23-34 y 45-58).                                                                 | Solo hay una prueba del provider real (correo repetido), que termina en el `return null`. `Login` y `Header` usan una sesión falsa.            | En `AuthProvider.spec.jsx`: login correcto (devuelve el usuario y lo deja conectado), login con clave mala (devuelve null), registro exitoso y cerrar sesión. |
| `Header.jsx` (55.55 % funciones)      | Los 4 `onClick={() => setAbierto(false)}`: links del menú (línea 77), botón del carrito (109), "Iniciar sesión" y "Crear cuenta" (dentro de 109-149).                    | Las pruebas revisan que esos links aparezcan, pero nunca hacen clic en ellos.                                                                   | En `Header.spec.jsx`: abrir el menú móvil, hacer clic en un link y revisar que `aria-expanded` vuelva a `false`.                                              |
| `Login.jsx` (50 % ramas)              | Línea 28: `navegar(usuario.rol === 'admin' ? '/admin' : '/')`.                                                                                                            | Solo se prueba el login fallido; en ninguna prueba `iniciarSesion` devuelve un usuario.                                                         | En `Login.spec.jsx`: un mock que devuelva un cliente (va a `/`) y otro que devuelva un admin (va a `/admin`).                                                  |
| `CarritoProvider.jsx` (61.53 % ramas) | `cambiarCantidad` (líneas 59-60) y tres ramas: producto que ya no existe (`: []`), producto sin stock conocido (`?? cantidad`) y la línea que no cambia en el `map` (`: l`). | `cambiarCantidad` solo se prueba en `Carrito.spec.jsx` con un espía. Ninguna prueba tiene dos productos distintos en el carrito.                | En `CarritoProvider.spec.jsx`: usar `cambiarCantidad` con el provider real, agregar dos productos distintos y después sumar a uno, y un id que no existe en `db`. |

Otros detalles menores:

- `validaciones.js` (68.75 % ramas): falta probar `numeroNoNegativo` (línea 21), que usan los formularios del panel admin.
- `db.js` (75 % ramas): línea 21, leer datos ya guardados en localStorage; las pruebas siempre parten con localStorage limpio.
- `reportes.js` (83.33 % funciones): línea 24, el orden por ingresos; la prueba usa un solo producto vendido, así que no hay nada que ordenar.
- Las 19 vistas sin prueba: `Checkout`, `Productos` y las vistas del panel admin son las que tienen más lógica sin probar.

---

## 5. Cómo ejecutar las pruebas

Necesitas **Node.js** y **Google Chrome** instalados.

```sh
npm install     # instala las dependencias (solo la primera vez)
npm test        # corre las 48 pruebas y mide la cobertura
```

En la terminal aparece:

1. La lista de pruebas agrupadas por `describe`, con `√` si pasó o `✗` si falló.
2. La línea `Executed 48 of 48 SUCCESS`.
3. El **Coverage summary** (los 4 porcentajes totales).
4. La tabla de cobertura por carpeta y archivo, con las líneas sin cubrir.

### Abrir el informe HTML

Después de `npm test` se crea la carpeta `coverage/html/`. Abre en el navegador:

```
coverage/html/index.html
```

En Windows se puede abrir desde la terminal con:

```sh
start coverage/html/index.html
```

En el informe:

- La página principal muestra cada carpeta con sus porcentajes (verde = bien, amarillo = medio, rojo = bajo).
- Al entrar a una carpeta y luego a un archivo, se ve el código con colores:
  - **Fondo rojo:** líneas o funciones que nunca se ejecutaron.
  - **Fondo amarillo / marca `E` o `I`:** ramas de un `if` que no se recorrieron.
  - **Número `Nx` al lado:** cuántas veces se ejecutó esa línea.

La carpeta `coverage/` está en `.gitignore`, así que no se sube al repositorio: hay que
generarla de nuevo con `npm test`.
