import {
    getCartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity
} from '../models/database.js';

import {pool} from '../config/config.js'

// Show cart items for a user
const showCart = (req, res) => {
  const userID = req.params.id;
  getCartItems(userID)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Add items to cart
const createCart = (req, res) => {
  const { userID, productID, quantity } = req.body;
  addToCart(userID, productID, quantity)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Update cart item
const updateCart = (req, res) => {
  const { quantity } = req.body;
  const userID = req.params.id;
  const productID = req.params.productID;
  updateCartItemQuantity(userID, productID, quantity)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Remove cart item by ID
const deleteCart = (req, res) => {
  const userID = req.params.id;
  const productID = req.params.productID;
  removeFromCart(userID, productID)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Remove all cart items for a user
const deleteAllCartItems = (req, res) => {
    const userID = req.params.id;
    pool.query(
      "DELETE FROM cart WHERE userID = ?",
      [userID],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(results);
        }
      }
    );
  };

export {
  showCart,
  createCart,
  updateCart,
  deleteCart,
  deleteAllCartItems
};
