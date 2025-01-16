import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonFooter,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Agreement.css'; // Import the CSS file

const Agreement: React.FC = () => {
  const history = useHistory();

  const handleAccept = () => {
    // Handle accept action
    history.push('/pre-information'); // Redirect to pre-information page or another page
  };
 
  const handleDecline = () => {
    // Handle decline action
    history.push('/login'); // Redirect to login page or another page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agreement</IonTitle>
        </IonToolbar>
      </IonHeader>
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
    </IonPage>
  );
};

export default Agreement;
