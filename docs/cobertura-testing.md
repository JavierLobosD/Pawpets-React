# Cobertura de testing – PawPets React

Este documento explica cómo se prueba el proyecto, qué pruebas hay y cuánto código cubren.
Todos los números salen de una ejecución real de `npm test` hecha el **21-10-2026**
(Chrome Headless 156, Windows).

**Resultado de la ejecución:** `Executed 45 of 45 SUCCESS` → **45 pruebas, 45 aprobadas, 0 fallidas**.

---

## 1. Herramientas

| Herramienta  | Para qué sirve en este proyecto                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Jasmine**  | Framework para escribir las pruebas. Da `describe` (agrupa), `it` (una prueba), `expect` (lo que se espera) y los mocks `createSpy` y `spyOn`.                           |
| **Karma**    | Lanzador de pruebas. Abre Google Chrome sin ventana (ChromeHeadless), carga las pruebas, las ejecuta y muestra el resultado en la terminal.                              |
| **webpack**  | Empaqueta cada archivo `*.spec.jsx` junto con todo lo que importa (componentes, hooks, datos) para que el navegador lo pueda cargar.                                     |
| **Babel**    | Traduce el código: convierte JSX (`<Header />`) y JavaScript moderno a JavaScript que Chrome entiende.                                                                   |
| **Istanbul** | Mide la cobertura. Marca cada línea, función y rama del código de `src/` y cuenta cuáles se ejecutaron durante las pruebas (`babel-plugin-istanbul` + `karma-coverage`). |

Además se usa **React Testing Library** (`@testing-library/react`) para dibujar componentes
en las pruebas (`render`, `renderHook`), buscar elementos como lo haría un usuario
(`screen.getByRole`, `getByLabelText`) y simular acciones (`fireEvent.click`, `fireEvent.change`).

---

## 2. Configuración del entorno (`karma.conf.cjs`)

El archivo es `.cjs` porque Karma usa el formato antiguo de Node (`module.exports`),
y el `package.json` tiene `"type": "module"`.

```js
module.exports = function (config) {
  config.set({
```

Karma llama a esta función y le pasa `config`. Con `config.set` se entregan todas las opciones.

```js
    frameworks: ['jasmine', 'webpack'],
```

Se usa Jasmine para escribir las pruebas y webpack para empaquetarlas.

```js
    files: [{ pattern: 'src/test/**/*.spec.jsx', watched: false }],
```

Los archivos de prueba son todos los que terminan en `.spec.jsx` dentro de `src/test/`.
`watched: false` = no se quedan vigilando cambios (se corren una vez).

```js
    preprocessors: { 'src/test/**/*.spec.jsx': ['webpack'] },
```

Antes de mandarlos al navegador, esos archivos pasan por webpack.

```js
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
```

Webpack trabaja en modo desarrollo (más rápido, sin minificar). El _source map_ hace que,
si una prueba falla, el error apunte a la línea real del archivo original.

```js
      resolve: { extensions: ['.js', '.jsx'] },
```

Permite escribir `import Header from '../components/Header'` sin poner `.jsx` al final.

```js
      module: {
        rules: [
          { test: /\.m?js$/, resolve: { fullySpecified: false } },
```

Primera regla: como el proyecto es `"type": "module"`, webpack exigiría la extensión en
cada import de `.js`. Esta regla lo desactiva.

```js
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
```

Segunda regla: todo archivo `.js` o `.jsx` (menos las librerías de `node_modules`) pasa por Babel.

```js
              options: {
                babelrc: false,
                configFile: false,
```

Babel no busca otros archivos de configuración; usa solo lo que está escrito aquí.

```js
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
```

`preset-env` traduce JavaScript moderno. `preset-react` traduce JSX; `runtime: 'automatic'`
hace que no haya que escribir `import React` en cada archivo.

```js
                plugins: [
                  [
                    'istanbul',
                    {
                      include: ['src/**/*.{js,jsx}'],
                      exclude: ['src/test/**', 'src/main.jsx'],
                    },
                  ],
                ],
```

