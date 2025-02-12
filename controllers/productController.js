const Product = require('../models/product');
const fs = require('fs');

// Get all products (with optional category filter)
exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query; // Get the category from query parameters
    const filter = category ? { category: category.toLowerCase() } : {}; // Filter by category if provided

    const products = await Product.find(filter); // Apply the filter to the query
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    // Validation
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    const image = req.file ? req.file.path : null;  // Multer stores the uploaded file and provides its path

    const newProduct = new Product({
      name,
      description: req.body.description,
      price,
      discount: req.body.discount,
      category: category.toLowerCase(),  // Convert category to lowercase for consistency
      image,
      stock: req.body.stock,
      isNewProduct: req.body.isNewProduct,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.file) {
      if (product.image && fs.existsSync(product.image)) {
        fs.unlinkSync(product.image);
      }
      product.image = req.file.path;
    }

    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });

    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};
