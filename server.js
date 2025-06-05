const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import the DB connection
const connectDB = require('./services/dbService'); 

// Import middlewares
const { decryptRequest, encryptResponse } = require('./middleware/encryption');

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes'); // Optional

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Add your frontend URLs
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Apply encryption middleware globally (decrypt incoming, encrypt outgoing)
app.use(decryptRequest);
app.use(encryptResponse);

// Connect to MongoDB
connectDB();

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Task API with JWT Authentication and Encryption is running!',
    version: '1.0.0',
    features: [
      'JWT Authentication',
      'AES Encrypted Request/Response',
      'User Management',
      'Task Management'
    ]
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);   // Auth routes (JWT only, no encryption for tokens)
app.use('/api/tasks', taskRoutes);  // Task routes (encrypted)
app.use('/api/users', userRoutes);  // User routes (encrypted, optional)

// 404 Not Found
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: error.message })
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 Encryption & JWT configured`);
});