El plugin de Istanbul "marca" el código para medir cobertura. Mide todo `src/`, pero no las
pruebas mismas (`src/test/`) ni `main.jsx` (solo monta la app en el HTML).

```js
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-spec-reporter',
    ],
```

Complementos de Karma: unir Jasmine, usar webpack, abrir Chrome, medir cobertura y mostrar
el resultado prueba por prueba.

```js
    reporters: ['spec', 'coverage'],
```

Muestra dos reportes: la lista de pruebas (✓ / ✗) y la cobertura.

```js
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'text' },
      ],
    },
```

La cobertura se guarda en la carpeta `coverage/`: una página web en `coverage/html`,
un resumen corto en la terminal y la tabla completa por archivo en la terminal.

```js
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};
```

Usa Chrome sin ventana, corre las pruebas una sola vez y termina (sirve para la terminal y para CI).

---

## 3. Pruebas por archivo

Hay **12 archivos de prueba** en `src/test/` (más `ayudas.jsx`, que tiene funciones de apoyo) con **45 pruebas**.

### `validaciones.spec.jsx` – Validaciones de formulario (5)

| Prueba                                                       | Qué verifica                                                     |
| ------------------------------------------------------------ | ---------------------------------------------------------------- |
| requerido rechaza vacíos y espacios, y acepta texto          | Un campo vacío o con solo espacios da error; con texto no.       |
| correo exige usuario, arroba y dominio con punto             | Solo acepta correos con forma `usuario@dominio.cl`.              |
| minimo valida el largo mínimo                                | Un texto más corto que el mínimo da error.                       |
| coincideCon compara contra otro campo del formulario         | Dos campos (ej. contraseñas) deben ser iguales.                  |
| validar devuelve solo el primer error de cada campo inválido | Por cada campo se muestra un solo mensaje, el primero que falla. |

### `productos.spec.jsx` – Lógica de productos y reportes (4)

| Prueba                                      | Qué verifica                                            |
| ------------------------------------------- | ------------------------------------------------------- |
| precioFinal usa la oferta cuando existe     | Si hay precio de oferta, ese es el que se cobra.        |
| esCritico depende del umbral de stock       | Un producto con poco stock se marca como crítico.       |
| filtrarProductos combina texto y categoría  | La búsqueda filtra por nombre y por categoría a la vez. |
| resumenVentas ignora las órdenes rechazadas | Las órdenes no pagadas no suman ventas.                 |

### `db.spec.jsx` – Fuente de datos (db) con CRUD (5)

| Prueba                                                                     | Qué verifica                                                           |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| listar entrega los datos iniciales y rechaza colecciones inexistentes      | Lee los datos de `seed.js` y da error con una colección que no existe. |
| crear agrega un registro con id autoincremental                            | Un registro nuevo recibe el siguiente id.                              |
| actualizar modifica solo el registro indicado                              | Editar uno no cambia los demás.                                        |
| eliminar quita el registro                                                 | El registro borrado ya no está en la lista.                            |
| cada cambio se persiste en localStorage y avisa a los suscriptores (mocks) | Al guardar se escribe en localStorage y se avisa a la pantalla.        |

### `Producto.spec.jsx` – Componentes Producto y ListaProductos (7)

| Prueba                                                                         | Qué verifica                                             |
| ------------------------------------------------------------------------------ | -------------------------------------------------------- |
| renderiza el nombre y el precio formateado recibidos por props                 | La tarjeta muestra los datos que recibe por props.       |
| renderizado condicional: muestra el precio original tachado solo si hay oferta | El precio tachado aparece solo cuando hay oferta.        |
| el botón ejecuta onAgregar con el id del producto (evento + mock)              | Al hacer clic se llama a `onAgregar` con el id correcto. |
| sin stock el botón se deshabilita                                              | Con stock 0 no se puede agregar.                         |
| estado interno: si la imagen falla se muestra el reemplazo                     | Si la foto no carga, aparece el cuadro de reemplazo.     |
| renderiza una tarjeta por cada producto del conjunto de datos                  | `ListaProductos` dibuja una tarjeta por producto.        |
| muestra un mensaje cuando no hay productos                                     | Con la lista vacía sale un mensaje.                      |

