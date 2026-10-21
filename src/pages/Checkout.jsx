import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario';
import CamposDireccion from '../components/CamposDireccion';
import useAuth from '../hooks/useAuth';
import useCarrito from '../hooks/useCarrito';
import db from '../data/db';
import useFormulario from '../hooks/useFormulario';
import { precioCLP } from '../utils/formato';
import { precioFinal } from '../utils/productos';
import { correo, requerido } from '../utils/validaciones';

// Medios de pago simulados: el último rechaza el pago para poder probar la vista de error.
const MEDIO_RECHAZADO = 'Tarjeta sin fondos (simula error)';
// Lista de medios de pago en formato para el select
const MEDIOS = ['Tarjeta de débito', 'Tarjeta de crédito', MEDIO_RECHAZADO].map((m) => ({
  valor: m,
  texto: m,
}));
// Validaciones de cada campo del formulario de compra
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
export default function Checkout() {
  // Usuario con sesión iniciada (si hay)
  const { usuario } = useAuth();
  // Productos y total del carrito, y función para vaciarlo
  const { items, total, vaciar } = useCarrito();
  // Para mandar al usuario a otra página
  const navegar = useNavigate();

  // Si hay sesión iniciada, los datos del cliente se completan automáticamente.
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
      const orden = db.crear('ordenes', {
        ...datos,
        fecha: new Date().toISOString(),
        clienteId: usuario?.id ?? null,
        // Guarda una copia simple de cada producto comprado
        items: items.map(({ producto, cantidad, subtotal }) => ({
          productoId: producto.id,
          nombre: producto.nombre,
          precio: precioFinal(producto),
          cantidad,
          subtotal,
        })),
        total,
        estado: aprobado ? 'Pagada' : 'Rechazada',
      });
      if (aprobado) {
        // Descuenta del stock lo que se compró
        items.forEach(({ producto, cantidad }) =>
          db.actualizar('productos', producto.id, { stock: producto.stock - cantidad }),
        );
        // Vacía el carrito y muestra la compra exitosa
        vaciar();
        navegar(`/compra/exitosa/${orden.id}`);
      } else {
        // Si se rechazó, muestra la página de error
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

  return (
    <section className="col-lg-8 mx-auto">
      <h1 className="section-title">Finalizar compra</h1>
      <form className="card card-body shadow-sm" onSubmit={enviar} noValidate>
        <p className="h5 text-end">Total a pagar: {precioCLP(total)}</p>
        {/* Datos personales del cliente */}
        <h2 className="h5">Información del cliente</h2>
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
        <button type="submit" className="btn btn-success">
          Pagar ahora {precioCLP(total)}
        </button>
      </form>
    </section>
  );
}
