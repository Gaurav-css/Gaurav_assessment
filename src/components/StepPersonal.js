import React, { useState } from 'react';
import StepWrapper from './StepWrapper';
import Field, { Input } from './Field';
import NavButtons from './NavButtons';

const validate = (data) => {
  const errors = {};
  if (!data.fullName.trim()) errors.fullName = 'Full name is required';
  else if (data.fullName.trim().length < 2) errors.fullName = 'Name must be at least 2 characters';
  if (!data.email.trim()) errors.email = 'Email address is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address';
  if (!data.phone.trim()) errors.phone = 'Phone number is required';
  else if (!/^\d{8,16}$/.test(data.phone)) errors.phone = 'Enter a valid phone number (0-9 only, 8-16 digits)';
  return errors;
};

export default function StepPersonal({ data, update, onNext }) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const touch = (field) => setTouched(t => ({ ...t, [field]: true }));

  const handleNext = () => {
    const errs = validate(data);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTouched({ fullName: true, email: true, phone: true });
    } else {
      onNext();
    }
  };

  const handleChange = (field, value) => {
    const normalizedValue = field === 'phone' ? value.replace(/\D/g, '') : value;
    update({ [field]: normalizedValue });
    if (touched[field]) {
      const errs = validate({ ...data, [field]: normalizedValue });
      setErrors(e => ({ ...e, [field]: errs[field] }));
    }
  };

  return (
    <StepWrapper title="Personal information" description="Start with the basics — who are you?">
      <Field label="Full name" required error={touched.fullName && errors.fullName}>
        <Input
          type="text"
          placeholder="e.g. Full Name"
          value={data.fullName}
          onChange={e => handleChange('fullName', e.target.value)}
          onBlur={() => { touch('fullName'); const e = validate(data); setErrors(prev => ({...prev, fullName: e.fullName})); }}
          error={touched.fullName && errors.fullName}
          autoComplete="name"
        />
      </Field>

      <Field label="Email address" required error={touched.email && errors.email}>
        <Input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          value={data.email}
          onChange={e => handleChange('email', e.target.value)}
          onBlur={() => { touch('email'); const e = validate(data); setErrors(prev => ({...prev, email: e.email})); }}
          error={touched.email && errors.email}
          autoComplete="email"
        />
      </Field>

      <Field label="Phone number" required error={touched.phone && errors.phone}>
        <Input
          type="tel"
          placeholder="9876543210"
          value={data.phone}
          onChange={e => handleChange('phone', e.target.value)}
          onBlur={() => { touch('phone'); const e = validate(data); setErrors(prev => ({...prev, phone: e.phone})); }}
          error={touched.phone && errors.phone}
          autoComplete="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={16}
        />
      </Field>

      <NavButtons isFirst onNext={handleNext} />
    </StepWrapper>
  );
}
