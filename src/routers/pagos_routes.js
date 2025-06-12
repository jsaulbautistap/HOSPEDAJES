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

router.post('/:reservaId', verificarAutenticacion, verificarRol(['huesped']), realizarPago);
router.get('/', verificarAutenticacion,verificarRol(['admin']),obtenerTodosLosPagos );
router.get('/:reservaId', verificarAutenticacion, verificarRol(['huesped', 'anfitrion']), obtenerPagoPorReserva);
router.get('/anfitrion/saldo', verificarAutenticacion, verificarRol(['anfitrion']), obtenerSaldoAnfitrion);
router.get('/huesped/pagos', verificarAutenticacion, verificarRol(['huesped']), obtenerPagosHuesped);

export default router;