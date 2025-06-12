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

    // Validar que el alojamiento exista
    const alojamientoExiste = await Alojamiento.findById(alojamiento);
    if (!alojamientoExiste) {
      return res.status(404).json({ msg: "Alojamiento no encontrado" });
    }

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
    console.error("Error al crear reserva:", error);
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
    console.error("Error al obtener reservas:", error);
    res.status(500).json({ msg: "Error al obtener reservas" });
  }
};

// Obtener reservas que el huésped ha realizado 
const obtenerMisReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find({ huesped: req.usuario._id })
      .populate("alojamiento", "titulo");

    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener tus reservas:", error);
    res.status(500).json({ msg: "Error al obtener tus reservas" });
  }
};

// Obtener reservas del anfitrión (vista para el anfitrión)
const obtenerReservasAnfitrion = async (req, res) => {
  try {
    const alojamientosAnfitrion = await Alojamiento.find({ anfitrion: req.usuario._id }).select("_id");

    const idsAlojamientos = alojamientosAnfitrion.map(aloj => aloj._id);

    const reservas = await Reserva.find({ alojamiento: { $in: idsAlojamientos } })
      .populate("huesped", "nombre email")
      .populate("alojamiento", "titulo");

    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas del anfitrión:", error);
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
    console.error("Error al obtener reserva:", error);
    res.status(500).json({ msg: "Error al obtener la reserva" });
  }
};

// Actualizar estado de reserva o pago 
const actualizarReserva = async (req, res) => {
  const { id } = req.params;
  const { estadoReserva, estadoPago, numeroHuespedes } = req.body;

  const usuario = req.usuario;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  try {
    const reserva = await Reserva.findById(id);
    if (!reserva) {
      return res.status(404).json({ msg: "Reserva no encontrada" });
    }

    if (estadoReserva || estadoPago){
      if(!usuario.rol.includes('anfitrion')){
        return res.status(403).json({ msg: "No tienes permiso para actualizar el estado de la reserva" });
      }
      if(estadoReserva) reserva.estadoReserva = estadoReserva;
      if (estadoPago )reserva.estadoPago = estadoPago;
    }
    
    if (numeroHuespedes){
      if (!usuario.rol.includes('huesped')) {
        return res.status(403).json({ msg: "No tienes permiso para actualizar el número de huéspedes" });
      }
      reserva.numeroHuespedes = numeroHuespedes;
    }

    await reserva.save();
    res.status(200).json({ msg: "Reserva actualizada", reserva });
  } catch (error) {
    console.error("Error al actualizar reserva:", error);
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

    if (!reserva) {
      return res.status(404).json({ msg: "Reserva no encontrada" });
    }

    // Validación de permisos
    if (String(reserva.huesped) !== String(req.usuario._id)) {
      return res.status(403).json({ msg: "No tienes permiso para eliminar esta reserva" });
    }

    await Reserva.findByIdAndDelete(id);
    res.status(200).json({ msg: "Reserva eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar reserva:", error);
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
