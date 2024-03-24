import { addUser as addUserDB, checkuser, getusers, getuser, deleteuser, updateuser } from '../models/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 

// Add a user
export const addUser = async (req, res) => {
  // Extract user data from request body
  const { firstname, surname, gender, age, email, password } = req.body;
  
  // Add user to the database
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    await addUserDB(firstname, surname, gender, age, email, hashedPassword);
  
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login
export const loginuser = async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Check if user exists and password matches
  const isValidUser = await checkuser(email, password);
  
  if (isValidUser) {
    // Generate and send JWT token for authenticated user
    const token = generateJWTToken(email);
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// JWT token generation function
const generateJWTToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Get All users
export const getUsers = async (req, res) => {
  res.send(await getusers());
};

// Get user by userID
export const getUser = async (req, res) => {
  res.send(await getuser(+req.params.userID));
};

// Delete a Single user
export const deleteUser = async (req, res) => {
  res.send(await deleteuser(req.params.userID));
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, gender, age, email, password, profileurl } = req.body;
    const userID = +req.params.userID;

    // Update user in the database
    await updateuser(firstname, lastname, gender, age, email, password, profileurl, userID);

    // Respond with the updated user
    res.json(await getuser(userID));
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};