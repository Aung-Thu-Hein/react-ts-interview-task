import type { FormData, FormField, FormErrors } from '../types/form';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

export function validateField(field: FormField, value: string, data: FormData): string {
  switch (field) {
    case 'firstName':
      if (!value.trim()) return 'First name is required.';
      if (value.trim().length < 2) return 'First name must be at least 2 characters.';
      return '';

    case 'lastName':
      if (!value.trim()) return 'Last name is required.';
      if (value.trim().length < 2) return 'Last name must be at least 2 characters.';
      return '';

    case 'email':
      if (!value.trim()) return 'Email is required.';
      if (!EMAIL_REGEX.test(value.trim())) return 'Please enter a valid email address.';
      return '';

    case 'username':
      if (!value.trim()) return 'Username is required.';
      if (value.trim().length < 4) return 'Username must be at least 4 characters.';
      if (!ALPHANUMERIC_REGEX.test(value.trim())) return 'Username must be alphanumeric only.';
      return '';

    case 'password':
      if (!value) return 'Password is required.';
      if (value.length < 8) return 'Password must be at least 8 characters.';
      if (!/\d/.test(value)) return 'Password must contain at least one number.';
      return '';

    case 'confirmPassword':
      if (!value) return 'Please confirm your password.';
      if (value !== data.password) return 'Passwords do not match.';
      return '';

    default:
      return '';
  }
}

const STEP_FIELDS: Record<number, FormField[]> = {
  1: ['firstName', 'lastName', 'email'],
  2: ['username', 'password', 'confirmPassword'],
};

export function getStepFields(step: number): FormField[] {
  return STEP_FIELDS[step] ?? [];
}

export function validateStep(step: number, data: FormData): FormErrors {
  const fields = getStepFields(step);
  const errors: FormErrors = {};

  for (const field of fields) {
    const error = validateField(field, data[field], data);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}
