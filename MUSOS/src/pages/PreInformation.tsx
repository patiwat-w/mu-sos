import React, { useState } from 'react';
import {
  IonPage,
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
  IonAlert,
} from '@ionic/react';
import { home, personCircle, calendar } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { apiSubjectDataService } from '../services/apiSubjectDataService';
import { userSessionService } from '../services/UserSessionService';
import Header from '../components/Header';
import { ISubject } from '../types/subject.type';
import { set } from 'date-fns';

const PreInformation: React.FC = () => {
  const history = useHistory();
  const [subjectId, setSubjectId] = useState('');
  const [hn, setHn] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [onsetTime, setOnsetTime] = useState('');
  const [lastSeenNormalTime, setLastSeenNormalTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showOnsetPicker, setShowOnsetPicker] = useState(false);
  const [showLastSeenPicker, setShowLastSeenPicker] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const user = await userSessionService.checkUserSession();
      let formData = {
        //id: 1, // Replace 1 with the appropriate integer value for id
        subjectId,
        subjectName: 'N/A', // Add appropriate value for subjectName
        hn,
        phoneNumber,
        onsetTime,
        lastSeenNormalTime,
        firstName: "",
        lastName: "",
        createdDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
        createdBy: ""+user.displayName,
        modifiedBy: ""+user.displayName,
        stateCode: 0
      };
      console.log('Submit:', formData);
      let response = await apiSubjectDataService.postData(formData);
      set
      let newSubject : ISubject = await response.json(); // Parse the JSON from the response
      console.log('Response:', newSubject);
      setIsLoading(false);
      if(!newSubject?.id){
        alert("Can't get subject id");
        return;
      }else{
        history.push('/subject-profile/' + newSubject.id);
      }
    
    } catch (error : any) {
      setIsLoading(false);
      setError(""+error?.message);
      console.error('Error submitting data:', error);
    }
  };

  const handleCancel = () => {
    location.href = '/home';
  }

  return (
    <IonPage>
      <Header title='Pre-Information' />
      <IonContent className="ion-padding">
        <IonLoading isOpen={isLoading} message={'Please wait...'} />
        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          header={'Error'}
          message={error || ''}
          buttons={['OK']}
        />
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
          <IonButton color="primary" onClick={handleCancel} style={{ flex: 1, marginRight: '10px' }}>
            Cancel
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
