import { useEffect, useRef } from 'react';
import styles from './VibeDisplay.module.css';

const VibeDisplay = ({ response, isLoading, error }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (response && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response]);

  if (!isLoading && !response && !error) return null;

  return (
    <div ref={containerRef} className={`glass-panel ${styles.container} animate-fade-in`}>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.typingIndicator}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
          <p className={styles.loadingText}>Finding your vibe...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>
            {error === 'RATE_LIMIT' 
              ? '⏳ Whoa there! Take a breath. Try again in a minute.'
              : '😅 Oops! Something went wrong. Try again?'}
          </p>
        </div>
      ) : response ? (
        <div className={styles.responseContainer}>
          <p className={styles.responseText}>{response}</p>
        </div>
      ) : null}
    </div>
  );
};

export default VibeDisplay;