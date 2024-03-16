import {
    getProducts as getproducts,
    getProduct as getproduct,
    addProduct as addproduct,
    deleteProduct as deleteproduct,
    updateProduct as updateproduct,
} from '../models/database.js';

// Get All products
const getProducts = async (req, res) => {
    res.send(await getproducts());
};

// Get product by ID
const getProduct = async (req, res) => {
    res.send(await getproduct(+req.params.productID));
};

// Add a product
const addProduct = async (req, res) => {
    const { productID, prodname, category, amount, produrl } = req.body;
    res.send(await addproduct(productID, prodname, category, amount, produrl));
};

// Delete a product
const deleteProduct = async (req, res) => {
    res.send(await deleteproduct(req.params.productID));
};

// Update a product
let updateProduct = async (req, res) => {
    try {
        const { prodname, produrl, category, amount } = req.body;
        await updateproduct(prodname, produrl, category, amount, +req.params.productID);
        res.json(await getproducts());
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export { getProducts, getProduct, addProduct, deleteProduct, updateProduct };
