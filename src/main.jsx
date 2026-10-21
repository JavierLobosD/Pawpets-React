import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
// El CSS propio se carga después de Bootstrap para poder personalizarlo.
import './index.css';
import App from './App';

// Punto de partida: dibuja la app dentro del div "root"
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode ayuda a encontrar errores mientras programamos
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
