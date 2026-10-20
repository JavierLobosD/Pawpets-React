import db from '../data/db';

describe('Fuente de datos (db) con CRUD', () => {
  beforeEach(() => db.reiniciar());
  afterEach(() => db.reiniciar());

  it('listar entrega los datos iniciales y rechaza colecciones inexistentes', () => {
    expect(db.listar('productos').length).toBeGreaterThan(0);
    expect(() => db.listar('inexistente')).toThrowError(/desconocida/);
  });

  it('crear agrega un registro con id autoincremental', () => {
    const antes = db.listar('categorias').length;
    const nueva = db.crear('categorias', { nombre: 'Aves', imagen: '' });
    expect(nueva.id).toBe(antes + 1);
    expect(db.obtener('categorias', nueva.id).nombre).toBe('Aves');
  });

  it('actualizar modifica solo el registro indicado', () => {
    db.actualizar('productos', 1, { stock: 99 });
    expect(db.obtener('productos', 1).stock).toBe(99);
    expect(db.obtener('productos', 2).stock).not.toBe(99);
  });

  it('eliminar quita el registro', () => {
    db.eliminar('productos', 1);
    expect(db.obtener('productos', 1)).toBeUndefined();
  });

  it('cada cambio se persiste en localStorage y avisa a los suscriptores (mocks)', () => {
    const guardar = spyOn(Storage.prototype, 'setItem').and.callThrough();
    const aviso = jasmine.createSpy('aviso');
    const cancelar = db.suscribir(aviso);

    db.crear('categorias', { nombre: 'Peces', imagen: '' });

    expect(guardar).toHaveBeenCalledWith('pawpets:categorias', jasmine.any(String));
    expect(aviso).toHaveBeenCalledTimes(1);
    cancelar();
    db.eliminar('categorias', 1);
    expect(aviso).toHaveBeenCalledTimes(1);
  });
});
