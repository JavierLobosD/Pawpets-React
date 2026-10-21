/**
 * Configuración de las entidades administrables. Cada una define sus columnas,
 * campos del formulario y reglas de validación; las vistas son genéricas.
 */
import { Link } from 'react-router-dom';
import { precioCLP } from '../../utils/formato';
import { correo, minimo, numeroNoNegativo, requerido } from '../../utils/validaciones';

export const ENTIDADES = {
  // Configuración de los productos
  productos: {
    titulo: 'Productos',
    singular: 'producto',
    // Columnas de la tabla: [campo, título, formato opcional]
    columnas: [
      ['id', 'ID'],
      ['nombre', 'Nombre'],
      ['precio', 'Precio', precioCLP],
      ['stock', 'Stock'],
    ],
    // Valores por defecto al crear un producto nuevo
    inicial: { precioOferta: 0, destacado: false },
    // Campos del formulario; recibe categorías para el select
    campos: (categorias) => [
      { nombre: 'nombre', etiqueta: 'Nombre' },
      {
        nombre: 'categoriaId',
        etiqueta: 'Categoría',
        tipo: 'select',
        numerico: true,
        // Convierte cada categoría en una opción del select
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
    // Validaciones de cada campo del producto
    reglas: {
      nombre: [requerido],
      categoriaId: [requerido],
      precio: [numeroNoNegativo],
      precioOferta: [numeroNoNegativo],
      stock: [numeroNoNegativo],
      descripcion: [requerido],
    },
    // Botón extra arriba para ver productos con poco stock
    enlaces: [['/admin/productos/criticos', 'Productos críticos']],
  },
  // Configuración de las categorías
  categorias: {
    titulo: 'Categorías',
    singular: 'categoría',
    columnas: [
      ['id', 'ID'],
      ['nombre', 'Nombre'],
    ],
    // No necesita valores por defecto
    inicial: {},
    campos: () => [
      { nombre: 'nombre', etiqueta: 'Nombre' },
      { nombre: 'imagen', etiqueta: 'URL de la imagen' },
    ],
    // Nombre e imagen son obligatorios
    reglas: { nombre: [requerido], imagen: [requerido] },
  },
  // Configuración de los usuarios
  usuarios: {
    titulo: 'Usuarios',
    singular: 'usuario',
    columnas: [
      ['id', 'ID'],
      ['nombre', 'Nombre'],
      ['correo', 'Correo'],
      ['rol', 'Rol'],
    ],
    // Los usuarios nuevos parten como clientes
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
        // Solo hay dos roles: admin o cliente
        opciones: [
          { valor: 'admin', texto: 'admin' },
          { valor: 'cliente', texto: 'cliente' },
        ],
      },
    ],
    // Validaciones; la contraseña pide mínimo 6 letras
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
