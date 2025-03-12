import express from 'express';
import { getTratamientosEsteticos, getTratamientosEsteticosById, createTratamientosEsteticos,updateTratamientosEsteticos,deleteTratamientosEsteticos } from '../controllers/TratamientosEsteticosController.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/tratamientos-esteticos', verifyUser, getTratamientosEsteticos);
router.get('/tratamientos-esteticos/:id', verifyUser, getTratamientosEsteticosById);
router.post('/tratamientos-esteticos', verifyUser, createTratamientosEsteticos);
router.patch('/tratamientos-esteticos/:id', verifyUser, updateTratamientosEsteticos);
router.delete('/tratamientos-esteticos/:id', verifyUser, deleteTratamientosEsteticos);

export default router;