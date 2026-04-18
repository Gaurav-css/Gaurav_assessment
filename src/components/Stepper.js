import React from 'react';
import styles from './Stepper.module.css';

export default function Stepper({ steps, current }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div
          className={styles.progress}
          style={{ width: `${(current / (steps.length - 1)) * 100}%` }}
        />
      </div>
      <div className={styles.steps}>
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={step.id} className={styles.step}>
              <div className={`${styles.circle} ${done ? styles.done : active ? styles.active : ''}`}>
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <div className={styles.label}>
                <span className={`${styles.main} ${active ? styles.activeLabel : done ? styles.doneLabel : ''}`}>
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
