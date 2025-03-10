import express from 'express';
import { getPaciente, getPacientesById, createPaciente, updatePaciente, deletePaciente } from '../controllers/Pacientes.js';

const router = express.Router();

router.get('/pacientes', getPaciente);
router.get('/pacientes/:id', getPacientesById);
router.post('/pacientes', createPaciente);
router.put('/pacientes/:id', updatePaciente);
router.delete('/pacientes/:id', deletePaciente);

export default router;