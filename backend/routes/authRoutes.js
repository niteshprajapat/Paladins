import express from 'express';
const router = express.Router();

import { login, register } from '../controllers/authController.js';



/* API Handlers */


// Register User API
router.post('/register', register);
router.post('/login', login);


export default router;