// De Testing Library: cleanup (limpia), fireEvent (simula acciones) y screen (busca en pantalla)
import { cleanup, fireEvent, screen } from '@testing-library/react';
// useLocation: hook de react-router que entrega la URL actual
import { useLocation } from 'react-router-dom';
// El componente que se prueba
import Header from '../components/Header';
// Función para dibujar con router y contextos falsos
import { renderizar } from './ayudas';

// Muestra la ruta actual para revisar adónde navegó
// Componente de ayuda solo para la prueba del buscador
function RutaActual() {
  // pathname = /productos ; search = ?q=collar
  const { pathname, search } = useLocation();
  return <p data-testid="ruta">{pathname + search}</p>;
}

// Pruebas del menú de arriba
// Usa sesión y carrito falsos (mocks), no los providers reales
describe('Componente Header', () => {
  // Limpia la pantalla después de cada prueba
  afterEach(cleanup);

  // Carrito falso con un total de $15.000
  // El Header solo usa total, así que basta con eso
  const carrito = { total: 15000 };

  // Sin sesión debe mostrar login, registro y el total
  it('visitante: muestra Iniciar sesión y Crear cuenta, y el total del carrito', () => {
    // usuario: null simula que nadie inició sesión
    renderizar(<Header />, { auth: { usuario: null }, carrito });
    // Comprueba que están los dos links
    expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Crear cuenta' })).toBeTruthy();
    // Comprueba que el total del carrito sale con formato ($15.000)
    expect(screen.getByText(/\$15\.000/)).toBeTruthy();
  });

  // Cliente conectado: saludo, sin Admin y botón Salir
  it('usuario con sesión: muestra su nombre y el botón Salir que llama a cerrarSesion', () => {
    // Espía para saber si se llamó a cerrarSesion
    const cerrarSesion = jasmine.createSpy('cerrarSesion');
    renderizar(<Header />, {
      auth: { usuario: { nombre: 'Camila', rol: 'cliente' }, cerrarSesion },
      carrito,
    });
    // Comprueba que saluda con el nombre
    expect(screen.getByText('Hola, Camila')).toBeTruthy();
    // Un cliente no debe ver el botón Admin
    expect(screen.queryByRole('link', { name: 'Admin' })).toBeNull();
    // Hace clic en Salir y comprueba que se llamó a cerrarSesion
    fireEvent.click(screen.getByRole('button', { name: 'Salir' }));
    expect(cerrarSesion).toHaveBeenCalled();
  });

  // Un admin sí debe ver el botón Admin
  it('un administrador ve el enlace al panel', () => {
    renderizar(<Header />, {
      auth: { usuario: { nombre: 'Admin', rol: 'admin' } },
      carrito,
    });
    // Comprueba que aparece el link Admin
    expect(screen.getByRole('link', { name: 'Admin' })).toBeTruthy();
  });

  // El botón hamburguesa debe abrir el menú
  it('el botón del menú móvil alterna el estado abierto/cerrado', () => {
    renderizar(<Header />, { auth: { usuario: null }, carrito });
    // Busca el botón por su aria-label
    const boton = screen.getByRole('button', { name: 'Abrir o cerrar menú' });
    // Parte cerrado y al hacer clic se abre
    // aria-expanded refleja el estado "abierto" del Header
    expect(boton.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(boton);
    expect(boton.getAttribute('aria-expanded')).toBe('true');
  });

  // Buscar debe llevar a productos con el texto
  it('el buscador navega a /productos?q=texto al enviar el formulario', () => {
    // Dibuja el Header junto a RutaActual para poder leer la URL después
    renderizar(
      <>
        <Header />
        <RutaActual />
      </>,
      { auth: { usuario: null }, carrito },
    );
    // Escribe "collar" en el buscador
    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar productos' }), {
      target: { value: 'collar' },
    });
    // Envía el formulario del buscador
    fireEvent.submit(screen.getByRole('search'));
    // Comprueba que la URL cambió a /productos?q=collar
    expect(screen.getByTestId('ruta').textContent).toBe('/productos?q=collar');
  });
});
