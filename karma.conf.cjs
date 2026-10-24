// Jasmine ejecuta las pruebas, Karma las lanza en Chrome y webpack + Babel
// transforman el JSX. Istanbul mide la cobertura de todo el código de src/.
// El archivo es .cjs porque Karma usa module.exports (formato antiguo de Node)
// y package.json tiene "type": "module"
// Karma llama a esta función y le pasa config; con config.set se entregan las opciones
module.exports = function (config) {
  config.set({
    // Jasmine para escribir las pruebas y webpack para empaquetarlas
    frameworks: ['jasmine', 'webpack'],
    // Archivos de prueba: todos los .spec.jsx dentro de src/test
    // watched: false = no se queda vigilando cambios (se corren una vez)
    files: [{ pattern: 'src/test/**/*.spec.jsx', watched: false }],
    // Antes de ir al navegador, esos archivos pasan por webpack
    preprocessors: { 'src/test/**/*.spec.jsx': ['webpack'] },
    // Configuración de webpack solo para las pruebas
    webpack: {
      // Modo desarrollo: más rápido y sin minificar
      mode: 'development',
      // Source map: si una prueba falla, el error apunta a la línea del archivo original
      devtool: 'inline-source-map',
      // Permite importar sin escribir .js o .jsx al final
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        // Reglas que dicen cómo tratar cada tipo de archivo
        rules: [
          // package.json usa "type": "module": permite importar archivos .js sin escribir la extensión.
          { test: /\.m?js$/, resolve: { fullySpecified: false } },
          // Todo archivo .js o .jsx (menos las librerías de node_modules) pasa por Babel
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                // Babel no busca otros archivos de configuración; usa solo lo de aquí
                babelrc: false,
                configFile: false,
                presets: [
                  // Traduce JavaScript moderno
                  '@babel/preset-env',
                  // Traduce JSX; 'automatic' evita escribir import React en cada archivo
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                plugins: [
                  // Istanbul marca el código para medir qué partes se ejecutan (cobertura)
                  [
                    'istanbul',
                    {
                      // Mide todo src/...
                      include: ['src/**/*.{js,jsx}'],
                      // ...menos las pruebas y main.jsx (solo monta la app en el HTML)
                      exclude: ['src/test/**', 'src/main.jsx'],
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    },
    // Complementos de Karma: Jasmine, webpack, abrir Chrome, cobertura y reporte por prueba
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-spec-reporter',
    ],
    // spec = lista de pruebas con √ o ✗; coverage = resultado de la cobertura
    reporters: ['spec', 'coverage'],
    // Dónde y cómo se guarda la cobertura
    coverageReporter: {
      // Carpeta donde se guarda
      dir: 'coverage',
      reporters: [
        // Página web en coverage/html (abrir coverage/html/index.html)
        { type: 'html', subdir: 'html' },
        // Resumen corto en la terminal
        { type: 'text-summary' },
        // Tabla por archivo en la terminal
        { type: 'text' },
      ],
    },
    // Chrome sin ventana
    browsers: ['ChromeHeadless'],
    // Corre las pruebas una vez y termina
    singleRun: true,
  });
};