### `Header.spec.jsx` – Componente Header (5)

| Prueba                                                                          | Qué verifica                                                   |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| visitante: muestra Iniciar sesión y Crear cuenta, y el total del carrito        | Sin sesión aparecen los links de login y registro, y el total. |
| usuario con sesión: muestra su nombre y el botón Salir que llama a cerrarSesion | Saluda al usuario, no muestra Admin y Salir cierra la sesión.  |
| un administrador ve el enlace al panel                                          | Un usuario con rol admin ve el botón Admin.                    |
| el botón del menú móvil alterna el estado abierto/cerrado                       | El botón hamburguesa cambia `aria-expanded` de false a true.   |
| el buscador navega a /productos?q=texto al enviar el formulario                 | Buscar "collar" lleva a `/productos?q=collar`.                 |

### `Login.spec.jsx` – Página Login (3)

| Prueba                                                                          | Qué verifica                                                |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| estado del formulario: el campo refleja lo que escribe el usuario               | El input muestra lo que se escribe (formulario controlado). |
| muestra errores de validación y no llama a iniciarSesion con campos vacíos      | Con campos vacíos salen 2 errores y no intenta entrar.      |
| con credenciales incorrectas muestra la alerta de error (mock de autenticación) | Si el login falla, aparece la alerta roja.                  |

### `Registro.spec.jsx` – Página Registro (2)

| Prueba                                                      | Qué verifica                                                             |
| ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| con datos válidos llama a registrar (mock de autenticación) | Envía los datos correctos (sin "Repetir contraseña") y no muestra error. |
| con un correo ya existente muestra el error                 | Si `registrar` devuelve null, aparece "Ya existe una cuenta".            |

### `Contacto.spec.jsx` – Página Contacto (2)

| Prueba                                                     | Qué verifica                                      |
| ---------------------------------------------------------- | ------------------------------------------------- |
| un correo inválido muestra su error y no confirma el envío | Con un correo malo sale el error y no se envía.   |
| con datos válidos muestra la confirmación                  | Con todo bien aparece el mensaje de confirmación. |

### `Carrito.spec.jsx` – Página Carrito (4)

| Prueba                                               | Qué verifica                                                      |
| ---------------------------------------------------- | ----------------------------------------------------------------- |
| con el carrito vacío ofrece volver a los productos   | Sin productos aparece el link para seguir comprando.              |
| lista las líneas y muestra el total                  | Muestra cada producto del carrito y el total.                     |
| Eliminar y Limpiar invocan las acciones del contexto | Los botones llaman a `quitar` y `vaciar`.                         |
| cambiar la cantidad notifica el nuevo valor          | Cambiar la cantidad llama a `cambiarCantidad` con el valor nuevo. |

### `CarritoProvider.spec.jsx` – Estado compartido del carrito (5)

| Prueba                                                               | Qué verifica                                                       |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| agregar suma cantidades y calcula el total con el precio vigente     | Agregar 2 + 1 da 3 unidades y el total usa el precio actual de db. |
| la cantidad no puede superar el stock disponible                     | Pedir más que el stock deja la cantidad en el stock.               |
| agregar más unidades a un producto ya en el carrito respeta el stock | Sumar a un producto que ya estaba tampoco pasa el stock.           |
| quitar y vaciar eliminan líneas                                      | `quitar` saca uno y `vaciar` saca todos.                           |
| el carrito se guarda en localStorage                                 | El carrito queda guardado en `pawpets:carrito`.                    |

### `AuthProvider.spec.jsx` – Sesión del usuario (1)

| Prueba                                         | Qué verifica                                                                       |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| registrar con un correo repetido devuelve null | Un correo que ya existe (aunque esté en mayúsculas) no crea cuenta ni abre sesión. |

### `RutaAdmin.spec.jsx` – Protección del panel (2)

| Prueba                            | Qué verifica                                 |
| --------------------------------- | -------------------------------------------- |
| un administrador accede al panel  | Un admin puede entrar a `/admin`.            |
| un cliente es redirigido al login | Un cliente que entra a `/admin` va al login. |

---

## 4. Uso de mocks

