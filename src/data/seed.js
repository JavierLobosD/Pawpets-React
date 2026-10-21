/** Datos iniciales de la tienda. db.js los copia a localStorage la primera vez. */

// Las 4 categorías de la tienda con su imagen
export const categorias = [
  {
    id: 1,
    nombre: 'Alimentos Perro',
    // Banner propio guardado en public/img/categorias (se sirve desde la raíz del sitio).
    imagen: '/img/categorias/categoria-perro.jpg',
  },
  {
    id: 2,
    nombre: 'Alimentos Gato',
    imagen: '/img/categorias/categoria-gatos.jpg',
  },
  {
    id: 3,
    nombre: 'Juguetes y Accesorios',
    imagen: '/img/categorias/categoria-juguetes.jpg',
  },
  {
    id: 4,
    nombre: 'Salud',
    imagen: '/img/categorias/categoria-salud.jpg',
  },
];

// Cambio: se borró la función foto porque ya no se usaba

// Productos de la tienda (20 en total). precio y precioOferta van en pesos chilenos
// y imagen es el link de la foto.
// precioOferta = 0 significa "sin oferta". stock <= UMBRAL_CRITICO se considera crítico.
export const productos = [
  // Alimentos para perro: el más vendido, sin oferta
  {
    id: 1,
    nombre: 'Alimento Premium Perro Adulto 20 kg',
    categoriaId: 1,
    precio: 35000,
    precioOferta: 0,
    stock: 25,
    imagen: '/img/productos/premium-perro.png',
    descripcion:
      'Durante la vida adulta del perro cambian sus requerimientos y necesidades nutricionales. Premium Perro Adulto aporta niveles de energía adecuados para esta etapa, colabora con una piel sana, un pelo brilloso y además brinda ingredientes de gran digestibilidad.',
      destacado: true,
  },
  // Alimentos para gato: con oferta
  {
    id: 2,
    nombre: 'Alimento Gato Esterilizado 3 kg',
    categoriaId: 2,
    precio: 17970,
    precioOferta: 14990,
    stock: 18,
    imagen: '/img/productos/comida-gato-esterilizado.png',
    descripcion:
      'Alimento completo y balanceado para gatos adultos castrados o esterilizados.',
    destacado: true,
  },
  // Premios para perro, aparece en destacados
  {
    id: 3,
    nombre: 'Pechugas de Pollo deshidratadas 30g',
    categoriaId: 1,
    precio: 4990,
    precioOferta: 0,
    stock: 40,
    imagen: '/img/productos/snack-pollo.webp',
    descripcion:
      'Pechuga de pollo deshidratada, son el snack perfecto para premiar a tu perro de forma saludable. Un snack práctico, sabroso y nutritivo que hará feliz a tu perro en cualquier momento del día',
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
    imagen: '/img/productos/pelota-juguete.jpg',
    descripcion: 'Pelota de goma solida ultra resistente a los dientes de tu perro.',
    destacado: false,
  },
  // Rascador grande: poco stock (sale en críticos)
  {
    id: 5,
    nombre: 'Rascador para Gatos 3 Niveles',
    categoriaId: 3,
    precio: 66990,
    precioOferta: 54990,
    stock: 3,
    imagen: '/img/productos/rascador-gatos.webp',
    descripcion: '¡Consiente a tu felino con el Rascador blanco para gatos de 3 niveles! Este entretenido mueble ofrece un espacio ideal para que tu gato juegue, descanse y afile sus uñas. Con su diseño moderno y funcional, este rascador será el complemento perfecto para el hogar de tu mascota.',
    destacado: false,
  },
  // Salud: pipeta contra pulgas
  {
    id: 6,
    nombre: 'Antiparasitario Externo Perros 10 a 25kg',
    categoriaId: 4,
    precio: 9490,
    precioOferta: 0,
    stock: 12,
    imagen: '/img/productos/anti-perro.webp',
    descripcion: 'Advantix®, la pipeta experta en leishmaniosis, es un antiparasitario externo para perros formulado con dos sustancias activas, imidacloprid y permetrina, que actúan de forma combinada constituyendo una amplia cobertura frente a pulgas, garrapatas, flebotomos, mosquitos, piojos y moscas de los establos para proteger a tu perro como se merece.',
    destacado: false,
  },
  // Salud: shampoo, con oferta
  {
    id: 7,
    nombre: 'Shampoo Hipoalergénico para perro 1Litro de Coco',
    categoriaId: 4,
    precio: 13300,
    precioOferta: 9975,
    stock: 9,
    imagen: '/img/productos/shampoo-hipo.webp',
    descripcion: 'Uno de los beneficios de este shampoo es que no produce irritaciones y mantiene y restaura la grasitud que el animal necesita para mantenerse limpio. Además, eliminará de manera eficaz todos los microbios que se acumulan en su pelo y es ideal para los más revoltosos de todo tipo de razas.',
    destacado: false,
  },
  // Comida de cachorro, aparece en destacados
  {
    id: 8,
    nombre: 'Alimento Cachorro Razas Pequeñas 3 kg',
    categoriaId: 1,
    precio: 11290,
    precioOferta: 0,
    stock: 30,
    imagen: '/img/productos/alimento-cachorros.webp',
    descripcion:
      'Formulado con los nutrientes e ingredientes de calidad que su cuerpo necesita para crecer sano y fuerte. Con Dha, que ayuda al desarrollo del cerebro y la visión y 23 vitaminas y minerales: Una nutrición 100% completa y balanceada.',
    destacado: true,
  },
  // Comida para perros mayores, con oferta
  {
    id: 9,
    nombre: 'Alimento Perro Senior 15 kg',
    categoriaId: 1,
    precio: 39990,
    precioOferta: 29990,
    stock: 14,
    imagen: '/img/productos/alimento-senior.png',
    descripcion:
      'Appetit Senior es un alimento indicado para perros adultos de todas las razas. Contiene ingredientes balanceados 100% naturales.',
    destacado: false,
  },
  // Latas de comida húmeda, con oferta
  {
    id: 10,
    nombre: 'Alimento Húmedo Perro, pack 12 latas',
    categoriaId: 1,
    precio: 32990,
    precioOferta: 24990,
    stock: 22,
    imagen: '/img/productos/alimento-latas.webp',
    descripcion:
      'La selección de un alimento adecuado para tu mascota es muy importante para garantizar su crecimiento, desarrollo y salud. Con esta opción de Purina podrás cubrir las necesidades nutricionales y energéticas de tu perro.',
    destacado: false,
  },
  // Comida de gatito, aparece en destacados
  {
    id: 11,
    nombre: 'Alimento Gatito Pollo y Arroz 2 kg',
    categoriaId: 2,
    precio: 15990,
    precioOferta: 0,
    stock: 27,
    imagen: '/img/productos/alimento-pollo-arroz.webp',
    descripcion:
      'Especialmente formulado para gatitos de hasta 12 meses y gatas gestantes o en lactancia, Nutribest Gatitos ofrece una combinación perfecta de proteínas animales de alta calidad (32%), arroz digestible y ingredientes naturales que favorecen un desarrollo óptimo desde el primer bocado.',
    destacado: true,
  },
  // Comida de gato adulto, con oferta
  {
    id: 12,
    nombre: 'Vitalcan Premium Gato Adulto – Salmón 7.5kg',
    categoriaId: 2,
    precio: 29990,
    precioOferta: 22990,
    stock: 16,
    imagen: '/img/productos/alimento-gato-adulto.jpg',
    descripcion: 'Alimento seco completo para gatos adultos (a partir de 1 año), formulado con proteína de salmón, sin soja ni trigo, con ácidos grasos omega‑3 y 6, y diseñado para apoyar la salud urinaria y un pelaje fuerte y brillante.',
    destacado: false,
  },
  // Sachets húmedos para gato
  {
    id: 13,
    nombre: 'Alimento Felix Gato Adulto Pollo 85g Pack 24 Sobres Humedo',
    categoriaId: 2,
    precio: 23990,
    precioOferta: 0,
    stock: 8,
    imagen: '/img/productos/alimento-pack-24.webp',
    descripcion: 'Pack 24x Alimento Húmedo Gato Felix® Adultos Con Pollo 85g.  Sorprende a tu felino con un sabor delicioso y lleno de nutrientes con el Pack de 24 sobres de Alimento Húmedo Felix® Adulto con Pollo 85 g. Preparado con jugosos trocitos en salsa, este alimento combina sabor irresistible y nutrición balanceada, convirtiendo cada comida en un momento especial que tu gato disfrutará al máximo.',
    destacado: false,
  },
  // Cama para perro, con oferta
  {
    id: 14,
    nombre: 'Cama Acolchada para Perro talla M',
    categoriaId: 3,
    precio: 26990,
    precioOferta: 18990,
    stock: 11,
    imagen: '/img/productos/cama-perro.webp',
    descripcion:
      'Dale a tu mejor amigo la comodidad que se merece con esta cama para perro Petizoos, ideal para razas pequeñas. Fabricada en poliéster, es resistente y duradera, manteniendo a tu mascota calientita y protegida del suelo frío. Su color café le dará un toque elegante a tu hogar, y su interior lavable te facilitará la limpieza.',
    destacado: false,
  },
  // Collar con correa: casi sin stock (sale en críticos)
  {
    id: 15,
    nombre: 'Collar XL Ajustable con Correa',
    categoriaId: 3,
    precio: 17990,
    precioOferta: 0,
    stock: 2,
    imagen: '/img/productos/collar-ajustable.webp',
    descripcion: 'El collar y la correa de nailon K9 se pueden usar para adiestramiento canino, paseos, carreras, patrullaje, trail running y caza. Son adecuados para perros medianos y grandes como pastores alemanes, border collies, rottweilers, gran danés, dóberman pinscher, golden retrievers, huskies, labradores y malamutes.',
    destacado: false,
  },
  // Transportadora para viajes y veterinario
  {
    id: 16,
    nombre: 'Transportadora para Mascotas',
    categoriaId: 3,
    precio: 20990,
    precioOferta: 0,
    stock: 7,
    imagen: '/img/productos/transportadora.jpg',
    descripcion: 'Brinda comodidad y seguridad a tu mascota durante cada viaje con esta práctica transportadora resistente y espaciosa. Ideal para gatos, perros pequeños y medianos. Fabricada con materiales duraderos y ventilación en todos sus lados, garantiza una excelente circulación de aire. Su diseño ergonómico facilita el transporte gracias a su asa superior y cierre seguro que evita aperturas accidentales. Perfecta para viajes, visitas al veterinario o paseos cortos.',
    destacado: false,
  },
  // Rascador chico para espacios reducidos
  {
    id: 17,
    nombre: 'Poste Rascador Compacto',
    categoriaId: 3,
    precio: 9990,
    precioOferta: 0,
    stock: 15,
    imagen: '/img/productos/poste-rascador.webp',
    descripcion:
      'Este rascador vertical es perfecto para ubicar en cualquier rincón del hogar gracias a su diseño compacto. El poste está recubierto con resistente cuerda de sisal, el material ideal para que los gatos satisfagan su instinto natural de arañar. Rascar no solo relaja a los felinos, también les ayuda a mantener sus uñas sanas al eliminar la capa muerta. Además, este rascador contribuye a proteger muebles y tapicerías, al ofrecer una alternativa segura y atractiva para liberar energía.',
    destacado: false,
  },
  // Vitaminas para gato, con oferta
  {
    id: 18,
    nombre: 'Multivitamínico para Gatos',
    categoriaId: 4,
    precio: 10350,
    precioOferta: 8990,
    stock: 13,
    imagen: '/img/productos/multivitaminico.webp',
    descripcion: 'Multi-Vit Gato es un multivitamínico para gatos en gotas, formulado por Beaphar con biotina, taurina y vitaminas del grupo B para complementar la alimentación diaria y cuidar la piel y el pelaje. Es especialmente útil en gatos con caída de pelo asociada a deficiencias nutricionales, pelaje opaco o en época de muda.',
    destacado: false,
  },
  // Suplemento de articulaciones para perros
  {
    id: 19,
    nombre: 'Suplemento de Articulaciones, 30 comprimidos',
    categoriaId: 4,
    precio: 20490,
    precioOferta: 0,
    stock: 6,
    imagen: '/img/productos/suplementos.webp',
    descripcion: 'Articularvet® 30 Comprimidos Vitanimal es un suplemento condroprotector para perros y gatos que aporta glucosamina, condroitina, ácido hialurónico y vitamina E en comprimidos palatables. Cada comprimido combina 400 mg de glucosamina HCl, 300 mg de condroitín sulfato, 15 mg de ácido hialurónico y 25 mg de vitamina E. Es un suplemento nutricional de administración oral — no reemplaza el alimento completo — pensado para acompañar el cuidado de las articulaciones de tu mascota en el día a día.',
    destacado: false,
  },
  // Kit dental: poco stock (sale en críticos)
  {
    id: 20,
    nombre: 'Kit Cuidado Dental (pasta + cepillo)',
    categoriaId: 4,
    precio: 12990,
    precioOferta: 0,
    stock: 4,
    imagen: '/img/productos/kit-dental.webp',
    descripcion:
      'La pasta dental Beaphar contiene enzimas proteasa y glucosa oxidasa, que combaten la formación del sarro, placa bacteriana y la halitosis.La proteasa, combate la formación de placa bacteriana mediante la destrucción de la estructura proteica de las bacterias, antes que la placa se convierta en sarro. Este cepillo dental de Beaphar está especialmente di­señado para las bocas de nuestras mascotas. El cepillo de tamaño largo tiene dos diferentes cabezales y un suave mango que asegura el control. Se adapta a tu mano y puedes utili­zarlo tanto en perros como en gatos, de todas las razas y tamaños. Las cerdas del cepillo se ajustan a los dientes y encías, incluso en las zonas de difícil alcance.',
    destacado: false,
  },
];

// Las contraseñas están en texto plano solo porque esto simula una base de datos.
export const usuarios = [
  // Cuenta de administrador para entrar al panel
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
  // Cuenta de cliente normal para probar compras
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

// Artículos del blog: título, resumen corto y texto completo
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
