import { coincideCon, correo, minimo, requerido, validar } from '../utils/validaciones';

// Pruebas de las reglas de validación
describe('Validaciones de formulario', () => {
  // Vacío o solo espacios da error; con texto, no
  it('requerido rechaza vacíos y espacios, y acepta texto', () => {
    expect(requerido('')).not.toBe('');
    expect(requerido('   ')).not.toBe('');
    expect(requerido('Luna')).toBe('');
  });

  // Un correo sin arroba o sin punto da error
  it('correo exige usuario, arroba y dominio con punto', () => {
    expect(correo('ana@correo.cl')).toBe('');
    expect(correo('ana@correo')).not.toBe('');
    expect(correo('ana.correo.cl')).not.toBe('');
  });

  // Con 5 letras falla, con 6 pasa
  it('minimo valida el largo mínimo', () => {
    expect(minimo(6)('12345')).toContain('6');
    expect(minimo(6)('123456')).toBe('');
  });

  // Iguales pasa; distintos da el mensaje de error
  it('coincideCon compara contra otro campo del formulario', () => {
    const regla = coincideCon('clave', 'Las contraseñas');
    expect(regla('abc', { clave: 'abc' })).toBe('');
    expect(regla('xyz', { clave: 'abc' })).toBe('Las contraseñas no coincide.');
  });

  // Debe devolver errores solo de los campos malos
  it('validar devuelve solo el primer error de cada campo inválido', () => {
    const errores = validar(
      { nombre: '', correo: 'mal' },
      { nombre: [requerido], correo: [requerido, correo] },
    );
    expect(Object.keys(errores)).toEqual(['nombre', 'correo']);
    // Si todo está bien, no hay errores
    expect(validar({ nombre: 'Ana' }, { nombre: [requerido] })).toEqual({});
  });
});
