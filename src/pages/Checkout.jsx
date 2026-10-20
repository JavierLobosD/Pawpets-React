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
const MEDIOS = ['Tarjeta de débito', 'Tarjeta de crédito', MEDIO_RECHAZADO].map((m) => ({
  valor: m,
  texto: m,
}));
const REGLAS = {
  nombre: [requerido],
  apellidos: [requerido],
  correo: [requerido, correo],
  calle: [requerido],
  region: [requerido],
  comuna: [requerido],
  medioPago: [requerido],
};

export default function Checkout() {
  const { usuario } = useAuth();
  const { items, total, vaciar } = useCarrito();
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

  const { valores, errores, cambiar, enviar } = useFormulario(
    inicial,
    REGLAS,
    (datos) => {
      const aprobado = datos.medioPago !== MEDIO_RECHAZADO;
      const orden = db.crear('ordenes', {
        ...datos,
        fecha: new Date().toISOString(),
        clienteId: usuario?.id ?? null,
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
        items.forEach(({ producto, cantidad }) =>
          db.actualizar('productos', producto.id, { stock: producto.stock - cantidad }),
        );
        vaciar();
        navegar(`/compra/exitosa/${orden.id}`);
      } else {
        navegar(`/compra/error/${orden.id}`);
      }
    },
  );

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
        <h2 className="h5">Dirección de entrega</h2>
        <CamposDireccion valores={valores} errores={errores} cambiar={cambiar} />
        <CampoFormulario
          etiqueta="Indicaciones para la entrega (opcional)"
          nombre="indicaciones"
          tipo="textarea"
          valor={valores.indicaciones}
          onChange={cambiar}
        />
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
