import { useState, useEffect } from 'react';
import { FormProvider, useFormContext } from './context/FormContext';
import ProgressIndicator from './components/ProgressIndicator';
import StepPersonalInfo from './components/StepPersonalInfo';
import StepAccountDetails from './components/StepAccountDetails';
import StepReview from './components/StepReview';
import SuccessMessage from './components/SuccessMessage';

const TOTAL_STEPS = 3;

function FormContent() {
  const { state, nextStep, prevStep, submit, isCurrentStepValid } = useFormContext();
  const { currentStep, isSubmitted } = state;
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);
  const [displayStep, setDisplayStep] = useState(currentStep);

  useEffect(() => {
    if (currentStep !== displayStep) {
      setDirection(currentStep > displayStep ? 'next' : 'prev');
      setAnimating(true);
      const timeout = setTimeout(() => {
        setDisplayStep(currentStep);
        setAnimating(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [currentStep, displayStep]);

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  const stepValid = isCurrentStepValid();

  const getTransformClass = (): string => {
    if (animating) {
      return direction === 'next'
        ? 'opacity-0 -translate-x-4'
        : 'opacity-0 translate-x-4';
    }
    return 'opacity-100 translate-x-0';
  };

  return (
    <>
      <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <div className={`transition-all duration-200 ease-in-out ${getTransformClass()}`}>
        {displayStep === 1 && <StepPersonalInfo />}
        {displayStep === 2 && <StepAccountDetails />}
        {displayStep === 3 && <StepReview />}
      </div>

      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {currentStep < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!stepValid}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            className="px-5 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <FormProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h1>
          <FormContent />
        </div>
      </div>
    </FormProvider>
  );
}
