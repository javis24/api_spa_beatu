import express from 'express';
import { getUser, getUsersById, createUser, updateUser, deleteUser } from '../controllers/Users.js';

const router = express.Router();

router.get('/users', getUser);
router.get('/users/:id', getUsersById);      
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;   