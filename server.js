const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();  // Load environment variables
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());  // For parsing JSON bodies
app.use(cors(
  
));  // To enable cross-origin requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.log('Mongo Error', error));

// Routes
app.use('/api/auth', authRoutes);  // Handle authentication routes
app.use('/api/products', productRoutes);


// Sample Route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


