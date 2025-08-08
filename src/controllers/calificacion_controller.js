import Calificacione from "../models/calificacion.js";
import Reserva from "../models/reserva.js";
import Alojamiento from "../models/alojamientos.js";

// Crear calificación
export const crearCalificacion = async (req, res) => {
  try {
    const { idReserva } = req.params;
    const { estrellas, comentario } = req.body; 
    const idHuesped = req.usuario._id;

    if (comentario && comentario.length > 300) return res.status(400).json({ msg: "El comentario no puede tener más de 300 caracteres" });

    const reserva = await Reserva.findById(idReserva);
    if (!reserva || reserva.huesped.toString() !== idHuesped.toString()) return res.status(403).json({ msg: "No autorizado para calificar esta reserva" });

    if (reserva.estadoReserva !== 'finalizada') return res.status(400).json({ msg: "Solo puedes calificar reservas finalizadas" });

    const reservaCalificada = await Calificacione.findOne({ reserva: idReserva });
    if (reservaCalificada) return res.status(400).json({ msg: "Esta reserva ya fue calificada" });

    const calificacion = new Calificacione({
      huesped: idHuesped,
      alojamiento: reserva.alojamiento,
      reserva: idReserva,
      estrellas,
      comentario
    });

    await calificacion.save();

    const calificaciones = await Calificacione.find({ alojamiento: reserva.alojamiento });
    const sumaEstrellas = calificaciones.reduce((sumatotal, numero) => sumatotal + numero.estrellas, 0);
    const promedio = sumaEstrellas / calificaciones.length;

    await Alojamiento.findByIdAndUpdate(reserva.alojamiento, {
      calificacionPromedio: promedio.toFixed(2)
    });

    res.status(201).json({ msg: "Calificación registrada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al calificar el alojamiento" });
  }
};

// Obtener calificaciones de alojamiento
export const obtenerCalificacionesDeAlojamiento = async (req, res) => {
  try {
    const { idAlojamiento } = req.params;
    const calificaciones = await Calificacione.find({ alojamiento: idAlojamiento }).populate('huesped', 'nombre');
    res.json(calificaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener calificaciones" });
  }
};
