import express from 'express';
const router = express.Router();

import { login, register, google, logout } from '../controllers/authController.js';



/* API Handlers */


// Register User API
router.post('/register', register);
router.post('/login', login);
router.post('/google', google);
router.get('/logout', logout);



export default router;