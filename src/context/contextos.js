import { createContext } from 'react';

// Los objetos de contexto viven aparte de los Providers para que cada archivo
// exporte una sola cosa (los hooks useAuth y useCarrito están en src/hooks).
// Contexto para compartir la sesión del usuario
export const AuthContext = createContext(null);
// Contexto para compartir el carrito de compras
export const CarritoContext = createContext(null);
