import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';

interface FormStepProps {
  step: number;
  children: React.ReactNode;
}

const FormStep: React.FC<FormStepProps> = ({ step, children }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Step {step}</IonCardTitle>
      </IonCardHeader>
      {children}
    </IonCard>
  );
};

export default FormStep;
