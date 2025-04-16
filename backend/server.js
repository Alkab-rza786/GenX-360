import express from 'express';
import dotenv from 'dotenv/config.js';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import connectCloudinary from './config/cloudinary.js';


// dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// DB Connection
connectDB();
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🚀 MediWallet API is running...');
});

// Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
