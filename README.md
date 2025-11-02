# Ask My Vibe 🌟

An AI-powered mood response generator that provides personalized, vibes based on your current mood.

## Quick Start 🚀

### Prerequisites

- Node.js 20+
- npm 9+
- Google AI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ask-my-vibe.git
   cd ask-my-vibe
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Configure environment variables:

   Frontend (.env):
   ```
   VITE_API_URL=http://localhost:3000
   ```

   Backend (.env):
   ```
   PORT=3000
   GEMINI_API_KEY=your_api_key_here
   CORS_ORIGIN=http://localhost:5173
   ```

4. Start the development servers:

   ```bash
   # Terminal 1 - Frontend
   cd client
   npm run dev

   # Terminal 2 - Backend
   cd server
   npm run dev
   ```

5. Visit http://localhost:5173 in your browser

## Testing 🧪

```bash
# Run frontend tests
cd client
npm test

# Run backend tests
cd server
npm test
```

## API Testing

Test the API endpoint:

```bash
curl -X POST http://localhost:3000/api/vibe \
  -H "Content-Type: application/json" \
  -d '{"mood": "excited", "style": "fun"}'
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the LICENSE file for details.