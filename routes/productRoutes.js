const express = require('express');
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const multer = require('multer');
const path = require('path');
const { authenticateJWT, isAdmin } = require('../middlewares/authMiddleware'); // Fix: Destructure correctly

const router = express.Router();

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
},
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed (jpeg, png, gif)'));
    }
  },
});

// Routes
router.get('/', getAllProducts); // Get all products
router.get('/:id', getProductById); // Get a product by ID

// Admin-only routes (Use isAdmin middleware from authMiddleware.js)
router.post('/', authenticateJWT, isAdmin, upload.single('image'), addProduct); // Add a new product
router.put('/:id', authenticateJWT, isAdmin, upload.single('image'), updateProduct); // Update a product
router.delete('/:id', authenticateJWT, isAdmin, deleteProduct); // Delete a product

module.exports = router;