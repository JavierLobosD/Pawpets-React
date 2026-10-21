/** Datos iniciales de la tienda. db.js los copia a localStorage la primera vez. */

export const categorias = [
  {
    id: 1,
    nombre: 'Alimentos Perro',
    // Banner propio guardado en public/img/categorias (se sirve desde la raíz del sitio).
    imagen: '/img/categorias/alimentos-perro.jpg',
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

// Arma el link de una foto de Unsplash a partir de su id, así no repetimos la URL larga.
const foto = (id) => `https://images.unsplash.com/photo-${id}?w=500&q=80`;

// Productos de la tienda (20 en total). precio y precioOferta van en pesos chilenos
// y imagen es el link de la foto.
// precioOferta = 0 significa "sin oferta". stock <= UMBRAL_CRITICO se considera crítico.
export const productos = [
  // Alimentos para perro: el más vendido, sin oferta
  {
    id: 1,
    nombre: 'Alimento Premium Perro Adulto 8 kg',
    categoriaId: 1,
    precio: 18990,
    precioOferta: 0,
    stock: 25,
    imagen: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400',
    descripcion:
      'Alimento balanceado con proteínas de alta calidad para perros adultos de todas las razas.',
    destacado: true,
  },
  // Alimentos para gato: con oferta
  {
    id: 2,
    nombre: 'Alimento Gato Esterilizado 3 kg',
    categoriaId: 2,
    precio: 16490,
    precioOferta: 14990,
    stock: 18,
    imagen: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400',
    descripcion:
      'Fórmula baja en grasa que ayuda a mantener el peso ideal de gatos esterilizados.',
    destacado: true,
  },
  // Premios para perro, aparece en destacados
  {
    id: 3,
    nombre: 'Snacks Naturales de Pollo 200 g',
    categoriaId: 1,
    precio: 5990,
    precioOferta: 0,
    stock: 40,
    imagen: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=400',
    descripcion:
      'Premios naturales sin colorantes, ideales para el entrenamiento diario.',
    destacado: true,
  },
  // Juguete: con oferta y poco stock (sale en críticos)
  {
    id: 4,
    nombre: 'Pelota de Goma Resistente',
    categoriaId: 3,
    precio: 3990,
    precioOferta: 2990,
    stock: 4,
    imagen: foto('1696416806113-1f247ff0eb5c'),
    descripcion: 'Juguete de goma atóxica, resistente a las mordidas más fuertes.',
    destacado: false,
  },
  // Rascador grande: poco stock (sale en críticos)
  {
    id: 5,
    nombre: 'Rascador para Gatos 3 Niveles',
    categoriaId: 3,
    precio: 24990,
    precioOferta: 0,
    stock: 3,
    imagen: foto('1724023838952-a12ba4b36a8a'),
    descripcion: 'Rascador de tres niveles con base estable y cuerda de sisal.',
    destacado: false,
  },
  // Salud: pipeta contra pulgas
  {
    id: 6,
    nombre: 'Antiparasitario Externo Perros',
    categoriaId: 4,
    precio: 9990,
    precioOferta: 0,
    stock: 12,
    imagen: foto('1628009368231-7bb7cfcb0def'),
    descripcion: 'Pipeta de acción prolongada contra pulgas y garrapatas.',
    destacado: false,
  },
  // Salud: shampoo, con oferta
  {
    id: 7,
    nombre: 'Shampoo Hipoalergénico 500 ml',
    categoriaId: 4,
    precio: 7490,
    precioOferta: 5990,
    stock: 9,
    imagen: foto('1597603413826-cd1c06b05222'),
    descripcion: 'Shampoo suave para pieles sensibles, con pH balanceado para mascotas.',
    destacado: false,
  },
  // Comida de cachorro, aparece en destacados
  {
    id: 8,
    nombre: 'Alimento Cachorro Razas Pequeñas 3 kg',
    categoriaId: 1,
    precio: 12990,
    precioOferta: 0,
    stock: 30,
    imagen: foto('1764249453874-46864677b10e'),
    descripcion:
      'Croquetas pequeñas y fáciles de masticar, con DHA para el desarrollo de cachorros.',
    destacado: true,
  },
  // Comida para perros mayores, con oferta
  {
    id: 9,
    nombre: 'Alimento Perro Senior 15 kg',
    categoriaId: 1,
    precio: 32990,
    precioOferta: 29990,
    stock: 14,
    imagen: foto('1632236568054-12f36ecee2f6'),
    descripcion:
      'Con condroitina y glucosamina para cuidar las articulaciones de perros mayores de 7 años.',
    destacado: false,
  },
  // Latas de comida húmeda, con oferta
  {
    id: 10,
    nombre: 'Alimento Húmedo Perro, pack 12 latas',
    categoriaId: 1,
    precio: 14990,
    precioOferta: 12990,
    stock: 22,
    imagen: foto('1676193866128-03a926df76ef'),
    descripcion:
      'Latas de carne y verduras en trozos, ideales para mezclar con croquetas.',
    destacado: false,
  },
  // Comida de gatito, aparece en destacados
  {
    id: 11,
    nombre: 'Alimento Gatito Pollo y Arroz 2 kg',
    categoriaId: 2,
    precio: 11990,
    precioOferta: 0,
    stock: 27,
    imagen: foto('1520811607976-6d7812b0ecac'),
    descripcion:
      'Nutrición completa para gatitos de 2 a 12 meses, con taurina y omega 3.',
    destacado: true,
  },
  // Comida de gato adulto, con oferta
  {
    id: 12,
    nombre: 'Alimento Gato Adulto Salmón 7,5 kg',
    categoriaId: 2,
    precio: 29990,
    precioOferta: 26990,
    stock: 16,
    imagen: foto('1668795930946-f0ab82562d81'),
    descripcion: 'Rico en omega 3 para un pelaje brillante y una piel saludable.',
    destacado: false,
  },
  // Sachets húmedos para gato
  {
    id: 13,
    nombre: 'Sachets Húmedos para Gato, pack 24',
    categoriaId: 2,
    precio: 12490,
    precioOferta: 0,
    stock: 8,
    imagen: foto('1591324535489-9c78376631dc'),
    descripcion: 'Trocitos en salsa de atún y pollo, un premio húmedo para el día a día.',
    destacado: false,
  },
  // Cama para perro, con oferta
  {
    id: 14,
    nombre: 'Cama Acolchada para Perro talla M',
    categoriaId: 3,
    precio: 21990,
    precioOferta: 18990,
    stock: 11,
    imagen: foto('1708303364738-48188a0e050f'),
    descripcion:
      'Cama suave y lavable con base antideslizante, para perros de hasta 15 kg.',
    destacado: false,
  },
  // Collar con correa: casi sin stock (sale en críticos)
  {
    id: 15,
    nombre: 'Collar Ajustable con Correa',
    categoriaId: 3,
    precio: 8990,
    precioOferta: 0,
    stock: 2,
    imagen: foto('1673069783560-6d4094285be4'),
    descripcion: 'Nylon reforzado con cierre de seguridad y detalles reflectantes.',
    destacado: false,
  },
  // Transportadora para viajes y veterinario
  {
    id: 16,
    nombre: 'Transportadora para Mascotas',
    categoriaId: 3,
    precio: 27990,
    precioOferta: 0,
    stock: 7,
    imagen: foto('1527150602-a98f7a6f2746'),
    descripcion:
      'Rígida y ventilada, con puerta metálica y asa cómoda. Ideal para viajes y visitas al veterinario.',
    destacado: false,
  },
  // Rascador chico para espacios reducidos
  {
    id: 17,
    nombre: 'Poste Rascador Compacto',
    categoriaId: 3,
    precio: 12990,
    precioOferta: 0,
    stock: 15,
    imagen: foto('1545249390-6bdfa286032f'),
    descripcion:
      'Poste cubierto de sisal con base ancha, perfecto para espacios pequeños.',
    destacado: false,
  },
  // Vitaminas para gato, con oferta
  {
    id: 18,
    nombre: 'Multivitamínico para Gatos, 60 comprimidos',
    categoriaId: 4,
    precio: 11490,
    precioOferta: 9990,
    stock: 13,
    imagen: foto('1628119402607-6e4bea9a9243'),
    descripcion: 'Refuerza las defensas y mejora el pelaje. Sabor pollo.',
    destacado: false,
  },
  // Suplemento de articulaciones para perros
  {
    id: 19,
    nombre: 'Suplemento de Articulaciones, 90 tabletas',
    categoriaId: 4,
    precio: 19990,
    precioOferta: 0,
    stock: 6,
    imagen: foto('1659398730848-99dddd3520a3'),
    descripcion: 'Con glucosamina y colágeno para perros activos o de edad avanzada.',
    destacado: false,
  },
  // Kit dental: poco stock (sale en críticos)
  {
    id: 20,
    nombre: 'Kit Cuidado Dental (pasta + cepillo)',
    categoriaId: 4,
    precio: 8490,
    precioOferta: 0,
    stock: 4,
    imagen: foto('1770836037816-4445dbd449fd'),
    descripcion:
      'Pasta con sabor a carne y cepillo de doble cabezal para limpiar sin estrés.',
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
