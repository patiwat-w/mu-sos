import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonDatetime,
  IonFooter,
} from '@ionic/react';
import { home, personCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const PreInformation: React.FC = () => {
  const history = useHistory();
  const [subjectId, setSubjectId] = useState('');
  const [hn, setHn] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [onsetTime, setOnsetTime] = useState('');
  const [lastSeenNormalTime, setLastSeenNormalTime] = useState('');

  const handleSubmit = () => {
    console.log('Submit:', {
      subjectId,
      hn,
      phoneNumber,
      onsetTime,
      lastSeenNormalTime,
    });
    // Add navigation logic here
    history.push('/select-assessment');
  };

  const handleHomeClick = () => {
    history.push('/home'); // Redirect to home page
  };

  const handleBack = () => {
    history.push('/login'); // Redirect to home page
    // Add navigation logic here
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear" onClick={handleHomeClick}>
            <IonIcon icon={home} />
          </IonButton>
          <IonTitle style={{ textAlign: 'center' }}>Pre-Information</IonTitle>
          <IonButton slot="end" fill="clear">
            <IonIcon icon={personCircle} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked"></IonLabel>
          <IonInput
            value={subjectId}
            placeholder=" Subject ID"
            onIonChange={(e) => setSubjectId(e.detail.value!)}
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}
          />
        </IonItem>

        <IonItem lines="none" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
          <span style={{ paddingTop: '20px', textAlign: 'center', width: '100%' }}>Or</span>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked"></IonLabel>
          <IonInput
            value={hn}
            placeholder=" HN"
            onIonChange={(e) => setHn(e.detail.value!)}
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}
          />
        </IonItem>

        <IonItem style={{ marginTop: '20px', marginBottom: '20px' }}>
          <IonLabel position="stacked"></IonLabel>
          <IonInput
            value={phoneNumber}
            placeholder=" Phone Number"
            onIonChange={(e) => setPhoneNumber(e.detail.value!)}
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}
          />
        </IonItem>

        <IonItem button onClick={() => setOnsetTime('')}>
          <IonLabel position="stacked"></IonLabel>
          <IonInput
            value={onsetTime}
            readonly
            placeholder=" Onset Time"
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}
          />
        </IonItem>

        <IonItem lines="none" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
          <span style={{ paddingTop: '20px', textAlign: 'center', width: '100%' }}>Or</span>
        </IonItem>

        <IonItem button onClick={() => setLastSeenNormalTime('')}>
          <IonLabel position="stacked"></IonLabel>
          <IonInput
            value={lastSeenNormalTime}
            readonly
            placeholder=" Last Seen Normal Time"
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}
          />
        </IonItem>
      </IonContent>
      <IonFooter>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
          <IonButton color="primary" onClick={handleBack} style={{ flex: 1, marginRight: '10px' }}>
            Back
          </IonButton>
          <IonButton color="primary" onClick={handleSubmit} style={{ flex: 1, marginLeft: '10px' }}>
            Next
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default PreInformation;