Un **mock** es una pieza falsa que reemplaza a la real durante la prueba. Sirve para probar
un componente solo, sin depender de la sesión real, el carrito real o el navegador, y para
revisar que el componente llamó a una función con los datos correctos.

### Contextos simulados (`ayudas.jsx`)

La función `renderizar(ui, { ruta, auth, carrito })` dibuja el componente dentro de un
`MemoryRouter` y, si se le pasa, dentro de un `AuthContext.Provider` o `CarritoContext.Provider`
**con valores falsos**. Así el componente cree que hay una sesión o un carrito, sin usar
`AuthProvider` ni `CarritoProvider` de verdad.

| Archivo              | Contexto simulado                                               | Por qué                                                        |
| -------------------- | --------------------------------------------------------------- | -------------------------------------------------------------- |
| `Header.spec.jsx`    | `auth` (visitante, cliente, admin) y `carrito` (`total: 15000`) | Probar lo que ve cada tipo de usuario sin iniciar sesión real. |
| `Login.spec.jsx`     | `auth` con `iniciarSesion` falso                                | Controlar si el login "funciona" o "falla".                    |
| `Registro.spec.jsx`  | `auth` con `registrar` falso                                    | Simular registro exitoso o correo repetido.                    |
| `Carrito.spec.jsx`   | `carrito` con items y acciones falsas                           | Probar la página con un carrito vacío o con productos.         |
| `RutaAdmin.spec.jsx` | `auth` con rol `cliente` o `admin`                              | Probar la protección del panel sin cuentas reales.             |

### `jasmine.createSpy`

Crea una función falsa que recuerda si la llamaron y con qué datos. Con `.and.returnValue(x)`
además devuelve lo que uno quiera.

| Archivo             | Espía                                                                   | Para qué                                                                  |
| ------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `Header.spec.jsx`   | `cerrarSesion`                                                          | Revisar que el botón Salir la llame.                                      |
| `Login.spec.jsx`    | `iniciarSesion` (y `.and.returnValue(null)`)                            | Revisar que no se llame con campos vacíos, y simular un login fallido.    |
| `Registro.spec.jsx` | `registrar` (`.and.returnValue({ id: 99 })` y `.and.returnValue(null)`) | Simular registro exitoso y correo repetido, y revisar los datos enviados. |
| `Carrito.spec.jsx`  | `cambiarCantidad`, `quitar`, `vaciar`                                   | Revisar que los botones llamen a la acción correcta.                      |
| `Producto.spec.jsx` | `onAgregar`                                                             | Revisar que el botón mande el id del producto.                            |
| `db.spec.jsx`       | `aviso`                                                                 | Revisar que `db` avise a los suscriptores cuando cambia algo.             |

### `spyOn`

| Archivo       | Espía                                                   | Para qué                                                                                  |
| ------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `db.spec.jsx` | `spyOn(Storage.prototype, 'setItem').and.callThrough()` | Vigilar que se escriba en localStorage. `callThrough` deja que igual se guarde de verdad. |

### Pruebas sin mocks

`CarritoProvider.spec.jsx` y `AuthProvider.spec.jsx` usan los providers reales y los datos
reales de `db`. Antes y después de cada prueba llaman a `localStorage.clear()` y `db.reiniciar()`
para que cada prueba parta limpia y no afecte a la siguiente.

---

## 5. Cobertura

**Qué significa cada columna:**

- **Sentencias:** instrucciones del código que se ejecutaron.
- **Ramas:** caminos de los `if`, `? :`, `&&`, `??` que se recorrieron (por ejemplo, el "sí" y el "no" de un `if`).
- **Funciones:** funciones que se llamaron al menos una vez.
- **Líneas:** líneas con código que se ejecutaron.

### Resumen general

| Métrica    | %       | Cubiertas / total |
| ---------- | ------- | ----------------- |
| Sentencias | 89.69 % | 209 / 233         |
| Ramas      | 79.24 % | 84 / 106          |
| Funciones  | 86.23 % | 94 / 109          |
| Líneas     | 90.59 % | 183 / 202         |

### Por carpeta

