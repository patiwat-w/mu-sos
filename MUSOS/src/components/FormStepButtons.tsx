import React from 'react';
import { IonButton } from '@ionic/react';

interface FormStepButtonsProps {
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
}

const FormStepButtons: React.FC<FormStepButtonsProps> = ({ onNext, onBack, isLastStep }) => {
  return (
    <div>
      <IonButton onClick={onBack} color="secondary">
        Back
      </IonButton>
      <IonButton onClick={onNext} color="primary">
        {isLastStep ? 'Finish' : 'Next'}
      </IonButton>
    </div>
  );
};

export default FormStepButtons;
