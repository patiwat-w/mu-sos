import React from 'react';
import { IonButton } from '@ionic/react';

interface AssessmentButtonProps {
  label: string;
  status: string;
  onClick: () => void;
  disabled?: boolean;
}

const AssessmentButton: React.FC<AssessmentButtonProps> = ({ label, status, onClick, disabled }) => {
  return (
    <IonButton
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        backgroundColor: disabled ? '#d3d3d3' : '#3880ff',
        color: 'white',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        marginBottom: '10px',
      }}
    >
      {label}
    </IonButton>
  );
};

export default AssessmentButton;
