import { useState } from 'react';
import MoodInput from './components/MoodInput/MoodInput';
import VibeDisplay from './components/VibeDisplay/VibeDisplay';
import styles from './App.module.css';

function App() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMoodSubmit = async ({ mood, vibeStyle }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/vibe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood, style: vibeStyle }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        }
        throw new Error(data.message || 'Failed to generate response');
      }

      if (!data.vibe) {
        throw new Error('No response received from server');
      }

      setResponse(data.vibe);
    } catch (err) {
      console.error('Error submitting mood:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <div className={styles.background}>
          <div className={styles.gradient1}></div>
          <div className={styles.gradient2}></div>
        </div>
        <MoodInput onSubmit={handleMoodSubmit} isLoading={isLoading} />
        <VibeDisplay 
          response={response}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  )
}

export default App
