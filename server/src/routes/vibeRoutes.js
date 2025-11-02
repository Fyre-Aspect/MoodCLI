import express from 'express';
import { generateVibe } from '../controllers/vibeController.js';

const router = express.Router();

// Basic input validation middleware
const validateMoodInput = (req, res, next) => {
  const { mood } = req.body;
  if (!mood || typeof mood !== 'string' || mood.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid input',
      message: 'Please provide a valid mood'
    });
  }
  next();
};

// Basic rate limiter middleware
const rateLimiter = (req, res, next) => {
  next(); // For development, we'll skip rate limiting
};

router.post('/vibe', validateMoodInput, rateLimiter, generateVibe);

export const vibeRoutes = router;