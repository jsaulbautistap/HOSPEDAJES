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

//MIDLEWARES PARA RUTAS PROTEGIDAS
import verificarAutenticacion from '../middlewares/autenticacion.js';
import verificarRol from '../middlewares/autenticacionRoles.js';

const router = express.Router();

router.post('/:alojamientoId',verificarAutenticacion,verificarRol(['anfitrion']), subirFotos, crearFotosAlojamiento);
router.get('/', obtenerTodasLasFotos);
router.get('/:alojamientoId',verificarAutenticacion,verificarRol(['anfitrion','huesped']), obtenerFotosPorAlojamiento);
router.put('/:id',verificarAutenticacion,verificarRol(['anfitrion']), actualizarUnaFoto, actualizarFotoAlojamiento);
router.delete('/:id',verificarAutenticacion,verificarRol(['anfitrion']), eliminarFotoAlojamiento);

export default router;
