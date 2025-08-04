import express from 'express';
import { register } from '../controllers/user.controller.js';

const router = express.Router();

// POST route for user registration
router.post('/register', register);
router.post('/login').post(login) 
router.post('/logout').get(login)


export default router;

