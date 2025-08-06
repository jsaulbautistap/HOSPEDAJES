import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import FotoAlojamiento from '../models/fotosAlojamientos.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'fotosAlojamientos',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }]
  }
});

const upload = multer({ storage });
const subirFotos = upload.array('imagenes', 5);
const actualizarUnaFoto = upload.single('imagen');

// Crear fotos de alojamiento
const crearFotosAlojamiento = async (req, res) => {
  try {
    const { alojamientoId } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: 'No se subieron imágenes' });
    }

    const fotosGuardadas = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      const nuevaFoto = new FotoAlojamiento({
        alojamiento: alojamientoId,
        urlFoto: file.path,
        public_id: file.filename,
        fotoPrincipal: i === 0 
      });

      await nuevaFoto.save();
      fotosGuardadas.push(nuevaFoto);
    }

    res.status(201).json({ 
      msg: 'Fotos guardadas correctamente',
      cantidad: fotosGuardadas.length 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al subir fotos' });
  }
};

// para obtener todas las fotos y probar el endpoint
const obtenerTodasLasFotos = async (req, res) => {
  try {
    const fotos = await FotoAlojamiento.find().populate('alojamiento');
    res.status(200).json(fotos);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las fotos' });
  }
};

// Obtener fotos por alojamiento
const obtenerFotosPorAlojamiento = async (req, res) => {
  try {
    const { alojamientoId } = req.params;
    const fotos = await FotoAlojamiento.find({ alojamiento: alojamientoId })
      .select('urlFoto fotoPrincipal');
    res.status(200).json(fotos);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las fotos del alojamiento' });
  }
};

// Eliminar foto de alojamiento
const eliminarFotoAlojamiento = async (req, res) => {
  try {
    const { id } = req.params;
    const foto = await FotoAlojamiento.findById(id);
    if (!foto) {
      return res.status(404).json({ msg: 'Foto no encontrada' });
    }

    await cloudinary.uploader.destroy(foto.public_id);
    await foto.deleteOne();

    res.status(200).json({ msg: 'Foto eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar la foto' });
  }
};

// Actualizar foto de alojamiento
const actualizarFotoAlojamiento = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ msg: 'No se subió una nueva imagen' });
    }

    const fotoExistente = await FotoAlojamiento.findById(id);
    if (!fotoExistente) {
      return res.status(404).json({ msg: 'Foto no encontrada' });
    }

    await cloudinary.uploader.destroy(fotoExistente.public_id);

    fotoExistente.urlFoto = req.file.path;
    fotoExistente.public_id = req.file.filename;

    await fotoExistente.save();

    res.status(200).json({
      msg: 'Foto actualizada correctamente',
      foto: fotoExistente,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar la foto' });
  }
};

export {
  subirFotos,
  crearFotosAlojamiento,
  actualizarUnaFoto,
  actualizarFotoAlojamiento,
  obtenerTodasLasFotos,
  obtenerFotosPorAlojamiento,
  eliminarFotoAlojamiento
};
