import { GoogleGenerativeAI } from '@google/generative-ai';

// Test Gemini connection
export const testConnection = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const result = await model.generateContent('Respond with the word "OK" if you can read this.');
    const response = await result.response;
    const text = response.text();
    
    return res.json({ status: 'success', message: text });
  } catch (error) {
    console.error('API Test Error:', error);
    return res.status(500).json({
      error: 'API Test Failed',
      message: error.message
    });
  }
};