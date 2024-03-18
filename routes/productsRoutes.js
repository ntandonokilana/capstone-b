import express from 'express';
import {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} from '../controller/products.js';

const router = express.Router();

// Get All Products
router.get('/products', getProducts);

// Get a Single Product by ID
router.get('/products/:productID', getProduct);

// Add a Single Product
router.post('/products', addProduct);

// Delete a Single Product
router.delete('/products/:productID', deleteProduct);

// Update a Single Product
router.patch('/products/:productID', updateProduct);

export default router;

