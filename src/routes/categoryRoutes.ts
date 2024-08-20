import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';

const router = express.Router();

// Create a new category
router.post('/categories', createCategory);

// Get all categories
router.get('/categories', getCategories);

// Get a single category by ID
router.get('/categories/:id', getCategoryById);

// Update a category
router.put('/categories/:id', updateCategory);

// Delete a category
router.delete('/categories/:id', deleteCategory);

export default router;
