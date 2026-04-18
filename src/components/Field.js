import React from 'react';
import styles from './Field.module.css';

export default function Field({ label, error, required, children, hint }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.req}>*</span>}
        {hint && <span className={styles.hint}>{hint}</span>}
      </label>
      {children}
      {error && (
        <p className={styles.error}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{flexShrink:0}}>
            <circle cx="6" cy="6" r="5.5" stroke="currentColor"/>
            <path d="M6 3.5V6.5M6 8.5V8.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ error, ...props }) {
  return (
    <input
      className={`${styles.input} ${error ? styles.inputErr : ''}`}
      {...props}
    />
  );
}

export function Select({ error, children, ...props }) {
  return (
    <div className={styles.selectWrap}>
      <select className={`${styles.select} ${error ? styles.inputErr : ''}`} {...props}>
        {children}
      </select>
      <svg className={styles.chevron} width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export function Textarea({ error, ...props }) {
  return (
    <textarea
      className={`${styles.textarea} ${error ? styles.inputErr : ''}`}
      {...props}
    />
  );
}
