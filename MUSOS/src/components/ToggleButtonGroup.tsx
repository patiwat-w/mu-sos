import React from 'react';
import { IonButton, IonButtons } from '@ionic/react';

interface ToggleButtonGroupProps {
  value: string;
  onChange: (value: string) => void;
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({ value, onChange }) => {
  return (
    <IonButtons>
      <IonButton
        fill={value === 'Default' ? 'solid' : 'outline'}
        onClick={() => onChange('Default')}
      >
        N/A
      </IonButton>
      <IonButton
        fill={value === 'Yes' ? 'solid' : 'outline'}
        onClick={() => onChange('Yes')}
      >
        Yes
      </IonButton>
      <IonButton
        fill={value === 'No' ? 'solid' : 'outline'}
        onClick={() => onChange('No')}
      >
        No
      </IonButton>
    </IonButtons>
  );
};

export default ToggleButtonGroup;