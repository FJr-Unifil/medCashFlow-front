import { nanoid } from 'nanoid'
import { Step } from '../steps/step'
import { Check } from 'lucide-react'
import { ProgressIndicator } from '../steps/progressIndicator'
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
          <Step
            key={`step-${nanoid(4)}`}
            style={i + 1 > currentStep ? 'future' : 'default'}
          >
            {i + 1 >= currentStep ? i + 1 : <Icon icon={Check} state="light" />}
          </Step>
          {i + 1 < numberOfSteps && (
            <ProgressIndicator
              key={`progress-${nanoid(4)}`}
              style={
                i + 1 === currentStep
                  ? 'current'
                  : i + 1 > currentStep
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
