import express from 'express';
import { getMetricasSalud, getMetricasSaludById, createMetricasSalud, updateMetricasSalud, deleteMetricasSalud } from '../controllers/MetricasSalud.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/metricas-salud', verifyUser, getMetricasSalud);
router.get('/metricas-salud/:id', verifyUser, getMetricasSaludById);
router.post('/metricas-salud', verifyUser, createMetricasSalud);
router.patch('/metricas-salud/:id', verifyUser, updateMetricasSalud);
router.delete('/metricas-salud/:id', verifyUser, deleteMetricasSalud);

export default router;