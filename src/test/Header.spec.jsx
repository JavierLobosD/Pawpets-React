import { cleanup, fireEvent, screen } from '@testing-library/react';
import Header from '../components/Header';
import { renderizar } from './ayudas';

describe('Componente Header', () => {
  afterEach(cleanup);

  const carrito = { total: 15000 };

  it('visitante: muestra Iniciar sesión y Crear cuenta, y el total del carrito', () => {
    renderizar(<Header />, { auth: { usuario: null }, carrito });
    expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Crear cuenta' })).toBeTruthy();
    expect(screen.getByText(/\$15\.000/)).toBeTruthy();
  });

  it('usuario con sesión: muestra su nombre y el botón Salir que llama a cerrarSesion', () => {
    const cerrarSesion = jasmine.createSpy('cerrarSesion');
    renderizar(<Header />, {
      auth: { usuario: { nombre: 'Camila', rol: 'cliente' }, cerrarSesion },
      carrito,
    });
    expect(screen.getByText('Hola, Camila')).toBeTruthy();
    expect(screen.queryByRole('link', { name: 'Admin' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Salir' }));
    expect(cerrarSesion).toHaveBeenCalled();
  });

  it('un administrador ve el enlace al panel', () => {
    renderizar(<Header />, {
      auth: { usuario: { nombre: 'Admin', rol: 'admin' } },
      carrito,
    });
    expect(screen.getByRole('link', { name: 'Admin' })).toBeTruthy();
  });

  it('el botón del menú móvil alterna el estado abierto/cerrado', () => {
    renderizar(<Header />, { auth: { usuario: null }, carrito });
    const boton = screen.getByRole('button', { name: 'Abrir o cerrar menú' });
    expect(boton.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(boton);
    expect(boton.getAttribute('aria-expanded')).toBe('true');
  });
});
