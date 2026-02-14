import { useFormContext } from '../context/FormContext';

export default function StepReview() {
  const { state } = useFormContext();
  const { firstName, lastName, email, username } = state.data;

  const fields = [
    { label: 'First Name', value: firstName },
    { label: 'Last Name', value: lastName },
    { label: 'Email', value: email },
    { label: 'Username', value: username },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Review Your Information</h2>
      <div className="space-y-3">
        {fields.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col sm:flex-row sm:justify-between py-3 px-4 bg-gray-50 rounded-lg"
          >
            <span className="text-sm font-medium text-gray-500">{label}</span>
            <span className="text-sm text-gray-800 font-medium">{value}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-400">
        Passwords are hidden for security and will not be displayed.
      </p>
    </div>
  );
}
