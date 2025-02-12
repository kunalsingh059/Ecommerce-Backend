const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Optional discount
  category: { type: String, required: true }, // Category name (e.g., 'Living', 'Bedroom', 'Dining')
  image: { type: String }, // URL for the product image
  stock: { type: Number, default: 1 },
  isNewProduct: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
