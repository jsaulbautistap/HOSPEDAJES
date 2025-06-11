import { Router } from 'express';
import verificarAutenticacion from '../middlewares/autenticacion.js';
import verificarRol from '../middlewares/autenticacionRoles.js';

import { 
    realizarPago,
    obtenerTodosLosPagos,
    obtenerPagoPorReserva


} from '../controllers/pagos_controller.js';


const router = Router();

router.post('/:reservaId', verificarAutenticacion, verificarRol(['huesped']), realizarPago);
router.get('/', obtenerTodosLosPagos);
router.get('/:reservaId', verificarAutenticacion, verificarRol(['huesped', 'anfitrion']), obtenerPagoPorReserva);

export default router;