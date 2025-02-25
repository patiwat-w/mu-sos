import React from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './HorizontalStepIndicator.css';

interface StepConfig {
  label: string;
  url: string;
}

interface HorizontalStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: StepConfig[];
}

const HorizontalStepIndicator: React.FC<HorizontalStepIndicatorProps> = ({ currentStep, totalSteps, steps }) => {
  const history = useHistory();

  const handleStepClick = (url: string) => {
    history.push(url);
  };

  return (
    <IonGrid>
      <IonRow>
        {Array.from({ length: totalSteps }, (_, index) => (
          <IonCol
            key={index}
            className={`step ${index + 1 <= currentStep ? 'active' : ''}`}
            onClick={() => handleStepClick(steps[index]?.url || '#')}
          >
            {steps[index]?.label || `Step ${index + 1}`}
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default HorizontalStepIndicator;