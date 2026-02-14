import type { FormField } from '../types/form';
import { useFormContext } from '../context/FormContext';

interface FormInputProps {
  field: FormField;
  label: string;
  type?: string;
  placeholder?: string;
}

export default function FormInput({ field, label, type = 'text', placeholder }: FormInputProps) {
  const { state, setField, setTouched } = useFormContext();
  const value = state.data[field];
  const error = state.errors[field];
  const touched = state.touched[field];

  return (
    <div className="mb-4">
      <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={field}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setField(field, e.target.value)}
        onBlur={() => setTouched(field)}
        className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 ${
          error && touched
            ? 'border-red-400 focus:ring-red-200'
            : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
        }`}
      />
      {error && touched && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
