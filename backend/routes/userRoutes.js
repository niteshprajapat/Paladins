import express from 'express';
const router = express.Router();

import { verifyUser } from '../middlewares/verifyToken.js';
import { updateUser, deleteUser } from '../controllers/userController.js';


// API Routes
router.put('/update/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyUser, deleteUser)



export default router;