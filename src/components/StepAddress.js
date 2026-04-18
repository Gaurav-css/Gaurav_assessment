import React, { useState } from 'react';
import StepWrapper from './StepWrapper';
import Field, { Input, Select } from './Field';
import NavButtons from './NavButtons';

const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Singapore', 'UAE', 'Japan', 'Other',
];

const validate = (data) => {
  const errors = {};
  if (!data.city.trim()) errors.city = 'City is required';
  if (!data.state.trim()) errors.state = 'State / province is required';
  if (!data.country) errors.country = 'Please select a country';
  return errors;
};

export default function StepAddress({ data, update, onNext, onPrev }) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const touch = (field) => setTouched(t => ({ ...t, [field]: true }));

  const handleNext = () => {
    const errs = validate(data);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTouched({ city: true, state: true, country: true });
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

  return (
    <StepWrapper title="Address details" description="Where in the world are you based?">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Field label="City" required error={touched.city && errors.city}>
          <Input
            type="text"
            placeholder="City"
            value={data.city}
            onChange={e => handleChange('city', e.target.value)}
            onBlur={() => { touch('city'); const e = validate(data); setErrors(p => ({...p, city: e.city})); }}
            error={touched.city && errors.city}
            autoComplete="address-level2"
          />
        </Field>

        <Field label="State / Province" required error={touched.state && errors.state}>
          <Input
            type="text"
            placeholder="State / Province"
            value={data.state}
            onChange={e => handleChange('state', e.target.value)}
            onBlur={() => { touch('state'); const e = validate(data); setErrors(p => ({...p, state: e.state})); }}
            error={touched.state && errors.state}
            autoComplete="address-level1"
          />
        </Field>
      </div>

      <Field label="Country" required error={touched.country && errors.country}>
        <Select
          value={data.country}
          onChange={e => { handleChange('country', e.target.value); touch('country'); }}
          error={touched.country && errors.country}
          autoComplete="country-name"
        >
          <option value="">Select your country</option>
          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
      </Field>

      <NavButtons onPrev={onPrev} onNext={handleNext} />
    </StepWrapper>
  );
}
