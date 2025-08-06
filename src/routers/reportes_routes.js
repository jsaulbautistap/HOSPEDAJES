import { Router } from 'express';

import {
  crearReporte,
  verTodosLosReportes,
  verMisReportes,
  cambiarEstadoReporte
} from '../controllers/reportes_controller.js';

import verificarAutenticacion from '../middlewares/autenticacion.js';
import verificarRol from '../middlewares/autenticacionRoles.js';

const router = Router();

router.post(
  '/crear',
  verificarAutenticacion,
  verificarRol(['huesped', 'anfitrion']),
  /*
    #swagger.tags = ['REPORTES']
    #swagger.description = 'Crear un nuevo reporte sobre un usuario o alojamiento'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        tipoReportado: 'usuario',
        idReportado: '665c8308e7e2aaf84523b5e1',
        motivo: 'Comportamiento inapropiado'
      }
    }
  */
  crearReporte
);

router.get(
  '/',
  verificarAutenticacion,
  verificarRol(['admin']),
  /*
    #swagger.tags = ['ADMINISTRADOR']
    #swagger.description = 'Ver todos los reportes del sistema con paginación (solo admins)'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['tipo'] = {
      in: 'query',
      description: 'Filtrar por tipo de reporte: usuario o alojamiento',
      required: false,
      type: 'string'
    }
    #swagger.parameters['page'] = {
      in: 'query',
      description: 'Número de página para paginación (default: 0)',
      required: false,
      type: 'integer'
    }
  */
  verTodosLosReportes
);

router.get(
  '/usuario',
  verificarAutenticacion,
  verificarRol(['huesped', 'anfitrion']),
  /*
    #swagger.tags = ['REPORTES']
    #swagger.description = 'Ver todos los reportes que ha realizado el usuario autenticado'
    #swagger.security = [{ "Bearer": [] }]
  */
  verMisReportes
);

router.put(
  '/estado/:reporteId',
  verificarAutenticacion,
  verificarRol(['admin']),
  /*
    #swagger.tags = ['ADMINISTRADOR']
    #swagger.description = 'Cambiar el estado de un reporte y aplicar suspensiones automáticas (solo admins)'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['reporteId'] = {
      in: 'path',
      required: true,
      description: 'ID del reporte'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        estado: 'revisado'
      }
    }
  */
  cambiarEstadoReporte
);

export default router;
