import Pago from '../models/pago.js';
import Sistema from '../models/sistema.js';
import Reserva from '../models/reserva.js';

const   realizarPago = async (req, res) => {
  try {
    const { reservaId } = req.params;

    const reserva = await Reserva.findById(reservaId)
      .populate({
        path: 'huesped',
        model: 'Usuario'
      })
      .populate({
        path: 'alojamiento',
        populate: {
          path: 'anfitrion',
          model: 'Usuario'
        }
      });

    if (!reserva) return res.status(404).json({ msg: 'Reserva no encontrada' });

    if (reserva.estadoPago === 'pagado') {
      return res.status(400).json({ msg: 'Esta reserva ya fue pagada' });
    }
    

    const huesped = reserva.huesped;
    const anfitrion = reserva.alojamiento.anfitrion;

    if (!huesped || !anfitrion) return res.status(404).json({ msg: 'Usuarios no encontrados' });

    const montoTotal = reserva.precioTotal;
    const porcentajeComision = process.env.COMISION;
    const comisionSistema = montoTotal * porcentajeComision;
    const montoAnfitrion = montoTotal - comisionSistema;

    if (huesped.saldo < montoTotal) {
      return res.status(400).json({ msg: 'Saldo insuficiente del huésped' });
    }

    huesped.saldo -= montoTotal;
    await huesped.save();

    anfitrion.saldo += montoAnfitrion;
    await anfitrion.save();

    const sistema = await Sistema.findOne();
    if (!sistema) {
      await Sistema.create({ saldoSistema: comisionSistema });
    } else {
      sistema.saldoSistema += comisionSistema;
      await sistema.save();
    }

    const nuevoPago = await Pago.create({
      reserva: reserva._id,
      huesped: huesped._id,
      anfitrion: anfitrion._id,
      montoTotal,
      comisionSistema,
      montoAnfitrion
    });

    reserva.estadoPago = 'pagado';
    reserva.estadoReserva = 'confirmada';
    await reserva.save();

    res.status(201).json({ msg: 'Pago realizado exitosamente', pago: nuevoPago });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al procesar el pago' }, error);
  }
};


// PARA EL ADMINISTRADOR
const obtenerTodosLosPagos = async (req, res) => {
  try {

    const pagos = await Pago.find()
      .populate({
        path: 'reserva',
        populate: [
          { path: 'huesped', model: 'Usuario' },
          {
            path: 'alojamiento',
            populate: { path: 'anfitrion', model: 'Usuario' }
          }
        ]
      });
      

    res.status(200).json(pagos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener todos los pagos', error: error.message });
  }
};
    


const obtenerPagoPorReserva = async (req, res) => {
  try {
    const { reservaId } = req.params;
    const usuarioId = req.usuario._id;

    const reserva = await Reserva.findById(reservaId)
      .populate({
        path: 'huesped',
        model: 'Usuario'
      })
      .populate({
        path: 'alojamiento',
        populate: {
          path: 'anfitrion',
          model: 'Usuario'
        }
      });

    if (!reserva) {
      return res.status(404).json({ msg: 'Reserva no encontrada' });
    }

    // Verificar si el usuario es el huésped de la reserva
    const esHuesped = reserva.huesped._id.toString() === usuarioId.toString();

    // Verificar si el usuario es el anfitrión de la reserva
    const esAnfitrion = reserva.alojamiento.anfitrion._id.toString() === usuarioId.toString();

    // Si el usuario no es ni el huésped ni el anfitrión, no está autorizado
    if (!esHuesped && !esAnfitrion) {
      return res.status(403).json({ msg: 'No autorizado para ver los detalles de este pago' });
    }

    const pago = await Pago.findOne({ reserva: reservaId })
      .populate('huesped')
      .populate('anfitrion')
      .populate({
        path: 'reserva',
        populate: {
          path: 'alojamiento',
          model: 'Alojamiento' // Pongo el modelo Alojamiento
        }
      });

    if (!pago) {
      return res.status(404).json({ msg: 'Pago no encontrado para esta reserva' });
    }

    res.status(200).json(pago);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener el pago por reserva', error: error.message });
  }
};


    

export {
    realizarPago,
    obtenerTodosLosPagos,
    obtenerPagoPorReserva
}

