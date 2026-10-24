// De Testing Library: cleanup (limpia), fireEvent (simula acciones) y screen (busca en pantalla)
import { cleanup, fireEvent, screen } from '@testing-library/react';
// regiones: lista real de regiones y comunas, para elegir valores válidos
import { regiones } from '../data/seed';
// La página que se prueba
import Registro from '../pages/Registro';
// Función para dibujar con router y contextos falsos
import { renderizar } from './ayudas';

// Pruebas de la página para crear cuenta
// La sesión es falsa (mock): se controla qué devuelve registrar
describe('Página Registro', () => {
  // Limpia la pantalla después de cada prueba
  afterEach(cleanup);

  // Escribe un valor en el campo con esa etiqueta
  const escribir = (etiqueta, valor) =>
    fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });

  // Primera región y su primera comuna, para llenar los selects
  const region = Object.keys(regiones)[0];
  const comuna = regiones[region][0];

  // Llena todo el formulario con datos válidos y lo envía
  function llenarYEnviar() {
    escribir('Nombre', 'Ana');
    escribir('Apellidos', 'Pérez');
    escribir('Correo electrónico', 'ana@correo.cl');
    // Las dos contraseñas iguales y de 6 letras o más
    escribir('Contraseña', 'secreta');
    escribir('Repetir contraseña', 'secreta');
    escribir('Calle y número', 'Los Olmos 123');
    // Primero la región, porque al cambiarla se borra la comuna
    escribir('Región', region);
    escribir('Comuna', comuna);
    fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }));
  }

  // Con datos buenos debe llamar a registrar sin "confirmar"
  it('con datos válidos llama a registrar (mock de autenticación)', () => {
    // Registro falso que siempre funciona
    // .and.returnValue hace que el espía devuelva ese objeto (como si creara al usuario)
    const registrar = jasmine.createSpy('registrar').and.returnValue({ id: 99 });
    renderizar(<Registro />, { auth: { registrar } });
    llenarYEnviar();
    // Comprueba que registrar recibió exactamente estos datos (sin el campo confirmar)
    expect(registrar).toHaveBeenCalledWith({
      nombre: 'Ana',
      apellidos: 'Pérez',
      correo: 'ana@correo.cl',
      clave: 'secreta',
      calle: 'Los Olmos 123',
      region,
      comuna,
    });
    // Comprueba que no apareció la alerta de error
    expect(screen.queryByRole('alert')).toBeNull();
  });

  // Si el correo ya existe, sale la alerta roja
  it('con un correo ya existente muestra el error', () => {
    // Registro falso que falla (devuelve null)
    const registrar = jasmine.createSpy('registrar').and.returnValue(null);
    renderizar(<Registro />, { auth: { registrar } });
    llenarYEnviar();
    // Comprueba que sí se intentó registrar
    expect(registrar).toHaveBeenCalled();
    // Comprueba que aparece la alerta de correo repetido
    expect(screen.getByRole('alert').textContent).toContain('Ya existe una cuenta');
  });
});
