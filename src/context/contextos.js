// createContext: función de React para crear un contexto
import { createContext } from 'react';

// Un contexto sirve para compartir datos con muchos componentes
// sin tener que pasarlos por props de padre a hijo en cada nivel.
// Los objetos de contexto viven aparte de los Providers para que cada archivo
// exporte una sola cosa (los hooks useAuth y useCarrito están en src/hooks).
// Contexto para compartir la sesión del usuario
// null es el valor por defecto si un componente lo lee fuera del AuthProvider
export const AuthContext = createContext(null);
// Contexto para compartir el carrito de compras
// Igual que arriba: el valor real lo pone el CarritoProvider
export const CarritoContext = createContext(null);
