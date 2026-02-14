import FormInput from './FormInput';

export default function StepPersonalInfo() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
      <FormInput field="firstName" label="First Name" placeholder="John" />
      <FormInput field="lastName" label="Last Name" placeholder="Doe" />
      <FormInput field="email" label="Email" type="email" placeholder="john@example.com" />
    </div>
  );
}
