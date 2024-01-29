import express from 'express';
const router = express.Router();

import { register } from '../controllers/authController.js';



/* API Handlers */


// Register User API
router.post('/register', register)


export default router;