import React from 'react';
import { IonButton, IonIcon, IonLabel } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';

interface AssessmentButtonProps {
  label: string;
  status: string;
  onClick: () => void;
}

const AssessmentButton: React.FC<AssessmentButtonProps> = ({ label, status, onClick }) => {
  return (
    <IonButton className="responsive-button" onClick={onClick} style={{ display: 'block', position: 'relative' }}>
      <IonLabel className="icon-text">{label}</IonLabel>
      {status === 'done' && <IonIcon icon={checkmarkCircle} style={{ color: 'green', position: 'absolute', bottom: '5px', right: '5px' }} />}
    </IonButton>
  );
};

export default AssessmentButton;
