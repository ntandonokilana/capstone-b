import express from 'express';
import {
  updateUser,addUser,loginuser, deleteUser,getUser,getUsers,
} from '../controller/users.js';

const router = express.Router();

// Signup
router.route('/signup').post(addUser);

// Login
router.route('/login').post(loginuser);

// Get all users
router.route('/users').get(getUsers);

// Get user by ID
router.route('/users/:userID').get(getUser);

// Add a user
router.route('/users').post(addUser).get(getUsers);

// Delete a user
router.route('/users/:userID').delete( deleteUser);

// Update a user
router.route('/users/:userID').patch( updateUser);


export default router;