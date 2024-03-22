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

   // Update a Single product
   const updateProduct = async (req, res) => {
    try {
      const productID = +req.params.productID;
      const updateData = req.body; // Contains only the fields to be updated
  
      // Update product in the database
      await updateproduct(updateData, productID);
  
      // Respond with the updated product
      res.json(await getproduct(productID));
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };
export { getProducts, getProduct, addProduct, deleteProduct, updateProduct };
