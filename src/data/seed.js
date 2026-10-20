/** Datos iniciales de la tienda. db.js los copia a localStorage la primera vez. */

export const categorias = [
  {
    id: 1,
    nombre: 'Alimentos Perro',
    imagen: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400',
  },
  {
    id: 2,
    nombre: 'Alimentos Gato',
    imagen: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400',
  },
  {
    id: 3,
    nombre: 'Juguetes y Accesorios',
    imagen: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
  },
  {
    id: 4,
    nombre: 'Salud',
    imagen: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400',
  },
];

// precioOferta = 0 significa "sin oferta". stock <= UMBRAL_CRITICO se considera crítico.
export const productos = [
  {
    id: 1,
    nombre: 'Alimento Premium Perro Adulto',
    categoriaId: 1,
    precio: 18990,
    precioOferta: 0,
    stock: 25,
    imagen: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400',
    descripcion:
      'Alimento balanceado con proteínas de alta calidad para perros adultos de todas las razas.',
    destacado: true,
  },
  {
    id: 2,
    nombre: 'Alimento Gato Esterilizado',
    categoriaId: 2,
    precio: 16490,
    precioOferta: 14990,
    stock: 18,
    imagen: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400',
    descripcion:
      'Fórmula baja en grasa que ayuda a mantener el peso ideal de gatos esterilizados.',
    destacado: true,
  },
  {
    id: 3,
    nombre: 'Snacks Naturales',
    categoriaId: 1,
    precio: 5990,
    precioOferta: 0,
    stock: 40,
    imagen: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=400',
    descripcion:
      'Premios naturales sin colorantes, ideales para el entrenamiento diario.',
    destacado: true,
  },
  {
    id: 4,
    nombre: 'Pelota de Goma Resistente',
    categoriaId: 3,
    precio: 3990,
    precioOferta: 2990,
    stock: 4,
    imagen: '',
    descripcion: 'Juguete de goma atóxica, resistente a las mordidas más fuertes.',
    destacado: false,
  },
  {
    id: 5,
    nombre: 'Rascador para Gatos',
    categoriaId: 3,
    precio: 24990,
    precioOferta: 0,
    stock: 3,
    imagen: '',
    descripcion: 'Rascador de tres niveles con base estable y cuerda de sisal.',
    destacado: false,
  },
  {
    id: 6,
    nombre: 'Antiparasitario Externo',
    categoriaId: 4,
    precio: 9990,
    precioOferta: 0,
    stock: 12,
    imagen: '',
    descripcion: 'Pipeta de acción prolongada contra pulgas y garrapatas.',
    destacado: false,
  },
  {
    id: 7,
    nombre: 'Shampoo Hipoalergénico',
    categoriaId: 4,
    precio: 7490,
    precioOferta: 5990,
    stock: 9,
    imagen: '',
    descripcion: 'Shampoo suave para pieles sensibles, con pH balanceado para mascotas.',
    destacado: false,
  },
];

// Las contraseñas están en texto plano solo porque esto simula una base de datos.
export const usuarios = [
  {
    id: 1,
    nombre: 'Admin',
    apellidos: 'PawPets',
    correo: 'admin@pawpets.cl',
    clave: 'Admin123',
    rol: 'admin',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Puente Alto',
    calle: 'Av. Concha y Toro 100',
  },
  {
    id: 2,
    nombre: 'Camila',
    apellidos: 'Rojas',
    correo: 'camila@correo.cl',
    clave: 'Cliente123',
    rol: 'cliente',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Maipú',
    calle: 'Los Aromos 456',
  },
];

export const blogs = [
  {
    id: 1,
    titulo: 'Cómo elegir el alimento ideal para tu perro',
    resumen: 'Edad, tamaño y actividad: claves para escoger bien.',
    contenido:
      'Cada perro tiene necesidades distintas según su edad, tamaño y nivel de actividad. Un cachorro requiere más proteínas y calorías; un adulto necesita equilibrio; un perro senior, menos grasa y apoyo articular. Lee siempre la etiqueta y consulta con tu veterinario antes de cambiar la dieta.',
  },
  {
    id: 2,
    titulo: 'Adopta, no compres: tenencia responsable',
    resumen: 'Adoptar salva vidas y transforma hogares.',
    contenido:
      'Miles de mascotas esperan un hogar. Adoptar implica un compromiso de años: alimentación, salud, tiempo y cariño. Antes de adoptar, evalúa tu espacio y tus horarios, y esteriliza a tu mascota para evitar camadas no deseadas.',
  },
];

// Región -> comunas, para los selects dependientes del checkout y del registro.
export const regiones = {
  'Región Metropolitana de Santiago': ['Puente Alto', 'Maipú', 'Providencia', 'Santiago'],
  'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué'],
  'Región del Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles'],
};
