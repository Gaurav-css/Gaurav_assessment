import React from 'react';
import StepWrapper from './StepWrapper';
import NavButtons from './NavButtons';
import styles from './StepReview.module.css';

function Section({ title, children }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>{title}</div>
      <div className={styles.grid}>{children}</div>
    </div>
  );
}

function Item({ label, value, full }) {
  return (
    <div className={`${styles.item} ${full ? styles.full : ''}`}>
      <span className={styles.itemLabel}>{label}</span>
      <span className={styles.itemValue}>{value || <em className={styles.empty}>Not provided</em>}</span>
    </div>
  );
}

export default function StepReview({ data, onPrev, onSubmit }) {
  const skillChips = data.skills
    ? data.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <StepWrapper title="Review your details" description="Everything look right? Hit submit when you're ready.">
      <div className={styles.card}>
        <Section title="Personal information">
          <Item label="Full name" value={data.fullName} />
          <Item label="Phone" value={data.phone} />
          <Item label="Email" value={data.email} full />
        </Section>

        <div className={styles.divider} />

        <Section title="Address">
          <Item label="City" value={data.city} />
          <Item label="State / Province" value={data.state} />
          <Item label="Country" value={data.country} />
        </Section>

        <div className={styles.divider} />

        <Section title="Academic & professional">
          <Item label="Qualification" value={data.qualification} />
          <div className={`${styles.item} ${styles.full}`}>
            <span className={styles.itemLabel}>Skills</span>
            {skillChips.length > 0 ? (
              <div className={styles.chips}>
                {skillChips.map((chip, i) => (
                  <span key={i} className={styles.chip}>{chip}</span>
                ))}
              </div>
            ) : <em className={styles.empty}>Not provided</em>}
          </div>
          {data.experience && (
            <div className={`${styles.item} ${styles.full}`}>
              <span className={styles.itemLabel}>Experience</span>
              <p className={styles.experienceText}>{data.experience}</p>
            </div>
          )}
        </Section>
      </div>

      <NavButtons onPrev={onPrev} isLast onSubmit={onSubmit} submitLabel="Submit application" />
    </StepWrapper>
  );
}
