import {adduser, getusers, getuser, deleteuser, updateuser,
        } from '../models/database.js';
import bcrypt from 'bcrypt';
   
   // Add a user
    const addUser = async (req, res) => {
     const {userID, firstname, lastname, gender, age, userRole, email, password, profileurl } = req.body;
   
     // Hash the password
     const hashedPassword = await bcrypt.hash(password, 10);
   
     await adduser(userID, firstname, lastname, gender, age, userRole, email, hashedPassword, profileurl);
   
     res.json({ msg: 'User added successfully!' });
   };
   
   // Get All users
    const getUsers = async (req, res) => {
     res.send(await getusers());
   };
   
   // Get user by userID
   const getUser = async (req, res) => {
     res.send(await getuser(+req.params.userID));
   };
   
   // Delete a  Single user
    const deleteUser = async (req, res) => {
     res.send(await deleteuser(req.params.userID));
   };
   
   const updateUser = async (req, res) => {
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
  
   
   
   
   export{updateUser,addUser,deleteUser,getUser,getUsers,adduser,deleteuser,getuser}