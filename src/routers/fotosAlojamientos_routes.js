import express from 'express';
import { subirFotos, crearFotosAlojamiento } from '../controllers/fotosAlojamientos_controller.js';

const router = express.Router();

router.post('/:alojamientoId', subirFotos, crearFotosAlojamiento);

export default router;

