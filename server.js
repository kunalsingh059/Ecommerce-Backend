const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('MongoDB Connection Error:', error));

// Middleware
app.use(express.json()); // For parsing JSON bodies

// CORS Configuration
app.use(cors({
  origin: '*',  // Your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Include cookies or authorization headers
}));


// Debugging Middleware for Incoming Requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Body:`, req.body);
  next();
});

// Routes
app.use('/api/auth', authRoutes); // Handle authentication routes
app.use('/api/products', productRoutes);

// Sample Route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Handle CORS Preflight (OPTIONS requests)
app.options('*', cors());

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
