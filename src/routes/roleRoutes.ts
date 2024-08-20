import express from 'express';
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from '../controllers/roleController';

const router = express.Router();

// Create a new role
router.post('/roles', createRole);

// Get all roles
router.get('/roles', getRoles);

// Get a single role by ID
router.get('/roles/:id', getRoleById);

// Update a role
router.put('/roles/:id', updateRole);

// Delete a role
router.delete('/roles/:id', deleteRole);

export default router;
