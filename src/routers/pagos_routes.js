import { Router } from 'express';
import verificarAutenticacion from '../middlewares/autenticacion.js';
import verificarRol from '../middlewares/autenticacionRoles.js';

import { 
    realizarPago,
    obtenerTodosLosPagos,
    obtenerPagoPorReserva,
    obtenerSaldoAnfitrion,
    obtenerPagosHuesped
} from '../controllers/pagos_controller.js';

const router = Router();

router.post('/:reservaId',
  verificarAutenticacion,
  verificarRol(['huesped']),
  /* 
    #swagger.tags = ['PAGOS']
    #swagger.description = 'Realizar un pago para una reserva (solo huésped)'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['reservaId'] = { in: 'path', required: true, description: 'ID de la reserva' }
    
  */
  realizarPago
);

router.get('/',
  verificarAutenticacion,
  verificarRol(['admin']),
  /* 
    #swagger.tags = ['PAGOS']
    #swagger.description = 'Obtener todos los pagos registrados (solo admin)'
    #swagger.security = [{ "Bearer": [] }]
  */
  obtenerTodosLosPagos
);

router.get('/:reservaId',
  verificarAutenticacion,
  verificarRol(['huesped', 'anfitrion']),
  /* 
    #swagger.tags = ['PAGOS']
    #swagger.description = 'Obtener el pago correspondiente a una reserva'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['reservaId'] = { in: 'path', required: true, description: 'ID de la reserva' }
  */
  obtenerPagoPorReserva
);

router.get('/anfitrion/saldo',
  verificarAutenticacion,
  verificarRol(['anfitrion']),
  /* 
    #swagger.tags = ['PAGOS']
    #swagger.description = 'Obtener el saldo acumulado del anfitrión autenticado'
    #swagger.security = [{ "Bearer": [] }]
  */
  obtenerSaldoAnfitrion
);

router.get('/huesped/pagos',
  verificarAutenticacion,
  verificarRol(['huesped']),
  /* 
    #swagger.tags = ['PAGOS']
    #swagger.description = 'Obtener los pagos realizados por el huésped autenticado'
    #swagger.security = [{ "Bearer": [] }]
  */
  obtenerPagosHuesped
);

export default router;
