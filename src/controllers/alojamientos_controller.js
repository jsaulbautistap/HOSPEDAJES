import Alojamiento from "../models/alojamientos.js";
import mongoose from "mongoose";
// Crear alojamiento
const crearAlojamiento = async (req, res) => {
  try {
    if (req.usuario.estadoCuenta !== 'activo') {
      return res.status(403).json({ msg: "Tu cuenta está suspendida. No puedes crear alojamientos" });
    }
    const { titulo, descripcion, precioNoche, maxHuespedes } = req.body;
    if (!titulo || !descripcion || !precioNoche || !maxHuespedes) {
      return res.status(400).json({ msg: "Faltan campos obligatorios" });
    }
    if (precioNoche <= 0) {
      return res.status(400).json({ msg: "El precio debe ser un número positivo" });
    }
    if (maxHuespedes <= 0){
      return res.status(400).json({ msg: "El número mínimo de huéspedes debe ser mayor a 0" });
    }
    const nuevoAlojamiento = new Alojamiento({ ...req.body, anfitrion: req.usuario._id });
    const alojamientoGuardado = await nuevoAlojamiento.save();
    res.status(201).json(alojamientoGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el alojamiento" });
  }
};

// Obtener todos los alojamientos
const obtenerAlojamientos = async (req, res) => {
  try {
    const { provincia, tipoAlojamiento, precioMin, precioMax, calificacion, page = 0 } = req.query;
    const filtro = { estadoAlojamiento: 'activo' }; 

    if (provincia) filtro.provincia = new RegExp(provincia, 'i');
    if (tipoAlojamiento) filtro.tipoAlojamiento = new RegExp (tipoAlojamiento, "i");
    if (precioMin || precioMax) {
      filtro.precioNoche = {};
      if (precioMin) filtro.precioNoche.$gte = Number(precioMin);
      if (precioMax) filtro.precioNoche.$lte = Number(precioMax);
    }
    if (calificacion) filtro.calificacionPromedio.$gte = Number(calificacion);

    // Para listado de alojamientos (tarjetas):
    const alojamientos = await Alojamiento.find(filtro)
      .select('titulo precioNoche calificacionPromedio ciudad provincia tipoAlojamiento, maxHuespedes')
      .populate("anfitrion", "nombre")
      .limit(20)
      .skip(page * 20);

    res.status(200).json(alojamientos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los alojamientos" });
  }
};

// Obtener alojamiento por ID
const obtenerAlojamientoPorId = async (req, res) => {
  try {
    
    // Para vista detallada:
    const alojamiento = await Alojamiento.findById(req.params.id)
      .populate("anfitrion", "nombre email telefono urlFotoPerfil");

    if (!alojamiento) return res.status(404).json({ msg: "Alojamiento no encontrado" });
    if (alojamiento.estadoAlojamiento !== 'activo') {
      return res.status(403).json({ msg: "Este alojamiento no está disponible actualmente" });
    }
    res.status(200).json(alojamiento);
  } catch (error) {
    res.status(500).json({ msg: "Error al buscar alojamiento" });
  }
};

// Actualizar alojamiento
const actualizarAlojamiento = async (req, res) => {
  const { id } = req.params;

  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `Lo sentimos, no existe el alojamiento con id ${id}` });
  }

  try {
    const alojamiento = await Alojamiento.findById(id);
    if (!alojamiento) {
      return res.status(404).json({ msg: "Alojamiento no encontrado" });
    }
    if (alojamiento.estadoAlojamiento !== 'activo') {
      return res.status(403).json({ msg: "Este alojamiento no está disponible actualmente" });
    }

    if (String(alojamiento.anfitrion) !== String(req.usuario._id)) {
      return res.status(403).json({ msg: "No tienes permiso para actualizar este alojamiento" });
    }

    await Alojamiento.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ msg: "Actualización exitosa del alojamiento" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar alojamiento" });
  }
};


// Eliminar alojamiento
const eliminarAlojamiento = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `Lo sentimos, no existe el alojamiento con ID inválido` });
  }

  try {
    const alojamiento = await Alojamiento.findById(id);
    if (!alojamiento) {
      return res.status(404).json({ msg: "Lo sentimos, el alojamiento no existe" });
    }

    // Verificar que el usuario autenticado sea el dueño del alojamiento
    if (String(alojamiento.anfitrion) !== String(req.usuario._id)) {
      return res.status(403).json({ msg: "No tienes permiso para eliminar este alojamiento" });
    }

    await Alojamiento.findByIdAndDelete(id);
    res.status(200).json({ msg: "Alojamiento eliminado exitosamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el alojamiento" });
  }
};


// Obtener alojamientos del anfitrión
const obtenerAlojamientosAnfitrion = async (req, res) => {
  try {
    // Para alojamientos del anfitrión:
    const misAlojamientos = await Alojamiento.find({ anfitrion: req.usuario._id })
      .select('titulo estadoAlojamiento precioNoche calificacionPromedio createdAt');

    res.status(200).json(misAlojamientos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener tus alojamientos" });
  }
};


export	{
    crearAlojamiento,
    obtenerAlojamientos,
    obtenerAlojamientoPorId,
    actualizarAlojamiento,
    eliminarAlojamiento,
    obtenerAlojamientosAnfitrion

}