import { useState } from 'react';
import styles from './MoodInput.module.css';

const MoodInput = ({ onSubmit, isLoading }) => {
  const [mood, setMood] = useState('');
  const [vibeStyle, setVibeStyle] = useState('chill');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood.trim()) {
      onSubmit({ mood, vibeStyle });
    }
  };

  return (
    <div className={`glass-panel ${styles.container}`}>
      <h1 className={styles.title}>
        Ask My Vibe
      </h1>
      <p className={styles.subtitle}>
        Share your thoughts. Receive meaningful insights.
      </p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="How are you feeling right now?"
            className={styles.input}
            disabled={isLoading}
          />
          <div className={styles.inputBorder} />
        </div>

        <div className={styles.vibeSelector}>
          <button
            type="button"
            className={`${styles.vibeButton} ${vibeStyle === 'chill' ? styles.active : ''}`}
            onClick={() => setVibeStyle('chill')}
          >
            Reflective
          </button>
          <button
            type="button"
            className={`${styles.vibeButton} ${vibeStyle === 'fun' ? styles.active : ''}`}
            onClick={() => setVibeStyle('fun')}
          >
            Balanced
          </button>
          <button
            type="button"
            className={`${styles.vibeButton} ${vibeStyle === 'hype' ? styles.active : ''}`}
            onClick={() => setVibeStyle('hype')}
          >
            Motivated
          </button>
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isLoading || !mood.trim()}
        >
          {isLoading ? (
            <span className={styles.loader}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </span>
          ) : (
            'Get Your Vibe ✨'
          )}
        </button>
      </form>
    </div>
  );
};

export default MoodInput;