import { pool } from '../config/config.js';
import bcrypt from 'bcrypt';

// Products logic

const getProducts = async () => {
    const [result] = await pool.query(`
    SELECT * FROM products`);
    return result;
};

const getProduct = async (productID) => {
    const [result] = await pool.query(`
    SELECT * FROM products WHERE productID = ?`, 
    [productID]);
    return result;
};

const addProduct = async (productID, prodname, category, amount, produrl) => {
    await pool.query(
        "INSERT INTO products (productID, prodname, category, amount,produrl) VALUES (?,?,?,?,?)",
        [productID, prodname, category, amount, produrl]
    );
    return getProducts();
};

const deleteProduct = async (productID) => {
    await pool.query(`DELETE FROM products WHERE productID = ?`, [productID]);
    return getProducts();
};

const updateProduct = async (productID, prodname, category, amount, produrl,) => {
    await pool.query(`
        UPDATE products
        SET prodname=?, category=?, amount=?, produrl=?
        WHERE productID=?
    `, [productID,prodname,category,amount,produrl,]);
    return getProducts();
};

// Users logic

// const adduser = async (idusers, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile) => {
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(userPass, 10);

//     await pool.query(
//         "INSERT INTO users (idusers, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile) VALUES (?,?,?,?,?,?,?,?,?)",
//         [idusers, firstName, lastName, userAge, Gender, userRole, emailAdd, hashedPassword, userProfile]
//     );

//     return getusers();
// };

// const getusers = async () => {
//     const [result] = await pool.query(`SELECT * FROM users`);
//     return result;
// };

// const getuser = async (idusers) => {
//     const [result] = await pool.query(`SELECT * FROM users WHERE idusers = ?`, [idusers]);
//     return result;
// };

// const deleteuser = async (idusers) => {
//     await pool.query(`DELETE FROM users WHERE idusers = ?`, [idusers]);
//     return getusers();
// };

// const updateuser = async (firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile, idusers) => {
//     await pool.query(`
//         UPDATE users 
//         SET firstName=?, lastName=?, userAge=?, Gender=?, userRole=?, emailAdd=?, userPass=?, userProfile=?
//         WHERE idusers=?
//     `, [firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile, idusers]);
//     return getusers();
// };

// const checkuser = async (emailAdd, userPass) => {
//     try {
//         const [result] = await pool.query(`SELECT userPass FROM users WHERE emailAdd = ?`, [emailAdd]);

//         if (result.length === 0) {
//             // User not found
//             return false;
//         }

//         const hashedPassword = result[0].userPass;

//         // Compare the provided password with the hashed password
//         const passwordMatch = await bcrypt.compare(userPass, hashedPassword);

//         return passwordMatch;
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// };

export {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    // adduser,
    // checkuser,
    // getusers,
    // getuser,
    // deleteuser,
    // updateuser,
};