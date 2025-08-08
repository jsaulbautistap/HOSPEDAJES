import Reserva from "../models/reserva.js";
import Alojamiento from "../models/alojamientos.js";
import mongoose from "mongoose";

// Crear una nueva reserva
const crearReserva = async (req, res) => {
  try {
    if (req.usuario.estadoCuenta !== 'activo') {
      return res.status(403).json({ msg: "Tu cuenta está suspendida. No puedes hacer reservas" });
    }
    
    const { alojamiento, fechaCheckIn, fechaCheckOut, numeroHuespedes, precioTotal } = req.body;
    
    if (!numeroHuespedes || numeroHuespedes <= 0 || !Number.isInteger(numeroHuespedes)) {
      return res.status(400).json({ msg: "El número de huéspedes debe ser un número entero positivo" });
    }
    if (!precioTotal || precioTotal <= 0 || !/^\d+(\.\d{1,2})?$/.test(precioTotal.toString())) {
      return res.status(400).json({ msg: "El precio total debe ser un número positivo válido" });
    }
    
    const alojamientoExiste = await Alojamiento.findById(alojamiento);
    if (!alojamientoExiste) return res.status(404).json({ msg: "Alojamiento no encontrado" });
    
    if (new Date(fechaCheckIn) >= new Date(fechaCheckOut)) return res.status(400).json({ msg: "Fecha de salida no puede ser antes que la de entrada" });

    if (new Date(fechaCheckIn) < new Date()) return res.status(400).json({ msg: "No se pueden hacer reservas en fechas pasadas" });
    
    
    if (numeroHuespedes > alojamientoExiste.maxHuespedes) return res.status(400).json({ msg: "Número de huéspedes excede la capacidad" });
    

    const nuevaReserva = new Reserva({
      huesped: req.usuario._id,
      alojamiento,
      fechaCheckIn,
      fechaCheckOut,
      numeroHuespedes,
      precioTotal
    });

    const reservaGuardada = await nuevaReserva.save();
    res.status(201).json(reservaGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear la reserva" });
  }
};

// Obtener todas las reservas
const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate("huesped", "nombre email")
      .populate("alojamiento", "titulo");

    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener reservas" });
  }
};

// Obtener reservas que el huésped ha realizado 
const obtenerMisReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find({ huesped: req.usuario._id })
      .select('fechaCheckIn fechaCheckOut numeroHuespedes precioTotal estadoReserva estadoPago')
      .populate("alojamiento", "titulo ciudad provincia");

    for (const reserva of reservas) {
      if (
        reserva.estadoReserva === 'confirmado' &&
        new Date(reserva.fechaCheckOut) < new Date()
      ) {
        reserva.estadoReserva = 'finalizada';
        await reserva.save();
      }
    }

    const reservasActualizadas = await Reserva.find({ huesped: req.usuario._id })
      .populate("alojamiento", "titulo");

    res.status(200).json(reservasActualizadas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener tus reservas" });
  }
};


// Obtener reservas del anfitrión (vista para el anfitrión)
const obtenerReservasAnfitrion = async (req, res) => {
  try {
    const alojamientosAnfitrion = await Alojamiento.find({ anfitrion: req.usuario._id }).select("_id");
    const idsAlojamientos = alojamientosAnfitrion.map(aloj => aloj._id);

    const reservas = await Reserva.find({ alojamiento: { $in: idsAlojamientos } })
      .select('fechaCheckIn fechaCheckOut numeroHuespedes estadoReserva estadoPago')
      .populate("huesped", "nombre email telefono")
      .populate("alojamiento", "titulo");

    for (const reserva of reservas) {
      if (
        reserva.estadoReserva === 'confirmado' &&
        new Date(reserva.fechaCheckOut) < new Date()
      ) {
        reserva.estadoReserva = 'finalizada';
        await reserva.save();
      }
    }

    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener reservas del anfitrión" });
  }
};

// Obtener reserva por ID
const obtenerReservaPorId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  try {
    const reserva = await Reserva.findById(id)
      .populate("huesped", "nombre email")
      .populate("alojamiento", "titulo descripcion");

    if (!reserva) {
      return res.status(404).json({ msg: "Reserva no encontrada" });
    }

    res.status(200).json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener la reserva" });
  }
};

// Actualizar reserva solo número de huéspedes
const actualizarReserva = async (req, res) => {
  const { id } = req.params;
  const { numeroHuespedes } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  try {
    const reserva = await Reserva.findById(id);
    if (!reserva) return res.status(404).json({ msg: "Reserva no encontrada" });
    

    if (reserva.huesped.toString() !== req.usuario._id.toString()) return res.status(403).json({ msg: "No tienes permiso para actualizar esta reserva" });
    

    if (reserva.estadoPago === 'pagado') return res.status(400).json({ msg: "No puedes modificar una reserva ya pagada" });
    

    if (reserva.estadoReserva === 'finalizada') return res.status(400).json({ msg: "No puedes modificar una reserva finalizada" });
    

    if (numeroHuespedes) {
      if (numeroHuespedes <= 0 || !Number.isInteger(numeroHuespedes)) return res.status(400).json({ msg: "El número de huéspedes debe ser un número entero positivo" });
      
      const alojamiento = await Alojamiento.findById(reserva.alojamiento);
      if (numeroHuespedes > alojamiento.maxHuespedes) return res.status(400).json({ msg: "Número de huéspedes excede la capacidad del alojamiento" });
      
    }

    if (numeroHuespedes) reserva.numeroHuespedes = numeroHuespedes;

    await reserva.save();
    res.status(200).json({ msg: "Reserva actualizada correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar la reserva" });
  }
};

// Eliminar reserva
const eliminarReserva = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  try {
    const reserva = await Reserva.findById(id);

    if (!reserva) return res.status(404).json({ msg: "Reserva no encontrada" });


    if (String(reserva.huesped) !== String(req.usuario._id)) return res.status(403).json({ msg: "No tienes permiso para eliminar esta reserva" });
    

    await Reserva.findByIdAndDelete(id);
    res.status(200).json({ msg: "Reserva eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar la reserva" });
  }
};

export {
  crearReserva,
  obtenerReservas,
  obtenerMisReservas,
  obtenerReservasAnfitrion,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva
};
