import express from 'express';
import {
    showCart,
    createCart,
    deleteAllCartItems,
    deleteCart,
    updateCart
} from '../controller/cart.js';

const router = express.Router();

// Get cart items for a user
router.get('/users/:id/cart', showCart);

// Add item to cart
router.post('/users/:id/cart', createCart);

// Remove all cart items for a user
router.delete('/users/:id/cart', deleteAllCartItems);

// Remove item from cart
router.delete('/users/:id/cart/:productID', deleteCart);

// Update item quantity in cart
router.put('/users/:id/cart/:productID', updateCart);

export default router;