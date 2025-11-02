import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { vibeRoutes } from './routes/vibeRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Verify Gemini API key is set
if (!process.env.GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY is not set in environment variables');
  process.exit(1);
}

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Test endpoint for API connectivity
app.get('/api/test', async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const result = await model.generateContent('Respond with "OK" if you can read this.');
    const response = await result.response;
    const text = response.text();
    
    res.json({ status: 'success', message: text });
  } catch (error) {
    console.error('API Test Error:', error);
    res.status(500).json({
      error: 'API Test Failed',
      details: error.message
    });
  }
});

// Routes
app.use('/api', vibeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource does not exist'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  
  // Don't send stack traces in production
  const error = process.env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred' 
    : err.message;
    
  res.status(err.status || 500).json({
    error: 'Server Error',
    message: error
  });
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Allowing CORS from: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});