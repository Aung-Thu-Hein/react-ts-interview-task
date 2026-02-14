# User Registration Form

A multi-step user registration form built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Setup & Running

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/react-interview-task.git
cd react-interview-task
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser at the URL shown in the terminal (typically `http://localhost:5173`).

## Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory. You can preview it with:

```bash
npm run preview
```

## Project Structure

```
src/
├── types/form.ts              # TypeScript interfaces for form data, errors, and state
├── validation/validate.ts     # Pure validation functions (no external libraries)
├── context/FormContext.tsx     # Global state management using React useContext
├── components/
│   ├── FormInput.tsx           # Reusable input component with validation display
│   ├── ProgressIndicator.tsx   # Step progress indicator (1/3, 2/3, 3/3)
│   ├── StepPersonalInfo.tsx    # Step 1: First Name, Last Name, Email
│   ├── StepAccountDetails.tsx  # Step 2: Username, Password, Confirm Password
│   ├── StepReview.tsx          # Step 3: Review entered information
│   └── SuccessMessage.tsx      # Success screen after submission
├── App.tsx                     # Main app with step navigation and transitions
├── main.tsx                    # Entry point
└── index.css                   # Tailwind CSS import
```

## Approach to Form Validation

- Validation logic is separated into pure functions in `validation/validate.ts`, making it easy to test and reuse.
- Each field has its own validation rule defined in a single `validateField` function using a switch statement.
- Validation runs in real-time as the user types (`onChange`) and also on blur (`onBlur`).
- Error messages are only shown after the user has interacted with a field (touched state), preventing errors from appearing on an untouched form.
- The "Next" button is disabled until all fields in the current step pass validation.
- When the password field changes, the confirm password field is re-validated automatically.

## What I Would Improve With More Time

- Add unit tests for validation functions and component rendering.
- Add a password strength indicator.
- Add keyboard navigation support (Enter to proceed to next step).
- Add animations for the success screen.
- Add loading state for the submit button to simulate an API call.
- Add accessibility improvements (aria attributes, focus management between steps).

## API Endpoint Data Shape

In a real-world project, the registration form would submit to a `POST /api/auth/register` endpoint with the following payload:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "username": "johndoe123",
  "password": "securePass1"
}
```

The endpoint would return:

```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "username": "johndoe123",
    "createdAt": "2026-02-14T00:00:00.000Z"
  }
}
```

Note: `confirmPassword` would not be sent to the backend — it is only used for client-side validation.
