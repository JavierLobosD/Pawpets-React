import { cleanup, fireEvent, screen } from '@testing-library/react';
import Contacto from '../pages/Contacto';
import { renderizar } from './ayudas';

describe('Página Contacto (formulario con validación)', () => {
  afterEach(cleanup);

  const completar = (datos) =>
    Object.entries(datos).forEach(([etiqueta, valor]) =>
      fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } }),
    );

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
    expect(screen.queryByRole('status')).toBeNull();
  });

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
