import express from 'express';
import {
    getCartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity
} from '../controller/cart.js';

const router = express.Router();

// Get cart items for a user
router.get('/cart/:userID', getCartItems);

// Add item to cart
router.post('/cart/:userID/add', addToCart);

// Remove item from cart
router.delete('/cart/:userID/remove/:productID', removeFromCart);

// Update item quantity in cart
router.patch('/cart/:userID/update/:productID', updateCartItemQuantity);

export default router;