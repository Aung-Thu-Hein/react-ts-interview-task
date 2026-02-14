export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export type FormField = keyof FormData;

export type FormErrors = Partial<Record<FormField, string>>;

export type TouchedFields = Partial<Record<FormField, boolean>>;

export interface FormState {
  data: FormData;
  errors: FormErrors;
  touched: TouchedFields;
  currentStep: number;
  isSubmitted: boolean;
}

export interface FormContextType {
  state: FormState;
  setField: (field: FormField, value: string) => void;
  setTouched: (field: FormField) => void;
  nextStep: () => void;
  prevStep: () => void;
  submit: () => void;
  isCurrentStepValid: () => boolean;
}
