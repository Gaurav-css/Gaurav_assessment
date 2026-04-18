import React, { useEffect, useRef } from 'react';
import styles from './SuccessScreen.module.css';

export default function SuccessScreen({ data, onReset }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.classList.add(styles.visible);
    }
  }, []);

  const skillChips = data.skills
    ? data.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div className={styles.page}>
      <div className={styles.container} ref={ref}>
        {/* Animated check */}
        <div className={styles.iconWrap}>
          <svg className={styles.checkSvg} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" stroke="#1A7A54" strokeWidth="2.5" className={styles.circle} />
            <path d="M18 33L27 42L46 23" stroke="#1A7A54" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.check} />
          </svg>
        </div>

        <div className={styles.textBlock}>
          <h1 className={styles.title}>Application submitted!</h1>
          <p className={styles.sub}>
            Thanks, <strong>{data.fullName}</strong>. We've received your application
            and will be in touch at <strong>{data.email}</strong>.
          </p>
        </div>

        {/* Summary card */}
        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Location</span>
            <span className={styles.summaryValue}>{data.city}, {data.state}, {data.country}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Qualification</span>
            <span className={styles.summaryValue}>{data.qualification}</span>
          </div>
          {skillChips.length > 0 && (
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Skills</span>
              <div className={styles.chips}>
                {skillChips.map((chip, i) => (
                  <span key={i} className={styles.chip}>{chip}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className={styles.resetBtn} onClick={onReset}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M1.5 7.5A6 6 0 0 1 12 3.5M1.5 7.5H4.5M1.5 7.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Submit another response
        </button>
      </div>
    </div>
  );
}
