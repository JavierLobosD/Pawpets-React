/**
 * Configuración de las entidades administrables. Cada una define sus columnas,
 * campos del formulario y reglas de validación; las vistas son genéricas.
 */
// Este archivo no es una vista: solo guarda datos que leen AdminEntidad,
// AdminFormulario y Perfil. Así una misma página sirve para las tres entidades.
// Link: se usa en el botón Historial de cada usuario
import { Link } from 'react-router-dom';
// precioCLP: formato de pesos para la columna Precio
import { precioCLP } from '../../utils/formato';
// Reglas de validación de los formularios del admin
import { correo, minimo, numeroNoNegativo, requerido } from '../../utils/validaciones';

// Objeto con una clave por entidad; la clave es el mismo nombre de la colección en db
// y el mismo :entidad de la URL (por ejemplo /admin/productos)
export const ENTIDADES = {
  // Configuración de los productos
  productos: {
    // Título de la página y nombre en singular para "Nuevo producto" / "Editar producto"
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
    // Cada campo: nombre = clave del dato, etiqueta = texto visible, tipo = control,
    // numerico = true si hay que pasarlo a número antes de guardar
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
    // imagen no tiene reglas porque es opcional
    reglas: {
      nombre: [requerido],
      categoriaId: [requerido],
      precio: [numeroNoNegativo],
      precioOferta: [numeroNoNegativo],
      stock: [numeroNoNegativo],
      descripcion: [requerido],
    },
    // Botón extra arriba para ver productos con poco stock
    // Formato: [ruta, texto del botón]
    enlaces: [['/admin/productos/criticos', 'Productos críticos']],
  },
  // Configuración de las categorías
  categorias: {
    titulo: 'Categorías',
    singular: 'categoría',
    // Columnas de la tabla: solo id y nombre
    columnas: [
      ['id', 'ID'],
      ['nombre', 'Nombre'],
    ],
    // No necesita valores por defecto
    inicial: {},
    // Campos del formulario; no usa las categorías, por eso no recibe nada
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
    // Columnas de la tabla (la clave no se muestra)
    columnas: [
      ['id', 'ID'],
      ['nombre', 'Nombre'],
      ['correo', 'Correo'],
      ['rol', 'Rol'],
    ],
    // Los usuarios nuevos parten como clientes
    inicial: { rol: 'cliente' },
    // Campos del formulario; también los usa la página Perfil
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
    // Es una función: AdminEntidad la llama con cada fila y dibuja el link que devuelve
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
