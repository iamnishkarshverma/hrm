import express from 'express';
import { createRole, deleteRole, getAllRoles, updateRole } from '../controllers/role.controller.js';

const router = express.Router();

// Create a New role in DB
router.post('/create',createRole);

// Update Role in DB
router.put('/update/:id', updateRole)

// Get all the Role from DB
router.get('/getAll', getAllRoles)

// Delete role from DB
router.delete("/deleteRole/:id", deleteRole);

export default router;