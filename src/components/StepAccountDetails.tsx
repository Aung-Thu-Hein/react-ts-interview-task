import FormInput from './FormInput';

export default function StepAccountDetails() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Details</h2>
      <FormInput field="username" label="Username" placeholder="johndoe123" />
      <FormInput field="password" label="Password" type="password" placeholder="Min 8 chars, at least 1 number" />
      <FormInput field="confirmPassword" label="Confirm Password" type="password" placeholder="Re-enter your password" />
    </div>
  );
}
