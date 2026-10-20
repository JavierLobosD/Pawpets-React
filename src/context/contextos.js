import { createContext } from 'react';

// Los objetos de contexto viven aparte de los Providers para que cada archivo
// exporte una sola cosa (los hooks useAuth y useCarrito están en src/hooks).
export const AuthContext = createContext(null);
export const CarritoContext = createContext(null);
