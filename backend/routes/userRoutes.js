import express from 'express';
const router = express.Router();

import { verifyUser } from '../middlewares/verifyToken.js';
import { updateUser } from '../controllers/userController.js';


// API Routes
router.put('/update/:id', verifyUser, updateUser);



export default router;