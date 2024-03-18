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

// Users 

const adduser = async (userID, firstname, lastname, gender, age, email, password, profileurl) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
        "INSERT INTO users (userID, firstname, lastname, gender, age, email, password, profileurl) VALUES (?,?,?,?,?,?,?,?)",
        [userID, firstname, lastname, gender, age, email, password, profileurl]
    );

    return getusers();
};

const getusers = async () => {
    const [result] = await pool.query(`SELECT * FROM users`);
    return result;
};

const getuser = async (userID) => {
    const [result] = await pool.query(`SELECT * FROM users WHERE userID = ?`, [userID]);
    return result;
};

const deleteuser = async (userID) => {
    await pool.query(`DELETE FROM users WHERE userID = ?`, [userID]);
    return getusers();
};

const updateuser = async (firstname, lastname, gender, age, email, password, profileurl, userID) => {
    await pool.query(`
        UPDATE users 
        SET firstname=?, lastname=?, gender=?, age=?, email=?, password=?, profileurl=?
        WHERE userID=?
    `, [firstname, lastname, gender, age, email, password, profileurl, userID]);
    return getusers();
};

const checkuser = async (email, password) => {
    try {
        const [result] = await pool.query(`SELECT password FROM users WHERE email = ?`, [email]);

        if (result.length === 0) {
            // User not found
            return false;
        }

        const hashedPassword = result[0].password;

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        return passwordMatch;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    adduser,
    checkuser,
    getusers,
    getuser,
    deleteuser,
    updateuser,
};