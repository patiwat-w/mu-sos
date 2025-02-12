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
  IonLoading,
  IonModal,
} from '@ionic/react';
import { home, personCircle, calendar } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { apiSubjectDataService } from '../services/apiSubjectDataService';

const PreInformation: React.FC = () => {
  const history = useHistory();
  const [subjectId, setSubjectId] = useState('');
  const [hn, setHn] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [onsetTime, setOnsetTime] = useState('');
  const [lastSeenNormalTime, setLastSeenNormalTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showOnsetPicker, setShowOnsetPicker] = useState(false);
  const [showLastSeenPicker, setShowLastSeenPicker] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    let formData = { subjectId, hn, phoneNumber, onsetTime, lastSeenNormalTime };
    console.log('Submit:', formData);
    try {
      let res = await apiSubjectDataService.postData(formData);
      setIsLoading(false);
      history.push('/select-assessment');
    } catch (error) {
      setIsLoading(false);
      console.error('Error submitting data:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear" onClick={() => history.push('/home')}>
            <IonIcon icon={home} />
          </IonButton>
          <IonTitle style={{ textAlign: 'center' }}>Pre-Information</IonTitle>
          <IonButton slot="end" fill="clear">
            <IonIcon icon={personCircle} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading isOpen={isLoading} message={'Please wait...'} />
        <IonItem>
          <IonLabel position="stacked" style={{ textAlign: 'left' }}>Subject ID</IonLabel>
          <IonInput value={subjectId} placeholder="Subject ID" onIonChange={(e) => setSubjectId(e.detail.value!)} style={{ textAlign: 'right' }} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked" style={{ textAlign: 'left' }}>HN</IonLabel>
          <IonInput value={hn} placeholder="HN" onIonChange={(e) => setHn(e.detail.value!)} style={{ textAlign: 'right' }} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked" style={{ textAlign: 'left' }}>Phone Number</IonLabel>
          <IonInput value={phoneNumber} placeholder="Phone Number" onIonChange={(e) => setPhoneNumber(e.detail.value!)} style={{ textAlign: 'right' }} />
        </IonItem>

        {/* Onset Time Picker */}
        <IonItem>
          <IonLabel position="stacked" style={{ textAlign: 'left' }}>Onset Time</IonLabel>
          <IonInput
            value={onsetTime ? new Date(onsetTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
            placeholder="Onset Time"
            readonly
            onClick={() => setShowOnsetPicker(true)}
            style={{ textAlign: 'right' }}
          />
          <IonIcon icon={calendar} slot="end" onClick={() => setShowOnsetPicker(true)} />
        </IonItem>
        <IonModal isOpen={showOnsetPicker}>
          <IonDatetime
            value={onsetTime}
            presentation="time"
            onIonChange={(e) => setOnsetTime(e.detail.value as string)}
          />
          <IonButton expand="full" onClick={() => setShowOnsetPicker(false)}>Set</IonButton>
        </IonModal>

        {/* Last Seen Normal Time Picker */}
        <IonItem>
          <IonLabel position="stacked" style={{ textAlign: 'left' }}>Last Seen Normal Time</IonLabel>
          <IonInput
            value={lastSeenNormalTime}
            placeholder="Last Seen Normal Time"
            readonly
            onClick={() => setShowLastSeenPicker(true)}
            style={{ textAlign: 'right' }}
          />
          <IonIcon icon={calendar} slot="end" onClick={() => setShowLastSeenPicker(true)} />
        </IonItem>
        <IonModal isOpen={showLastSeenPicker}>
          <IonDatetime
            value={lastSeenNormalTime}
            presentation="date-time"
            onIonChange={(e) => setLastSeenNormalTime(e.detail.value as string)}
          />
          <IonButton expand="full" onClick={() => setShowLastSeenPicker(false)}>Set</IonButton>
        </IonModal>
      </IonContent>
      
      <IonFooter>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
          <IonButton color="primary" onClick={() => history.push('/login')} style={{ flex: 1, marginRight: '10px' }}>
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
