import React from 'react';
import { IonSpinner } from '@ionic/react';
import { useLoading } from '../contexts/LoadingContext';

const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div style={overlayStyle}>
      <IonSpinner name="dots" style={spinnerStyle} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const spinnerStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
};

export default LoadingOverlay;
