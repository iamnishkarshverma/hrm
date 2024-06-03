import express from 'express';
import { getAllEmployees, getById } from '../controllers/employee.controller.js';


const router = express.Router();

// Get All
router.get('/', getAllEmployees);

// Get By ID
router.get('/:id', getById);

export default router;