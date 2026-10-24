/** Identidad visual compartida por la tienda y el panel de administración. */
// Se usa en el Header y en el menú del AdminLayout
export default function Logo() {
  // Solo muestra la huellita y el nombre de la tienda
  // La clase "logo" le da el estilo en index.css
  return <span className="logo">🐾 PawPets</span>;
}
