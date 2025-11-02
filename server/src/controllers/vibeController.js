import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemPrompt = `You are an advanced AI companion focused on providing insightful, thoughtful responses to users' emotional states. Your responses should be:

1. Professional and well-articulated
2. Empathetic and understanding
3. Solution-oriented when appropriate
4. Brief but impactful (2-3 sentences maximum)

Response Guidelines:
- Maintain a supportive, professional tone
- Avoid platitudes and generic responses
- Focus on validation and gentle guidance
- Use sophisticated language while remaining accessible
- Keep responses concise and meaningful

When responding to emotions:
- Acknowledge the feeling
- Validate the experience
- Offer perspective or gentle guidance
- End with a forward-looking statement

Style Variations:
'chill': Focus on mindfulness and reflection
'hype': Emphasize motivation and positive action
'fun': Balance lightness with genuine support

Prohibited:
- No emojis or informal language
- No clinical or medical advice
- No dismissive or minimizing statements
- No overly casual expressions`;

export const generateVibe = async (req, res) => {
  try {
    const { mood, style = 'chill' } = req.body;
    
    if (!mood || typeof mood !== 'string') {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Mood must be a non-empty string'
      });
    }

    console.log(`Generating vibe for mood: "${mood}" with style: ${style}`);
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `${systemPrompt}\n\nUser's current mood: "${mood}"\nStyle: ${style}\n\nProvide a response following the guidelines above.`;
    
    try {
      const result = await model.generateContent(prompt);
      
      if (!result || !result.response) {
        console.error('Empty result from Gemini API');
        throw new Error('Failed to generate content');
      }
      
      const text = result.response.text();
      
      if (!text || text.trim().length === 0) {
        console.error('Empty text response from Gemini API');
        throw new Error('Empty response from AI model');
      }
      
      console.log('Successfully generated response');
      
      return res.json({
        vibe: text.trim(),
        mood,
        timestamp: new Date().toISOString()
      });
    
  } catch (error) {
    console.error('Vibe generation error:', error);
    
    // Specific error handling
    if (error.message?.includes('quota')) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Please try again in a moment'
      });
    }
    
    return res.status(500).json({
      error: 'Failed to generate response',
      message: 'Unable to process your request at this time'
    });
  }
};