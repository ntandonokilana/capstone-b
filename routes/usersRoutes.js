import express from 'express';
import {
  updateUser,addUser,deleteUser,getUser,getUsers,
} from '../controller/users.js';

const router = express.Router();

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