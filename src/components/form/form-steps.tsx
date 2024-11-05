import { nanoid } from 'nanoid'
import { StepIndicator } from '../steps/step-indicator'
import { Check } from 'lucide-react'
import { ProgressIndicator } from '../steps/progress-indicator'
import { Icon } from '../icon'
import React from 'react'

type FormStepsProps = {
  numberOfSteps: number
  currentStep: number
}

export function FormSteps({ numberOfSteps, currentStep }: FormStepsProps) {
  return (
    <div className="flex justify-center items-center gap-1">
      {[...Array(numberOfSteps)].map((_, i) => (
        <React.Fragment key={`step-progress-${nanoid(1)}`}>
          <StepIndicator style={i > currentStep ? 'future' : 'default'}>
            {i >= currentStep ? i + 1 : <Icon icon={Check} state="light" />}
          </StepIndicator>
          {i + 1 < numberOfSteps && (
            <ProgressIndicator
              style={
                i === currentStep
                  ? 'current'
                  : i > currentStep
                    ? 'future'
                    : 'default'
              }
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
