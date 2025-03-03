const express = require('express');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

const router = express.Router();

// Place an Order (User Only)
router.post('/', authenticateJWT, createOrder);

// Get All Orders (Admin Only)
router.get('/', authenticateJWT, getAllOrders);

// Get a Single Order by ID
router.get('/:id', authenticateJWT, getOrderById);

// Update Order Status (Admin Only)
router.put('/:id', authenticateJWT, updateOrderStatus);

// Delete an Order (Admin Only)
router.delete('/:id', authenticateJWT, deleteOrder);

module.exports = router;
