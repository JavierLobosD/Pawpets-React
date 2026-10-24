// React: la librería base (aquí se usa para React.StrictMode)
import React from 'react';
// ReactDOM: conecta React con el HTML real de la página
import ReactDOM from 'react-dom/client';

// Estilos de Bootstrap (grilla, botones, formularios, etc.)
import 'bootstrap/dist/css/bootstrap.min.css';
// El CSS propio se carga después de Bootstrap para poder personalizarlo.
import './index.css';
// App: el componente principal con todas las rutas
import App from './App';

// Punto de partida: dibuja la app dentro del div "root"
// Ese div está en index.html; createRoot lo prepara y render dibuja App adentro
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode ayuda a encontrar errores mientras programamos
  // (solo actúa en desarrollo, no cambia lo que ve el usuario)
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
