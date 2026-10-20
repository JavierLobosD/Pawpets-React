// Jasmine ejecuta las pruebas, Karma las lanza en Chrome y webpack + Babel
// transforman el JSX. Istanbul mide la cobertura de todo el código de src/.
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: [{ pattern: 'src/test/**/*.spec.jsx', watched: false }],
    preprocessors: { 'src/test/**/*.spec.jsx': ['webpack'] },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          // package.json usa "type": "module": permite importar archivos .js sin escribir la extensión.
          { test: /\.m?js$/, resolve: { fullySpecified: false } },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                configFile: false,
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                plugins: [
                  [
                    'istanbul',
                    {
                      include: ['src/**/*.{js,jsx}'],
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
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-spec-reporter',
    ],
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'text' },
      ],
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};
