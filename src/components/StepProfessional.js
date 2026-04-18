import React, { useState } from 'react';
import StepWrapper from './StepWrapper';
import Field, { Select, Input, Textarea } from './Field';
import NavButtons from './NavButtons';

const QUALIFICATIONS = [
  'High School / 10+2',
  'Diploma',
  'B.Tech / B.E.',
  'BCA / B.Sc (CS/IT)',
  'M.Tech / M.E.',
  'MBA / MCA',
  'PhD',
  'Other',
];

const validate = (data) => {
  const errors = {};
  if (!data.qualification) errors.qualification = 'Please select your qualification';
  if (!data.skills.trim()) errors.skills = 'Please enter at least one skill';
  else if (data.skills.trim().length < 2) errors.skills = 'Skills must be at least 2 characters';
  return errors;
};

export default function StepProfessional({ data, update, onNext, onPrev }) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const touch = (field) => setTouched(t => ({ ...t, [field]: true }));

  const handleNext = () => {
    const errs = validate(data);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTouched({ qualification: true, skills: true });
    } else {
      onNext();
    }
  };

  const handleChange = (field, value) => {
    update({ [field]: value });
    if (touched[field]) {
      const errs = validate({ ...data, [field]: value });
      setErrors(e => ({ ...e, [field]: errs[field] }));
    }
  };

  const skillChips = data.skills
    ? data.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <StepWrapper title="Academic & professional" description="Tell us about your background and what you bring to the table.">
      <Field label="Highest qualification" required error={touched.qualification && errors.qualification}>
        <Select
          value={data.qualification}
          onChange={e => { handleChange('qualification', e.target.value); touch('qualification'); }}
          error={touched.qualification && errors.qualification}
        >
          <option value="">Select qualification</option>
          {QUALIFICATIONS.map(q => <option key={q} value={q}>{q}</option>)}
        </Select>
      </Field>

      <Field
        label="Key skills"
        required
        hint="comma-separated"
        error={touched.skills && errors.skills}
      >
        <Input
          type="text"
          placeholder="React, Node.js, MongoDB, AWS..."
          value={data.skills}
          onChange={e => handleChange('skills', e.target.value)}
          onBlur={() => { touch('skills'); const e = validate(data); setErrors(p => ({...p, skills: e.skills})); }}
          error={touched.skills && errors.skills}
        />
        {skillChips.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
            {skillChips.map((chip, i) => (
              <span key={i} style={{
                padding: '3px 10px',
                borderRadius: '99px',
                background: 'var(--accent-light)',
                color: 'var(--accent)',
                fontSize: '12px',
                fontWeight: 500,
              }}>{chip}</span>
            ))}
          </div>
        )}
      </Field>

      <Field label="Experience" hint="optional">
        <Textarea
          placeholder="Briefly describe your work experience, internships, or projects..."
          value={data.experience}
          onChange={e => update({ experience: e.target.value })}
        />
      </Field>

      <NavButtons onPrev={onPrev} onNext={handleNext} />
    </StepWrapper>
  );
}
