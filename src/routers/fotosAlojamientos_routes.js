import express from 'express';
import {
  subirFotos,
  actualizarUnaFoto,
  crearFotosAlojamiento,
  obtenerTodasLasFotos,
  obtenerFotosPorAlojamiento,
  eliminarFotoAlojamiento,
  actualizarFotoAlojamiento
} from '../controllers/fotosAlojamientos_controller.js';

const router = express.Router();

router.post('/:alojamientoId', subirFotos, crearFotosAlojamiento);
router.get('/', obtenerTodasLasFotos);
router.get('/:alojamientoId', obtenerFotosPorAlojamiento);
router.put('/:id', actualizarUnaFoto, actualizarFotoAlojamiento);
router.delete('/:id', eliminarFotoAlojamiento);

export default router;
