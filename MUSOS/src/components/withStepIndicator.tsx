import React from 'react';
import HorizontalStepIndicator from './HorizontalStepIndicator';

interface StepConfig {
  label: string;
  url: string;
}

interface WithStepIndicatorProps {
  currentStep: number;
  steps: StepConfig[];
  title: string; // Add title prop
}

const withStepIndicator = <P extends object>(Component: React.ComponentType<P>, p0: { currentStep: number; steps: { label: string; url: string; }[]; title: string; }) => {
  return (props: P & WithStepIndicatorProps) => {
    const { currentStep, steps, title, ...rest } = props;
    return (
      <>
        {title && <h2>XX{title}</h2>} {/* Render title */}
        {steps && steps.length > 0 && (
          <HorizontalStepIndicator currentStep={currentStep} totalSteps={steps.length} steps={steps} />
        )}
        <Component {...(rest as P)} />
      </>
    );
  };
};

export default withStepIndicator;