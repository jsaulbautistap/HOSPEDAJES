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

import verificarAutenticacion from '../middlewares/autenticacion.js';
import verificarRol from '../middlewares/autenticacionRoles.js';

const router = express.Router();

router.post(
  '/:alojamientoId',
  verificarAutenticacion,
  verificarRol(['anfitrion']),
  /* 
    #swagger.tags = ['FOTOS']
    #swagger.description = 'Subir y registrar una o varias fotos de un alojamiento (solo anfitrión)'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['alojamientoId'] = { in: 'path', required: true, description: 'ID del alojamiento' }
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['imagenes'] = {
      in: 'formData',
      type: 'file',
      required: true,
      description: 'Una o más imágenes del alojamiento',
      collectionFormat: 'multi'
    }
  */
  subirFotos,
  crearFotosAlojamiento
);

router.get(
  '/',
  verificarAutenticacion,
  verificarRol(['admin']),
  /*
    #swagger.tags = ['ADMINISTRADOR']
    #swagger.description = 'Obtener todas las fotos registradas en el sistema (solo admin)'
    #swagger.security = [{ "Bearer": [] }]
  */
  obtenerTodasLasFotos
);

router.get(
  '/:alojamientoId',
  verificarAutenticacion,
  verificarRol(['anfitrion', 'huesped']),
  /*
    #swagger.tags = ['FOTOS']
    #swagger.description = 'Obtener las fotos de un alojamiento específico'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['alojamientoId'] = { in: 'path', required: true, description: 'ID del alojamiento' }
  */
  obtenerFotosPorAlojamiento
);

router.put(
  '/:id',
  verificarAutenticacion,
  verificarRol(['anfitrion']),
  /*
    #swagger.tags = ['FOTOS']
    #swagger.description = 'Actualizar los datos de una foto específica de alojamiento (solo anfitrión)'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['id'] = { in: 'path', required: true, description: 'ID de la foto' }
    #swagger.parameters['imagen'] = {
      in: 'formData',
      type: 'file',
      required: true,
      description: 'Nueva imagen para reemplazar la existente'
    }
  */
  actualizarUnaFoto,
  actualizarFotoAlojamiento
);

router.delete(
  '/:id',
  verificarAutenticacion,
  verificarRol(['anfitrion']),
  /*
    #swagger.tags = ['FOTOS']
    #swagger.description = 'Eliminar una foto específica de un alojamiento (solo anfitrión)'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, description: 'ID de la foto' }
  */
  eliminarFotoAlojamiento
);

export default router;
