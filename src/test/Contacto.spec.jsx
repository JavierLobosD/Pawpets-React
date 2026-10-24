// De Testing Library: cleanup (limpia), fireEvent (simula acciones) y screen (busca en pantalla)
import { cleanup, fireEvent, screen } from '@testing-library/react';
// La página que se prueba
import Contacto from '../pages/Contacto';
// Función para dibujar dentro de un router de prueba
import { renderizar } from './ayudas';

// Pruebas del formulario de contacto
// Esta página no usa contextos, por eso no se pasan mocks
describe('Página Contacto (formulario con validación)', () => {
  // Limpia la pantalla después de cada prueba
  afterEach(cleanup);

  // Llena varios campos buscándolos por su etiqueta
  // Recibe un objeto { 'Etiqueta': 'valor' } y simula escribir en cada campo
  const completar = (datos) =>
    Object.entries(datos).forEach(([etiqueta, valor]) =>
      fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } }),
    );

  // Correo mal escrito: debe salir error y no enviarse
  it('un correo inválido muestra su error y no confirma el envío', () => {
    renderizar(<Contacto />);
    // Llena todo bien menos el correo ('mal')
    completar({
      Nombre: 'Ana',
      'Correo electrónico': 'mal',
      Asunto: 'Otra consulta',
      Mensaje: 'Mensaje de prueba largo',
    });
    // Simula el clic en el botón de enviar
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    // Comprueba que aparece el mensaje de error del correo
    expect(screen.getByText(/correo válido/)).toBeTruthy();
    // No debe aparecer el mensaje de gracias
    // queryBy devuelve null si no lo encuentra (getBy daría error)
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
    // Comprueba que el aviso (role="status") tiene el texto de confirmación
    expect(screen.getByRole('status').textContent).toContain('Recibimos tu mensaje');
  });
});
