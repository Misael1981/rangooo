import { CheckCircle } from "lucide-react";

const ProgressSteps = ({ steps, currentStep }) => {
  return (
    <div className="mb-12 flex justify-center">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex flex-col items-center ${
                  isActive
                    ? "text-orange-600"
                    : isCompleted
                      ? "text-green-600"
                      : "text-gray-400"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                    isActive
                      ? "border-orange-600 bg-orange-50"
                      : isCompleted
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300 bg-white"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <StepIcon className="h-6 w-6" />
                  )}
                </div>
                <span className="mt-2 text-sm font-medium">{step.title}</span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mx-4 h-0.5 w-16 ${
                    isCompleted ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;
