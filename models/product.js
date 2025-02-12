const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Optional discount
  category: { type: Number, integer: true }, // Category name like 'Dining', 'Bedroom'
  image: { type: String }, // URL for the product image
  stock: { type: Number, default: 1 }, // Quantity in stock
  isNewProduct: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
