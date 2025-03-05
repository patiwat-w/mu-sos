import React from 'react';
import { IonAlert } from '@ionic/react';
import { useAlert } from '../contexts/AlertContext';

const AlertService: React.FC = () => {
  const { isAlertOpen, alertMessage, alertHeader, hideAlert, isConfirmOpen, confirmMessage, confirmHeader, onConfirm, onCancel, hideConfirm } = useAlert();

  return (
    <>
      <IonAlert
        isOpen={isAlertOpen}
        onDidDismiss={hideAlert}
        header={alertHeader}
        message={alertMessage}
        buttons={['OK']}
      />
      <IonAlert
        isOpen={isConfirmOpen}
        onDidDismiss={hideConfirm}
        header={confirmHeader}
        message={confirmMessage}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: onCancel
          },
          {
            text: 'OK',
            handler: onConfirm
          }
        ]}
      />
    </>
  );
};

export default AlertService;
