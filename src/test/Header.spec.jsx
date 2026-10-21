import { cleanup, fireEvent, screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { renderizar } from './ayudas';

// Muestra la ruta actual para revisar adónde navegó
function RutaActual() {
  const { pathname, search } = useLocation();
  return <p data-testid="ruta">{pathname + search}</p>;
}

// Pruebas del menú de arriba
describe('Componente Header', () => {
  // Limpia la pantalla después de cada prueba
  afterEach(cleanup);

  // Carrito falso con un total de $15.000
  const carrito = { total: 15000 };

  // Sin sesión debe mostrar login, registro y el total
  it('visitante: muestra Iniciar sesión y Crear cuenta, y el total del carrito', () => {
    renderizar(<Header />, { auth: { usuario: null }, carrito });
    expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Crear cuenta' })).toBeTruthy();
    expect(screen.getByText(/\$15\.000/)).toBeTruthy();
  });

  // Cliente conectado: saludo, sin Admin y botón Salir
  it('usuario con sesión: muestra su nombre y el botón Salir que llama a cerrarSesion', () => {
    const cerrarSesion = jasmine.createSpy('cerrarSesion');
    renderizar(<Header />, {
      auth: { usuario: { nombre: 'Camila', rol: 'cliente' }, cerrarSesion },
      carrito,
    });
    expect(screen.getByText('Hola, Camila')).toBeTruthy();
    // Un cliente no debe ver el botón Admin
    expect(screen.queryByRole('link', { name: 'Admin' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Salir' }));
    expect(cerrarSesion).toHaveBeenCalled();
  });

  // Un admin sí debe ver el botón Admin
  it('un administrador ve el enlace al panel', () => {
    renderizar(<Header />, {
      auth: { usuario: { nombre: 'Admin', rol: 'admin' } },
      carrito,
    });
    expect(screen.getByRole('link', { name: 'Admin' })).toBeTruthy();
  });

  // El botón hamburguesa debe abrir el menú
  it('el botón del menú móvil alterna el estado abierto/cerrado', () => {
    renderizar(<Header />, { auth: { usuario: null }, carrito });
    const boton = screen.getByRole('button', { name: 'Abrir o cerrar menú' });
    // Parte cerrado y al hacer clic se abre
    expect(boton.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(boton);
    expect(boton.getAttribute('aria-expanded')).toBe('true');
  });

  // Buscar debe llevar a productos con el texto
  it('el buscador navega a /productos?q=texto al enviar el formulario', () => {
    renderizar(
      <>
        <Header />
        <RutaActual />
      </>,
      { auth: { usuario: null }, carrito },
    );
    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar productos' }), {
      target: { value: 'collar' },
    });
    fireEvent.submit(screen.getByRole('search'));
    expect(screen.getByTestId('ruta').textContent).toBe('/productos?q=collar');
  });
});
