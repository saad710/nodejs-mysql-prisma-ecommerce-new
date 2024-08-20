import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductVariant,
  updateProductVariant,
  deleteProductVariant
} from '../controllers/productController';

const router = express.Router();

// Product Routes
router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// Product Variant Routes
router.post('/:productId/variants', createProductVariant);
router.put('/variants/:id', updateProductVariant);
router.delete('/variants/:id', deleteProductVariant);

export default router;
