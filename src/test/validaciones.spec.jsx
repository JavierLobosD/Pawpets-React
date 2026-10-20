import { coincideCon, correo, minimo, requerido, validar } from '../utils/validaciones';

describe('Validaciones de formulario', () => {
  it('requerido rechaza vacíos y espacios, y acepta texto', () => {
    expect(requerido('')).not.toBe('');
    expect(requerido('   ')).not.toBe('');
    expect(requerido('Luna')).toBe('');
  });

  it('correo exige usuario, arroba y dominio con punto', () => {
    expect(correo('ana@correo.cl')).toBe('');
    expect(correo('ana@correo')).not.toBe('');
    expect(correo('ana.correo.cl')).not.toBe('');
  });

  it('minimo valida el largo mínimo', () => {
    expect(minimo(6)('12345')).toContain('6');
    expect(minimo(6)('123456')).toBe('');
  });

  it('coincideCon compara contra otro campo del formulario', () => {
    const regla = coincideCon('clave', 'Las contraseñas');
    expect(regla('abc', { clave: 'abc' })).toBe('');
    expect(regla('xyz', { clave: 'abc' })).toBe('Las contraseñas no coincide.');
  });

  it('validar devuelve solo el primer error de cada campo inválido', () => {
    const errores = validar(
      { nombre: '', correo: 'mal' },
      { nombre: [requerido], correo: [requerido, correo] },
    );
    expect(Object.keys(errores)).toEqual(['nombre', 'correo']);
    expect(validar({ nombre: 'Ana' }, { nombre: [requerido] })).toEqual({});
  });
});
