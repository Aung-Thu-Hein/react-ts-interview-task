import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { FormState, FormField, FormContextType } from '../types/form';
import { validateField, validateStep } from '../validation/validate';

const initialData = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const initialState: FormState = {
  data: initialData,
  errors: {},
  touched: {},
  currentStep: 1,
  isSubmitted: false,
};

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FormState>(initialState);

  const setField = useCallback((field: FormField, value: string) => {
    setState((prev) => {
      const newData = { ...prev.data, [field]: value };
      const error = validateField(field, value, newData);

      // Also re-validate confirmPassword when password changes
      const errors = { ...prev.errors, [field]: error };
      if (field === 'password' && prev.touched.confirmPassword) {
        errors.confirmPassword = validateField('confirmPassword', newData.confirmPassword, newData);
      }

      return {
        ...prev,
        data: newData,
        errors,
      };
    });
  }, []);

  const setTouched = useCallback((field: FormField) => {
    setState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [field]: true },
    }));
  }, []);

  const isCurrentStepValid = useCallback((): boolean => {
    const stepErrors = validateStep(state.currentStep, state.data);
    return Object.keys(stepErrors).length === 0;
  }, [state.currentStep, state.data]);

  const nextStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep >= 3) return prev;
      const stepErrors = validateStep(prev.currentStep, prev.data);
      if (Object.keys(stepErrors).length > 0) return prev;
      return { ...prev, currentStep: prev.currentStep + 1 };
    });
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep <= 1) return prev;
      return { ...prev, currentStep: prev.currentStep - 1 };
    });
  }, []);

  const submit = useCallback(() => {
    setState((prev) => {
      console.log('Registration Data:', JSON.stringify(prev.data, null, 2));
      return { ...initialState, isSubmitted: true };
    });
  }, []);

  return (
    <FormContext.Provider
      value={{ state, setField, setTouched, nextStep, prevStep, submit, isCurrentStepValid }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext(): FormContextType {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}
