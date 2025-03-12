import express from 'express';
import { getPaciente, getPacientesById, createPaciente, updatePaciente, deletePaciente } from '../controllers/Pacientes.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/pacientes', verifyUser, getPaciente);
router.get('/pacientes/:id', verifyUser, getPacientesById);
router.post('/pacientes', verifyUser, createPaciente);
router.patch('/pacientes/:id', verifyUser, updatePaciente);
router.delete('/pacientes/:id', verifyUser, deletePaciente);

export default router;