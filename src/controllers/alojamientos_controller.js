import Alojamiento from "../models/alojamientos.js";
import mongoose from "mongoose";
// Crear alojamiento
const crearAlojamiento = async (req, res) => {
  try {
    if (req.usuario.estadoCuenta !== 'activo') {
      return res.status(403).json({ msg: "Tu cuenta está suspendida. No puedes crear alojamientos" });
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
    const alojamientos = await Alojamiento.find({estadoAlojamiento:'activo'}).populate("anfitrion", "nombre email");
    res.status(200).json(alojamientos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los alojamientos" });
  }
};

// Obtener alojamiento por ID
const obtenerAlojamientoPorId = async (req, res) => {
  try {
    
    const alojamiento = await Alojamiento.findById(req.params.id);
    
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

  // Verificar si algún campo está vacío
  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
  }

  // Verificar si el ID es válido
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

    // Actualizar el alojamiento
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

  // Validar formato del ID
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


const obtenerAlojamientosAnfitrion = async (req, res) => {
  try {
    const misAlojamientos = await Alojamiento.find({ anfitrion: req.usuario._id }).populate("anfitrion", "nombre email");
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