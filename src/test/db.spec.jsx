import db from '../data/db';

// Pruebas de la base de datos simulada
describe('Fuente de datos (db) con CRUD', () => {
  // Vuelve a los datos iniciales en cada prueba
  beforeEach(() => db.reiniciar());
  afterEach(() => db.reiniciar());

  // Debe traer datos y fallar con nombres que no existen
  it('listar entrega los datos iniciales y rechaza colecciones inexistentes', () => {
    expect(db.listar('productos').length).toBeGreaterThan(0);
    expect(() => db.listar('inexistente')).toThrowError(/desconocida/);
  });

  // El id nuevo debe ser el siguiente número
  it('crear agrega un registro con id autoincremental', () => {
    const antes = db.listar('categorias').length;
    const nueva = db.crear('categorias', { nombre: 'Aves', imagen: '' });
    expect(nueva.id).toBe(antes + 1);
    expect(db.obtener('categorias', nueva.id).nombre).toBe('Aves');
  });

  // Solo debe cambiar el producto 1, no el 2
  it('actualizar modifica solo el registro indicado', () => {
    db.actualizar('productos', 1, { stock: 99 });
    expect(db.obtener('productos', 1).stock).toBe(99);
    expect(db.obtener('productos', 2).stock).not.toBe(99);
  });

  // Después de eliminar, el producto ya no se encuentra
  it('eliminar quita el registro', () => {
    db.eliminar('productos', 1);
    expect(db.obtener('productos', 1)).toBeUndefined();
  });

  // Revisa que guarde en localStorage y avise los cambios
  it('cada cambio se persiste en localStorage y avisa a los suscriptores (mocks)', () => {
    // Espía para ver si se llama a localStorage.setItem
    const guardar = spyOn(Storage.prototype, 'setItem').and.callThrough();
    // Función falsa que cuenta cuántas veces la avisan
    const aviso = jasmine.createSpy('aviso');
    const cancelar = db.suscribir(aviso);

    db.crear('categorias', { nombre: 'Peces', imagen: '' });

    expect(guardar).toHaveBeenCalledWith('pawpets:categorias', jasmine.any(String));
    expect(aviso).toHaveBeenCalledTimes(1);
    // Después de cancelar ya no debe recibir más avisos
    cancelar();
    db.eliminar('categorias', 1);
    expect(aviso).toHaveBeenCalledTimes(1);
  });
});
