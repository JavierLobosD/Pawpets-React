import { cleanup, fireEvent, screen } from '@testing-library/react';
import Login from '../pages/Login';
import { renderizar } from './ayudas';

describe('Página Login', () => {
  afterEach(cleanup);

  const escribir = (etiqueta, valor) =>
    fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });

  it('estado del formulario: el campo refleja lo que escribe el usuario', () => {
    renderizar(<Login />, { auth: { iniciarSesion: () => null } });
    escribir('Correo electrónico', 'ana@correo.cl');
    expect(screen.getByLabelText('Correo electrónico').value).toBe('ana@correo.cl');
  });

  it('muestra errores de validación y no llama a iniciarSesion con campos vacíos', () => {
    const iniciarSesion = jasmine.createSpy('iniciarSesion');
    renderizar(<Login />, { auth: { iniciarSesion } });
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    expect(screen.getAllByText('Este campo es obligatorio.')).toHaveSize(2);
    expect(iniciarSesion).not.toHaveBeenCalled();
  });

  it('con credenciales incorrectas muestra la alerta de error (mock de autenticación)', () => {
    const iniciarSesion = jasmine.createSpy('iniciarSesion').and.returnValue(null);
    renderizar(<Login />, { auth: { iniciarSesion } });
    escribir('Correo electrónico', 'ana@correo.cl');
    escribir('Contraseña', 'mala');
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    expect(iniciarSesion).toHaveBeenCalledWith('ana@correo.cl', 'mala');
    expect(screen.getByRole('alert').textContent).toContain('incorrectos');
  });
});
