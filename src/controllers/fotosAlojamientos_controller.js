import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import FotoAlojamiento from '../models/fotosAlojamientos.js';
import mongoose from 'mongoose';

// Configuración de almacenamiento con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'fotosAlojamientos',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }]
  }
});

const upload = multer({ storage });

// Middleware para subir múltiples imágenes
const subirFotos = upload.array('imagenes', 5); 

// Controlador para guardar las fotos en la base de datos
const crearFotosAlojamiento = async (req, res) => {
  try {
    const { alojamientoId } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: 'No se subieron imágenes' });
    }
    if (!mongoose.Types.ObjectId.isValid(alojamientoId)) return res.status(400).json({ msg: 'ID de alojamiento no válido' });

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

    res.status(201).json({ msg: 'Fotos guardadas correctamente', fotos: fotosGuardadas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al subir fotos' });
  }
};


export { 
  subirFotos, 
  crearFotosAlojamiento 
};