import express from 'express';
import { getUser, getUsersById, createUser, updateUser, deleteUser } from '../controllers/Users.js';

import { verifyUser, adminOrSecretaryOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/users', verifyUser, adminOrSecretaryOnly, getUser);
router.get('/users/:id', verifyUser, adminOrSecretaryOnly, getUsersById);      
router.post('/users', verifyUser, adminOrSecretaryOnly, createUser);
router.patch('/users/:id', verifyUser, adminOrSecretaryOnly, updateUser);
router.delete('/users/:id', verifyUser, adminOrSecretaryOnly, deleteUser);

export default router;   