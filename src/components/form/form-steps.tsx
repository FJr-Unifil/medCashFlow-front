import { nanoid } from 'nanoid'
import { StepIndicator } from '../steps/step-indicator'
import { Check } from 'lucide-react'
import { ProgressIndicator } from '../steps/progress-indicator'
import { Icon } from '../icon'

type FormStepsProps = {
  numberOfSteps: number
  currentStep: number
}

export function FormSteps({ numberOfSteps, currentStep }: FormStepsProps) {
  return (
    <div className="flex justify-center items-center gap-1">
      {[...Array(numberOfSteps)].map((_, i) => (
        <>
          <StepIndicator
            key={`step-${nanoid(4)}`}
            style={i > currentStep ? 'future' : 'default'}
          >
            {i >= currentStep ? i + 1 : <Icon icon={Check} state="light" />}
          </StepIndicator>
          {i + 1 < numberOfSteps && (
            <ProgressIndicator
              key={`progress-${nanoid(4)}`}
              style={
                i === currentStep
                  ? 'current'
                  : i > currentStep
                    ? 'future'
                    : 'default'
              }
            />
          )}
        </>
      ))}
    </div>
  )
}
