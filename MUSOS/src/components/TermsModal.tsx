import React from 'react';
import { IonModal, IonContent, IonButton, IonFooter } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { h } from 'ionicons/dist/types/stencil-public-runtime';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
    const history = useHistory();

    function handleAccept(event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>): void {
        onClose();
        history.push('/login', { accepted: true });
    }

    function handleDecline(event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>): void {
        onClose();
        history.push('/login', { accepted: false });
    }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} >
     
            <IonContent className="ion-padding" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="agreement-container">
                <p>
                  Dear User, <br />
                  We would like to inform you about the collection and usage of your data for research purposes. By using this application, you agree to
                  the following terms:
                </p>
                <ul>
                  <li><strong>Purpose of Data Collection:</strong> Your data will be collected solely for the purpose of improving stroke research.</li>
                  <li><strong>Data Collected:</strong> Personal information, usage data, and device information.</li>
                  <li><strong>Data Protection:</strong> Your data will be anonymized and stored securely.</li>
                  <li><strong>Voluntary Participation:</strong> You have the right to decline or withdraw your consent.</li>
                </ul>
                <p>
                  By clicking "Accept," you agree to the terms outlined in this agreement. If you do not agree, you may click "Decline" to exit the
                  application.
                </p>
                <p>Thank you for your cooperation.</p>
              </div>
            </IonContent>
            <IonFooter>
              <div className="agreement-footer">
                <IonButton color="success" onClick={handleAccept}>Accept</IonButton>
                <IonButton color="danger" onClick={handleDecline}>Decline</IonButton>
              </div>
            </IonFooter>
          
    </IonModal>
  );
};

export default TermsModal;
