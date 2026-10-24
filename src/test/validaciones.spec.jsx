// Reglas de validación que se prueban
import { coincideCon, correo, minimo, requerido, validar } from '../utils/validaciones';

// Pruebas de las reglas de validación
// Cada regla devuelve '' si está bien o un mensaje si está mal
describe('Validaciones de formulario', () => {
  // Vacío o solo espacios da error; con texto, no
  it('requerido rechaza vacíos y espacios, y acepta texto', () => {
    // not.toBe('') = devolvió algún mensaje de error
    expect(requerido('')).not.toBe('');
    expect(requerido('   ')).not.toBe('');
    // toBe('') = sin error
    expect(requerido('Luna')).toBe('');
  });

  // Un correo sin arroba o sin punto da error
  it('correo exige usuario, arroba y dominio con punto', () => {
    // Correcto
    expect(correo('ana@correo.cl')).toBe('');
    // Falta el punto en el dominio
    expect(correo('ana@correo')).not.toBe('');
    // Falta la arroba
    expect(correo('ana.correo.cl')).not.toBe('');
  });

  // Con 5 letras falla, con 6 pasa
  it('minimo valida el largo mínimo', () => {
    // minimo(6) crea la regla; ('12345') la prueba. El mensaje debe nombrar el 6
    expect(minimo(6)('12345')).toContain('6');
    expect(minimo(6)('123456')).toBe('');
  });

  // Iguales pasa; distintos da el mensaje de error
  it('coincideCon compara contra otro campo del formulario', () => {
    // Regla que compara con el campo clave
    const regla = coincideCon('clave', 'Las contraseñas');
    // El 2do argumento simula todos los valores del formulario
    expect(regla('abc', { clave: 'abc' })).toBe('');
    expect(regla('xyz', { clave: 'abc' })).toBe('Las contraseñas no coincide.');
  });

  // Debe devolver errores solo de los campos malos
  it('validar devuelve solo el primer error de cada campo inválido', () => {
    // nombre vacío y correo mal escrito: los dos deben tener error
    const errores = validar(
      { nombre: '', correo: 'mal' },
      { nombre: [requerido], correo: [requerido, correo] },
    );
    // Comprueba que hay error en nombre y en correo (una sola clave por campo)
    expect(Object.keys(errores)).toEqual(['nombre', 'correo']);
    // Si todo está bien, no hay errores
    expect(validar({ nombre: 'Ana' }, { nombre: [requerido] })).toEqual({});
  });
});
