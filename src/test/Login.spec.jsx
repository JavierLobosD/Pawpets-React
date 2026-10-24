// De Testing Library: cleanup (limpia), fireEvent (simula acciones) y screen (busca en pantalla)
import { cleanup, fireEvent, screen } from '@testing-library/react';
// La página que se prueba
import Login from '../pages/Login';
// Función para dibujar con router y contextos falsos
import { renderizar } from './ayudas';

// Pruebas de la página de login
// La sesión es falsa (mock): se controla qué devuelve iniciarSesion
describe('Página Login', () => {
  // Limpia la pantalla después de cada prueba
  afterEach(cleanup);

  // Escribe un valor en el campo con esa etiqueta
  // fireEvent.change simula que el usuario escribió ese texto
  const escribir = (etiqueta, valor) =>
    fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });

  // Lo que se escribe debe quedar en el input
  it('estado del formulario: el campo refleja lo que escribe el usuario', () => {
    // iniciarSesion falso que no hace nada (devuelve null)
    renderizar(<Login />, { auth: { iniciarSesion: () => null } });
    escribir('Correo electrónico', 'ana@correo.cl');
    // Comprueba que el input muestra lo escrito (formulario controlado con useState)
    expect(screen.getByLabelText('Correo electrónico').value).toBe('ana@correo.cl');
  });

  // Con campos vacíos salen dos errores y no intenta entrar
  it('muestra errores de validación y no llama a iniciarSesion con campos vacíos', () => {
    // Espía para saber si se llamó a iniciarSesion
    const iniciarSesion = jasmine.createSpy('iniciarSesion');
    renderizar(<Login />, { auth: { iniciarSesion } });
    // Aprieta Entrar sin escribir nada
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    // Comprueba que sale el error en los dos campos (correo y contraseña)
    expect(screen.getAllByText('Este campo es obligatorio.')).toHaveSize(2);
    // Comprueba que no se intentó iniciar sesión
    expect(iniciarSesion).not.toHaveBeenCalled();
  });

  // Si el login falla, debe salir la alerta roja
  it('con credenciales incorrectas muestra la alerta de error (mock de autenticación)', () => {
    // Login falso que siempre falla (devuelve null)
    const iniciarSesion = jasmine.createSpy('iniciarSesion').and.returnValue(null);
    renderizar(<Login />, { auth: { iniciarSesion } });
    // Escribe datos con buen formato y aprieta Entrar
    escribir('Correo electrónico', 'ana@correo.cl');
    escribir('Contraseña', 'mala');
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    // Comprueba que se llamó con el correo y la clave escritos
    expect(iniciarSesion).toHaveBeenCalledWith('ana@correo.cl', 'mala');
    // Comprueba que aparece la alerta (role="alert") con el mensaje de error
    expect(screen.getByRole('alert').textContent).toContain('incorrectos');
  });
});
