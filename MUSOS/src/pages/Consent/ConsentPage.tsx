import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButton } from '@ionic/react';

const ConsentPage: React.FC = () => {
    const history = useHistory();
    
    const handleAccept = () => {
        // Handle accept action and redirect to the pre-information page
        history.push('/pre-information');
        
  
    };
    
    const handleDecline = () => {
        // Handle decline action
        window.location.href="/home";
    };
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Data Collection Consent</IonTitle>
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
                    <IonButton color="danger" onClick={handleDecline}>Decline</IonButton>
                    <IonButton color="success" onClick={handleAccept}>Accept</IonButton>
                    
                </div>
            </IonFooter>
        </IonPage>
    );
};

export default ConsentPage;
