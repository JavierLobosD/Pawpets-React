/**
 * Configuración de las entidades administrables. Cada una define sus columnas,
 * campos del formulario y reglas de validación; las vistas son genéricas.
 */
import { Link } from 'react-router-dom';
import { precioCLP } from '../../utils/formato';
import { correo, minimo, numeroNoNegativo, requerido } from '../../utils/validaciones';

export const ENTIDADES = {
  productos: {
    titulo: 'Productos',
    singular: 'producto',
    columnas: [
      ['id', 'ID'],
      ['nombre', 'Nombre'],
      ['precio', 'Precio', precioCLP],
      ['stock', 'Stock'],
    ],
    inicial: { precioOferta: 0, destacado: false },
    campos: (categorias) => [
      { nombre: 'nombre', etiqueta: 'Nombre' },
      {
        nombre: 'categoriaId',
        etiqueta: 'Categoría',
        tipo: 'select',
        numerico: true,
        opciones: categorias.map((c) => ({ valor: c.id, texto: c.nombre })),
      },
      { nombre: 'precio', etiqueta: 'Precio', tipo: 'number', numerico: true },
      {
        nombre: 'precioOferta',
        etiqueta: 'Precio de oferta (0 = sin oferta)',
        tipo: 'number',
        numerico: true,
      },
      { nombre: 'stock', etiqueta: 'Stock', tipo: 'number', numerico: true },
      { nombre: 'imagen', etiqueta: 'URL de la imagen (opcional)' },
      { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea' },
    ],
    reglas: {
      nombre: [requerido],
      categoriaId: [requerido],
      precio: [numeroNoNegativo],
      precioOferta: [numeroNoNegativo],
      stock: [numeroNoNegativo],
      descripcion: [requerido],
    },
    enlaces: [['/admin/productos/criticos', 'Productos críticos']],
  },
  categorias: {
    titulo: 'Categorías',
    singular: 'categoría',
    columnas: [
      ['id', 'ID'],
      ['nombre', 'Nombre'],
    ],
    inicial: {},
    campos: () => [
      { nombre: 'nombre', etiqueta: 'Nombre' },
      { nombre: 'imagen', etiqueta: 'URL de la imagen' },
    ],
    reglas: { nombre: [requerido], imagen: [requerido] },
  },
  usuarios: {
    titulo: 'Usuarios',
    singular: 'usuario',
    columnas: [
      ['id', 'ID'],
      ['nombre', 'Nombre'],
      ['correo', 'Correo'],
      ['rol', 'Rol'],
    ],
    inicial: { rol: 'cliente' },
    campos: () => [
      { nombre: 'nombre', etiqueta: 'Nombre' },
      { nombre: 'apellidos', etiqueta: 'Apellidos' },
      { nombre: 'correo', etiqueta: 'Correo electrónico', tipo: 'email' },
      { nombre: 'clave', etiqueta: 'Contraseña', tipo: 'password' },
      {
        nombre: 'rol',
        etiqueta: 'Rol',
        tipo: 'select',
        opciones: [
          { valor: 'admin', texto: 'admin' },
          { valor: 'cliente', texto: 'cliente' },
        ],
      },
    ],
    reglas: {
      nombre: [requerido],
      apellidos: [requerido],
      correo: [requerido, correo],
      clave: [requerido, minimo(6)],
      rol: [requerido],
    },
    // Acción extra por fila: el historial de compras del usuario.
    accionesFila: (fila) => (
      <Link
        to={`/admin/usuarios/${fila.id}/historial`}
        className="btn btn-sm btn-outline-secondary"
      >
        Historial
      </Link>
    ),
  },
};
