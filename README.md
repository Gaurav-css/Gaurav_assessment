# Multi-Step Form — React + CSS Modules

A clean, responsive, production-grade multi-step form built with React 18 and CSS Modules.

## Features

- **4-step flow**: Personal Info → Address → Academic/Professional → Review & Submit
- **Validation**: Required fields, email format, phone format — with per-field error messages
- **LocalStorage persistence**: Progress is auto-saved; refreshing the page restores your data
- **Animated transitions**: Smooth slide-up per step, SVG draw animation on success
- **Skill chips**: Skills preview in real-time as you type (comma-separated)
- **Fully responsive**: Mobile, tablet, desktop
- **DM Sans + DM Serif Display** typography for a refined editorial look

## Tech Stack

- React 18 (Create React App)
- CSS Modules (zero external UI library)
- LocalStorage for state persistence

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
```

Output goes to the `build/` folder — ready to deploy on Vercel, Netlify, Cloudflare Pages, etc.

## Project Structure

```
src/
├── App.js                    # Root: state, routing between steps
├── App.module.css
├── index.js
├── index.css                 # CSS variables / global tokens
└── components/
    ├── Stepper.js            # Progress indicator (track + circles + labels)
    ├── Stepper.module.css
    ├── StepWrapper.js        # Animated wrapper for each step
    ├── StepWrapper.module.css
    ├── Field.js              # Input, Select, Textarea + error display
    ├── Field.module.css
    ├── NavButtons.js         # Back / Continue / Submit buttons
    ├── NavButtons.module.css
    ├── StepPersonal.js       # Step 1 — Full name, email, phone
    ├── StepAddress.js        # Step 2 — City, state, country
    ├── StepProfessional.js   # Step 3 — Qualification, skills, experience
    ├── StepReview.js         # Step 4 — Read-only summary
    ├── StepReview.module.css
    ├── SuccessScreen.js      # Post-submit confirmation with SVG animation
    └── SuccessScreen.module.css
```

## Validation Rules

| Field        | Rule                                      |
|--------------|-------------------------------------------|
| Full name    | Required, min 2 characters                |
| Email        | Required, valid format (x@x.x)            |
| Phone        | Required, digits 0-9 only (8–16 digits)   |
| City         | Required                                  |
| State        | Required                                  |
| Country      | Required (dropdown)                       |
| Qualification| Required (dropdown)                       |
| Skills       | Required, min 2 characters                |
| Experience   | Optional                                  |

## Customization

- **Colors**: Edit CSS variables in `src/index.css`
- **Steps**: Add/remove step components and update the `STEPS` array in `App.js`
- **Countries / Qualifications**: Edit the arrays in `StepAddress.js` and `StepProfessional.js`

![alt text](<Screenshot 2026-04-18 170218.png>) ![alt text](<Screenshot 2026-04-18 170233.png>) ![alt text](<Screenshot 2026-04-18 171940.png>)