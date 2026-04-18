import React from 'react';
import styles from './NavButtons.module.css';

export default function NavButtons({ onPrev, onNext, onSubmit, isFirst, isLast, submitLabel = 'Submit application' }) {
  return (
    <div className={`${styles.nav} ${isFirst ? styles.navEnd : ''}`}>
      {!isFirst && (
        <button type="button" className={styles.back} onClick={onPrev}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      )}
      {isLast ? (
        <button type="button" className={styles.submit} onClick={onSubmit}>
          {submitLabel}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      ) : (
        <button type="button" className={styles.next} onClick={onNext}>
          Continue
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
