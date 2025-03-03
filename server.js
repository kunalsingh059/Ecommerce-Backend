// const express = require('express');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const adminRoutes = require('./routes/adminRoutes'); 
// const orderRoutes = require('./routes/orderRoutes'); // ✅ Import Order Routes

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch((error) => console.error('MongoDB Connection Error:', error));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // CORS Configuration
// app.use(cors({
//   origin: ['http://localhost:3000'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));

// // Debugging Middleware
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Body:`, req.body);
//   next();
// });

// // ✅ Register Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/orders', orderRoutes); // ✅ Added missing orders route

// // Sample Route
// app.get('/', (req, res) => {
//   res.send('Backend is running');
// });

// // Handle CORS Preflight (OPTIONS requests)
// app.options('*', cors());

// // Start Server
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); 
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();
const PORT = 5000;

// MongoDB Connection with Error Handling
mongoose.connect("mongodb+srv://kunalsinghchouhan07:Kunalsinghchouhan059@ecommerce.zlfk2.mongodb.net/Backend")
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); //Stop server if DB connection fails
  });

// Dynamic CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',  // Local frontend
  process.env.FRONTEND_URL  // Deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Move OPTIONS preflight handling here
app.options('*', cors()); 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging Middleware (Logs requests)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Body:`, req.body);
  next();
});

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api", contactRoutes);

// Sample Route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
