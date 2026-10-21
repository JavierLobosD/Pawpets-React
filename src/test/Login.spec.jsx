import { cleanup, fireEvent, screen } from '@testing-library/react';
import Login from '../pages/Login';
import { renderizar } from './ayudas';

// Pruebas de la página de login
describe('Página Login', () => {
  // Limpia la pantalla después de cada prueba
  afterEach(cleanup);

  // Escribe un valor en el campo con esa etiqueta
  const escribir = (etiqueta, valor) =>
    fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });

  // Lo que se escribe debe quedar en el input
  it('estado del formulario: el campo refleja lo que escribe el usuario', () => {
    renderizar(<Login />, { auth: { iniciarSesion: () => null } });
    escribir('Correo electrónico', 'ana@correo.cl');
    expect(screen.getByLabelText('Correo electrónico').value).toBe('ana@correo.cl');
  });

  // Con campos vacíos salen dos errores y no intenta entrar
  it('muestra errores de validación y no llama a iniciarSesion con campos vacíos', () => {
    const iniciarSesion = jasmine.createSpy('iniciarSesion');
    renderizar(<Login />, { auth: { iniciarSesion } });
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    expect(screen.getAllByText('Este campo es obligatorio.')).toHaveSize(2);
    expect(iniciarSesion).not.toHaveBeenCalled();
  });

  // Si el login falla, debe salir la alerta roja
  it('con credenciales incorrectas muestra la alerta de error (mock de autenticación)', () => {
    // Login falso que siempre falla (devuelve null)
    const iniciarSesion = jasmine.createSpy('iniciarSesion').and.returnValue(null);
    renderizar(<Login />, { auth: { iniciarSesion } });
    escribir('Correo electrónico', 'ana@correo.cl');
    escribir('Contraseña', 'mala');
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    expect(iniciarSesion).toHaveBeenCalledWith('ana@correo.cl', 'mala');
    expect(screen.getByRole('alert').textContent).toContain('incorrectos');
  });
});