| Carpeta       | Sentencias | Ramas   | Funciones | Líneas  |
| ------------- | ---------- | ------- | --------- | ------- |
| `components/` | 90.90 %    | 100 %   | 81.81 %   | 90.47 % |
| `context/`    | 73.68 %    | 52 %    | 75.86 %   | 70.45 % |
| `data/`       | 97.50 %    | 75 %    | 94.11 %   | 100 %   |
| `hooks/`      | 100 %      | 100 %   | 100 %     | 100 %   |
| `pages/`      | 97.05 %    | 78.57 % | 100 %     | 100 %   |
| `utils/`      | 92.68 %    | 79.16 % | 85.71 %   | 94.44 % |

### Por archivo

| Archivo                          | Sentencias | Ramas   | Funciones | Líneas  | Líneas sin cubrir |
| -------------------------------- | ---------- | ------- | --------- | ------- | ----------------- |
| `components/CampoFormulario.jsx` | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `components/CamposDireccion.jsx` | 100 %      | 100 %   | 100 %     | 100 %   | –                 |
| `components/Header.jsx`          | 76.47 %    | 100 %   | 55.55 %   | 76.47 % | 77, 109-149       |
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
| `utils/productos.js`             | 88.88 %    | 100 %   | 80 %      | 100 %   | –                 |
| `utils/reportes.js`              | 90.9 %     | 100 %   | 83.33 %   | 90 %    | 24                |
| `utils/validaciones.js`          | 95 %       | 68.75 % | 88.88 %   | 94.44 % | 21                |

> **Importante:** Istanbul solo mide los archivos que alguna prueba importa. Los 24 archivos de
> la tabla son los que se midieron. Hay **27 archivos de `src/` que no aparecen** porque ninguna
> prueba los importa, así que no están incluidos en el porcentaje: `App.jsx`, `layouts/` (2),
> `Footer.jsx`, `FormularioEntidad.jsx`, `ListaCategorias.jsx`, `ResumenOrden.jsx`, las páginas
> `Blogs`, `Categorias`, `Checkout`, `DetalleBlog`, `DetalleProducto`, `Home`, `Nosotros`,
> `Ofertas`, `PagoResultado`, `Productos`, y las 10 vistas de `pages/admin/`.

---

## 6. Análisis

### Lo que está bien cubierto

- **Hooks (100 % en todo):** `useAuth`, `useCarrito`, `useColeccion` y `useFormulario` se usan
  en casi todas las pruebas de componentes y páginas, así que todo su código se ejecuta.
- **Componentes reutilizables:** `Producto`, `ListaProductos`, `CampoFormulario`,
  `CamposDireccion`, `Logo` y `RutaAdmin` están al 100 %. Se prueban props, estado interno
  (imagen que falla), renderizado condicional (oferta, sin stock) y eventos.
- **Formularios:** `Contacto`, `Registro` y `Carrito` al 100 %; `Login` al 100 % de líneas.
  Se prueban el caso bueno y el caso con error.
- **Datos (`db.js`):** 100 % de líneas. El CRUD completo está probado, incluida la escritura
  en localStorage y el aviso a los suscriptores.
- **Lógica pura (`utils/`):** sobre 88 % en sentencias. Son funciones sin pantalla, fáciles de
  probar con entradas y salidas.

### Lo que no está bien cubierto y por qué

