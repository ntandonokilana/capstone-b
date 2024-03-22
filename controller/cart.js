import {
    getCartItems as getCartItemsFromDB,
    addToCart as addToCartInDB,
    removeFromCart as removeFromCartInDB,
    updateCartItemQuantity as updateCartItemQuantityInDB
} from '../models/database.js';

// Get cart items for a user
const getCartItems = async (req, res) => {
    try {
        const userID = +req.params.userID;
        const cartItems = await getCartItemsFromDB(userID);
        res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const userID = +req.params.userID;
        const { productID, quantity } = req.body;
        const updatedCart = await addToCartInDB(userID, productID, quantity);
        res.json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const userID = +req.params.userID;
        const productID = +req.params.productID;
        const updatedCart = await removeFromCartInDB(userID, productID);
        res.json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Update item quantity in cart
const updateCartItemQuantity = async (req, res) => {
    try {
        const userID = +req.params.userID;
        const productID = +req.params.productID;
        const { quantity } = req.body;
        const updatedCart = await updateCartItemQuantityInDB(userID, productID, quantity);
        res.json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export { getCartItems, addToCart, removeFromCart, updateCartItemQuantity };
