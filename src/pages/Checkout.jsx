// Link: ir a otra página sin recargar; useNavigate: cambiar de página desde el código
import { Link, useNavigate } from 'react-router-dom';
// Componentes propios del formulario: un campo suelto y el bloque de dirección
import CampoFormulario from '../components/CampoFormulario';
import CamposDireccion from '../components/CamposDireccion';
// Hooks propios: sesión y carrito compartidos
import useAuth from '../hooks/useAuth';
import useCarrito from '../hooks/useCarrito';
// db: base de datos simulada, aquí se guarda la orden y se descuenta el stock
import db from '../data/db';
// useFormulario: hook propio que maneja valores, errores y envío
import useFormulario from '../hooks/useFormulario';
// precioCLP: formato de pesos; precioFinal: precio que se cobra
import { precioCLP } from '../utils/formato';
import { precioFinal } from '../utils/productos';
// Reglas de validación que se usan en este formulario
import { correo, requerido } from '../utils/validaciones';

// Medios de pago simulados: el último rechaza el pago para poder probar la vista de error.
const MEDIO_RECHAZADO = 'Tarjeta sin fondos (simula error)';
// Lista de medios de pago en formato para el select
// map convierte cada texto en { valor, texto }
const MEDIOS = ['Tarjeta de débito', 'Tarjeta de crédito', MEDIO_RECHAZADO].map((m) => ({
  valor: m,
  texto: m,
}));
// Validaciones de cada campo del formulario de compra
// indicaciones no aparece aquí porque es opcional
const REGLAS = {
  nombre: [requerido],
  apellidos: [requerido],
  correo: [requerido, correo],
  calle: [requerido],
  region: [requerido],
  comuna: [requerido],
  medioPago: [requerido],
};

// Página para completar los datos y pagar la compra
// Ruta: /checkout
export default function Checkout() {
  // Usuario con sesión iniciada (si hay)
  const { usuario } = useAuth();
  // Productos y total del carrito, y función para vaciarlo
  const { items, total, vaciar } = useCarrito();
  // Para mandar al usuario a otra página
  const navegar = useNavigate();

  // Si hay sesión iniciada, los datos del cliente se completan automáticamente.
  // usuario?.nombre da undefined si no hay sesión, y ?? '' lo deja vacío
  const inicial = {
    nombre: usuario?.nombre ?? '',
    apellidos: usuario?.apellidos ?? '',
    correo: usuario?.correo ?? '',
    calle: usuario?.calle ?? '',
    region: usuario?.region ?? '',
    comuna: usuario?.comuna ?? '',
    indicaciones: '',
    medioPago: '',
  };

  // Maneja los valores, errores y el envío del formulario
  const { valores, errores, cambiar, enviar } = useFormulario(
    inicial,
    REGLAS,
    // Se ejecuta cuando el formulario no tiene errores
    (datos) => {
      // Se aprueba si no eligió la tarjeta sin fondos
      const aprobado = datos.medioPago !== MEDIO_RECHAZADO;
      // Guarda la orden con los datos, productos y estado
      // db.crear le pone un id nuevo y la devuelve
      const orden = db.crear('ordenes', {
        ...datos,
        // Fecha y hora de la compra en formato estándar
        fecha: new Date().toISOString(),
        // Id del cliente, o null si compró sin sesión
        clienteId: usuario?.id ?? null,
        // Guarda una copia simple de cada producto comprado
        // (así la boleta no cambia si después se edita el producto)
        items: items.map(({ producto, cantidad, subtotal }) => ({
          productoId: producto.id,
          nombre: producto.nombre,
          precio: precioFinal(producto),
          cantidad,
          subtotal,
        })),
        total,
        // Estado que después usan Órdenes y Reportes
        estado: aprobado ? 'Pagada' : 'Rechazada',
      });
      // Si el pago se aprobó
      if (aprobado) {
        // Descuenta del stock lo que se compró
        items.forEach(({ producto, cantidad }) =>
          db.actualizar('productos', producto.id, { stock: producto.stock - cantidad }),
        );
        // Vacía el carrito y muestra la compra exitosa
        vaciar();
        // Ejemplo: /compra/exitosa/3
        navegar(`/compra/exitosa/${orden.id}`);
      } else {
        // Si se rechazó, muestra la página de error
        // El carrito no se vacía, para poder reintentar el pago
        navegar(`/compra/error/${orden.id}`);
      }
    },
  );

  // Sin productos en el carrito no hay nada que pagar
  if (items.length === 0) {
    return (
      <p className="alert alert-info">
        No hay productos para pagar. <Link to="/productos">Ver productos</Link>
      </p>
    );
  }

  // Formulario de compra centrado
  return (
    <section className="col-lg-8 mx-auto">
      <h1 className="section-title">Finalizar compra</h1>
      {/* noValidate apaga la validación del navegador; se usa la de useFormulario */}
      <form className="card card-body shadow-sm" onSubmit={enviar} noValidate>
        {/* Total arriba a la derecha */}
        <p className="h5 text-end">Total a pagar: {precioCLP(total)}</p>
        {/* Datos personales del cliente */}
        <h2 className="h5">Información del cliente</h2>
        {/* Nombre y apellidos lado a lado */}
        <div className="row">
          <div className="col-md-6">
            <CampoFormulario
              etiqueta="Nombre"
              nombre="nombre"
              valor={valores.nombre}
              error={errores.nombre}
              onChange={cambiar}
            />
          </div>
          <div className="col-md-6">
            <CampoFormulario
              etiqueta="Apellidos"
              nombre="apellidos"
              valor={valores.apellidos}
              error={errores.apellidos}
              onChange={cambiar}
            />
          </div>
        </div>
        {/* Campo correo */}
        <CampoFormulario
          etiqueta="Correo electrónico"
          nombre="correo"
          tipo="email"
          valor={valores.correo}
          error={errores.correo}
          onChange={cambiar}
        />
        {/* Dirección donde se entrega el pedido */}
        <h2 className="h5">Dirección de entrega</h2>
        {/* Calle, región y comuna; recibe valores, errores y cambiar del mismo formulario */}
        <CamposDireccion valores={valores} errores={errores} cambiar={cambiar} />
        {/* Indicaciones opcionales, no tienen validación */}
        <CampoFormulario
          etiqueta="Indicaciones para la entrega (opcional)"
          nombre="indicaciones"
          tipo="textarea"
          valor={valores.indicaciones}
          onChange={cambiar}
        />
        {/* Select para elegir cómo pagar */}
        <CampoFormulario
          etiqueta="Medio de pago"
          nombre="medioPago"
          tipo="select"
          opciones={MEDIOS}
          valor={valores.medioPago}
          error={errores.medioPago}
          onChange={cambiar}
        />
        {/* Botón que envía el formulario y muestra el total */}
        <button type="submit" className="btn btn-success">
          Pagar ahora {precioCLP(total)}
        </button>
      </form>
    </section>
  );
}
