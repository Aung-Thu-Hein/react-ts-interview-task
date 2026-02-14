interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ['Personal Info', 'Account Details', 'Review'];

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <div key={step} className="flex-1 flex flex-col items-center relative">
              {/* Connector line */}
              {i > 0 && (
                <div
                  className={`absolute top-4 right-1/2 w-full h-0.5 transition-colors duration-300 ${
                    isCompleted || isActive ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              )}

              {/* Step circle */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-500 text-white ring-4 ring-blue-100'
                    : isCompleted
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? '✓' : step}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                  isActive ? 'text-blue-600' : isCompleted ? 'text-blue-500' : 'text-gray-400'
                }`}
              >
                {STEP_LABELS[i]}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
