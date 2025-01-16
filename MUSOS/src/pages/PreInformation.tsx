import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonFooter,
  IonIcon,
} from '@ionic/react';
import { timeOutline, helpCircle } from 'ionicons/icons';

const PreInformation: React.FC = () => {
  const [subjectId, setSubjectId] = useState('');
  const [hn, setHn] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [onsetTime, setOnsetTime] = useState('');
  const [lastSeenNormalTime, setLastSeenNormalTime] = useState('');

  const handleNext = () => {
    console.log('Go to the next step with:', {
      subjectId,
      hn,
      phoneNumber,
      onsetTime,
      lastSeenNormalTime,
    });
    // Add navigation logic here
  };

  const handleBack = () => {
    console.log('Go back');
    // Add navigation logic here
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pre-Information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Subject ID</IonLabel>
          <IonInput
            value={subjectId}
            onIonChange={(e) => setSubjectId(e.detail.value!)}
          />
        </IonItem>
        <p style={{ textAlign: 'center', margin: '10px 0' }}>or</p>
        <IonItem>
          <IonLabel position="floating">HN (Optional)</IonLabel>
          <IonInput value={hn} onIonChange={(e) => setHn(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Phone Number</IonLabel>
          <IonInput
            type="tel"
            value={phoneNumber}
            onIonChange={(e) => setPhoneNumber(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Onset Time</IonLabel>
          <IonInput
            type="time"
            value={onsetTime}
            onIonChange={(e) => setOnsetTime(e.detail.value!)}
          />
          <IonIcon slot="end" icon={timeOutline} />
        </IonItem>
        <p style={{ textAlign: 'center', margin: '10px 0' }}>or</p>
        <IonItem>
          <IonLabel position="floating">Last Seen Normal Time</IonLabel>
          <IonInput
            type="time"
            value={lastSeenNormalTime}
            onIonChange={(e) => setLastSeenNormalTime(e.detail.value!)}
          />
          <IonIcon slot="end" icon={timeOutline} />
        </IonItem>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <IonButton color="primary" onClick={handleBack}>
            &lt;&lt; Back
          </IonButton>
          <IonButton color="primary" onClick={handleNext}>
            Next &gt;&gt;
          </IonButton>
        </div>
      </IonContent>
      <IonFooter>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <IonButton fill="clear" color="medium">
            <IonIcon icon={helpCircle} />
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default PreInformation;
