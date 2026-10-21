import { cleanup, fireEvent, screen } from '@testing-library/react';
import Contacto from '../pages/Contacto';
import { renderizar } from './ayudas';

// Pruebas del formulario de contacto
describe('Página Contacto (formulario con validación)', () => {
  // Limpia la pantalla después de cada prueba
  afterEach(cleanup);

  // Llena varios campos buscándolos por su etiqueta
  const completar = (datos) =>
    Object.entries(datos).forEach(([etiqueta, valor]) =>
      fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } }),
    );

  // Correo mal escrito: debe salir error y no enviarse
  it('un correo inválido muestra su error y no confirma el envío', () => {
    renderizar(<Contacto />);
    completar({
      Nombre: 'Ana',
      'Correo electrónico': 'mal',
      Asunto: 'Otra consulta',
      Mensaje: 'Mensaje de prueba largo',
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(screen.getByText(/correo válido/)).toBeTruthy();
    // No debe aparecer el mensaje de gracias
    expect(screen.queryByRole('status')).toBeNull();
  });

  // Todo bien escrito: debe salir el mensaje de gracias
  it('con datos válidos muestra la confirmación', () => {
    renderizar(<Contacto />);
    completar({
      Nombre: 'Ana',
      'Correo electrónico': 'ana@correo.cl',
      Asunto: 'Otra consulta',
      Mensaje: 'Mensaje de prueba largo',
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(screen.getByRole('status').textContent).toContain('Recibimos tu mensaje');
  });
});
