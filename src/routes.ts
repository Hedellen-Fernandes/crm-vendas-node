import { Router } from 'express';
import ClienteController from './clientes/ClienteController';

const router = Router();

router.post('/clientes', ClienteController.create);
router.get('/clientes', ClienteController.read);
router.get('/clientes/:id', ClienteController.read);
router.put('/clientes/:id', ClienteController.update);
router.delete('/clientes/:id', ClienteController.delete);


export default router;
