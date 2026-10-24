// db: la base de datos simulada que se prueba
import db from '../data/db';

// Pruebas de la base de datos simulada
describe('Fuente de datos (db) con CRUD', () => {
  // Vuelve a los datos iniciales en cada prueba
  // Así lo que cambia una prueba no afecta a la siguiente
  beforeEach(() => db.reiniciar());
  afterEach(() => db.reiniciar());

  // Debe traer datos y fallar con nombres que no existen
  it('listar entrega los datos iniciales y rechaza colecciones inexistentes', () => {
    // Comprueba que hay al menos un producto
    expect(db.listar('productos').length).toBeGreaterThan(0);
    // Comprueba que con un nombre inválido lanza un error que dice "desconocida"
    // Se pasa una función (() => ...) para que Jasmine pueda atrapar el error
    expect(() => db.listar('inexistente')).toThrowError(/desconocida/);
  });

  // El id nuevo debe ser el siguiente número
  it('crear agrega un registro con id autoincremental', () => {
    // Cuenta cuántas categorías hay antes de crear
    const antes = db.listar('categorias').length;
    const nueva = db.crear('categorias', { nombre: 'Aves', imagen: '' });
    // Comprueba que el id es uno más que la cantidad anterior (ids 1, 2, 3, 4 -> 5)
    expect(nueva.id).toBe(antes + 1);
    // Comprueba que se puede buscar y tiene el nombre correcto
    expect(db.obtener('categorias', nueva.id).nombre).toBe('Aves');
  });

  // Solo debe cambiar el producto 1, no el 2
  it('actualizar modifica solo el registro indicado', () => {
    db.actualizar('productos', 1, { stock: 99 });
    // Comprueba que el producto 1 cambió
    expect(db.obtener('productos', 1).stock).toBe(99);
    // Comprueba que el producto 2 no cambió
    expect(db.obtener('productos', 2).stock).not.toBe(99);
  });

  // Después de eliminar, el producto ya no se encuentra
  it('eliminar quita el registro', () => {
    db.eliminar('productos', 1);
    // Comprueba que buscarlo devuelve undefined (no existe)
    expect(db.obtener('productos', 1)).toBeUndefined();
  });

  // Revisa que guarde en localStorage y avise los cambios
  it('cada cambio se persiste en localStorage y avisa a los suscriptores (mocks)', () => {
    // Espía para ver si se llama a localStorage.setItem
    // callThrough deja que igual se guarde de verdad
    const guardar = spyOn(Storage.prototype, 'setItem').and.callThrough();
    // Función falsa que cuenta cuántas veces la avisan
    const aviso = jasmine.createSpy('aviso');
    // Se suscribe; db devuelve la función para cancelar la suscripción
    const cancelar = db.suscribir(aviso);

    // Hace un cambio
    db.crear('categorias', { nombre: 'Peces', imagen: '' });

    // Comprueba que se guardó con la clave 'pawpets:categorias' y un texto (JSON)
    expect(guardar).toHaveBeenCalledWith('pawpets:categorias', jasmine.any(String));
    // Comprueba que avisó una vez
    expect(aviso).toHaveBeenCalledTimes(1);
    // Después de cancelar ya no debe recibir más avisos
    cancelar();
    db.eliminar('categorias', 1);
    // Sigue en 1: el segundo cambio no lo avisó
    expect(aviso).toHaveBeenCalledTimes(1);
  });
});
