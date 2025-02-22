import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { logoGoogle } from 'ionicons/icons';

interface GoogleSignInButtonProps {
  onClick: () => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onClick }) => {
  return (
    <IonButton
      expand="block"
      color="primary"
      onClick={onClick}
      style={{ backgroundColor: '#4285F4', color: 'white', fontSize: '1.2em' }}
    >
      <IonIcon slot="start" icon={logoGoogle} style={{ color: 'white' }} />
      Sign In with Google
    </IonButton>
  );
};

export default GoogleSignInButton;