| Archivo                               | Qué falta                                                                                                                                                                   | Por qué                                                                                                                                                                                                                               |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AuthProvider.jsx` (45 % líneas)      | `iniciarSesion`, `abrirSesion`, el registro exitoso (`db.crear`) y `cerrarSesion`.                                                                                          | Solo hay una prueba del provider real (correo repetido), que termina antes en el `return null`. El login y el logout se prueban en `Login` y `Header`, pero con un contexto falso, así que el código real del provider no se ejecuta. |
| `Header.jsx` (55.55 % funciones)      | Los 4 `onClick={() => setAbierto(false)}`: en los links del menú (línea 77), el botón del carrito (109), "Iniciar sesión" y "Crear cuenta" (dentro de 109-149).             | Las pruebas revisan que esos links aparezcan, pero nunca hacen clic en ellos. Sus ramas (`if`, `? :`) sí están cubiertas al 100 %.                                                                                                    |
| `CarritoProvider.jsx` (61.53 % ramas) | La función `cambiarCantidad` (59-60) y algunas ramas: producto que ya no existe (`: []`), producto sin stock conocido (`?? cantidad`) y la línea que no cambia en el `map`. | `cambiarCantidad` solo se prueba en `Carrito.spec` con un espía, no en el provider real. Ninguna prueba agrega dos productos distintos y después suma a uno.                                                                          |
| `Login.jsx` (50 % ramas)              | Línea 28: `navegar(...)` cuando el login funciona, y el `? :` de admin/cliente.                                                                                             | Las pruebas solo prueban el login fallido; ninguna hace que `iniciarSesion` devuelva un usuario.                                                                                                                                      |
| `validaciones.js` (68.75 % ramas)     | `numeroNoNegativo` (línea 21) y la rama `''` de una regla.                                                                                                                  | No hay prueba para esa regla, que la usan los formularios del panel admin.                                                                                                                                                            |
| `db.js` (75 % ramas)                  | Línea 21: leer datos ya guardados (`JSON.parse(guardado)`) y el `?? []` de una colección sin datos iniciales. También el aviso dentro de `reiniciar()`.                     | Las pruebas siempre parten con localStorage limpio, y `reiniciar()` se llama cuando no hay nadie suscrito.                                                                                                                            |
| `reportes.js` (83.33 % funciones)     | Línea 24: la función que ordena por ingresos `(a, b) => b.ingresos - a.ingresos`.                                                                                           | La prueba de `resumenVentas` usa datos con un solo producto vendido, así que no hay nada que ordenar.                                                                                                                                 |
| `productos.js` (80 % funciones)       | `enOferta`.                                                                                                                                                                 | Ninguna prueba la llama (la función existe pero las pruebas usan `precioFinal`).                                                                                                                                                      |
| 27 archivos no medidos                | Páginas de la tienda (`Home`, `Productos`, `Checkout`, etc.), panel admin, layouts y `App.jsx`.                                                                             | No tienen pruebas. Por eso el porcentaje total (≈90 %) se refiere solo a los archivos probados, no a toda la app.                                                                                                                     |

### Qué conviene probar después

1. `AuthProvider`: login correcto, login incorrecto, registro exitoso y cerrar sesión.
2. `Login`: login exitoso de cliente (va a `/`) y de admin (va a `/admin`).
3. `CarritoProvider`: `cambiarCantidad` con el provider real.
4. `Header`: hacer clic en un link del menú abierto y revisar que se cierre.
5. Páginas sin pruebas con más lógica: `Checkout`, `Productos` y las vistas del panel admin.

---

## 7. Cómo ejecutar las pruebas

Necesitas **Node.js** y **Google Chrome** instalados.

```sh
npm install     # instala las dependencias (solo la primera vez)
npm test        # corre las 45 pruebas y mide la cobertura
```

En la terminal aparece:

1. La lista de pruebas agrupadas por `describe`, con `√` si pasó o `✗` si falló.
2. La línea final `Executed 45 of 45 SUCCESS`.
3. El **Coverage summary** (los 4 porcentajes generales).
4. La tabla de cobertura por carpeta y archivo, con las líneas sin cubrir.

### Ver el reporte HTML

Después de `npm test` se crea la carpeta `coverage/html/`. Abre en el navegador:

```
coverage/html/index.html
```

En Windows se puede abrir desde la terminal con:

```sh
start coverage/html/index.html
```

En el reporte:

- La página principal muestra cada carpeta con sus porcentajes (verde = bien, amarillo = medio, rojo = bajo).
- Al hacer clic en una carpeta y luego en un archivo, se ve el código con colores:
  - **Fondo rojo:** líneas o funciones que nunca se ejecutaron.
  - **Fondo amarillo / marca `E` o `I`:** ramas de un `if` que no se recorrieron.
  - **Número `Nx` al lado:** cuántas veces se ejecutó esa línea.

La carpeta `coverage/` está en `.gitignore`, así que no se sube al repositorio: hay que
generarla de nuevo con `npm test`.
