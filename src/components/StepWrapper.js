import React, { useEffect, useRef } from 'react';
import styles from './StepWrapper.module.css';

export default function StepWrapper({ title, description, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove(styles.animate);
    void el.offsetWidth;
    el.classList.add(styles.animate);
  }, [title]);

  return (
    <div ref={ref} className={`${styles.wrapper} ${styles.animate}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
