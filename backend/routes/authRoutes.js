import express from 'express';
const router = express.Router();

import { login, register, google } from '../controllers/authController.js';



/* API Handlers */


// Register User API
router.post('/register', register);
router.post('/login', login);
router.post('/google', google);


export default router;