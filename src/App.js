import React, { useState, useEffect } from 'react';
import Stepper from './components/Stepper';
import StepPersonal from './components/StepPersonal';
import StepAddress from './components/StepAddress';
import StepProfessional from './components/StepProfessional';
import StepReview from './components/StepReview';
import SuccessScreen from './components/SuccessScreen';
import styles from './App.module.css';

const STEPS = [
  { id: 'personal', label: 'Personal', sub: 'Who you are' },
  { id: 'address', label: 'Address', sub: 'Where you are' },
  { id: 'professional', label: 'Academic', sub: 'What you do' },
  { id: 'review', label: 'Review', sub: 'Confirm & send' },
];

const STORAGE_KEY = 'msf_progress';

const defaultData = {
  fullName: '', email: '', phone: '',
  city: '', state: '', country: '',
  qualification: '', skills: '', experience: '',
};

export default function App() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    } catch { return defaultData; }
  });
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState('forward');

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  const update = (fields) => setData(prev => ({ ...prev, ...fields }));

  const next = () => {
    setDirection('forward');
    setCurrent(c => Math.min(c + 1, STEPS.length - 1));
  };

  const prev = () => {
    setDirection('back');
    setCurrent(c => Math.max(c - 1, 0));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  const reset = () => {
    setData(defaultData);
    setCurrent(0);
    setSubmitted(false);
    setDirection('forward');
  };

  if (submitted) return <SuccessScreen data={data} onReset={reset} />;

  const stepProps = { data, update, onNext: next, onPrev: prev, direction };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>Application Form</div>
          <h1 className={styles.title}>Let's get to<br /><em>know you</em></h1>
          <p className={styles.subtitle}>Fill in your details across {STEPS.length} simple steps.</p>
        </header>

        <div className={styles.formCard}>
          <Stepper steps={STEPS} current={current} />

          <div className={styles.stepMeta}>
            <span className={styles.stepCount}>Step {current + 1} of {STEPS.length}</span>
            <span className={styles.stepName}>{STEPS[current].sub}</span>
          </div>

          {current === 0 && <StepPersonal {...stepProps} />}
          {current === 1 && <StepAddress {...stepProps} />}
          {current === 2 && <StepProfessional {...stepProps} />}
          {current === 3 && <StepReview {...stepProps} onSubmit={handleSubmit} />}
        </div>

      
      </div>
    </div>
  );
}
