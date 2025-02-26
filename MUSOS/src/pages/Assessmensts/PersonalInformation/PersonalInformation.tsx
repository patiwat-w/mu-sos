import React, { useEffect, useState } from 'react';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonToggle,
  IonNote,
  IonModal,
  IonDatetime,
  IonIcon,
  IonCol,
  IonRow,
  IonPage,
  IonDatetimeButton,
  IonFabList,
  IonFooter,
  IonList,
  IonSegment,
  IonSegmentButton
} from '@ionic/react';
import { save, closeCircle, lockClosed, eye,calendar } from 'ionicons/icons';
import Header from '../../../components/Header';
import { useHistory, useParams } from 'react-router-dom';
import { ISubject } from '../../../types/subject.type';
import { subjectInfoManagementService } from '../../../services/subjectInfoManagementService';
import HorizontalStepIndicator from '../../../components/HorizontalStepIndicator';
import { getSteps } from './stepsConfig';

const PersonalInformationPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [subject, setSubject] = useState<ISubject | null>(null);
  const [gender, setGender] = useState('Male');
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const [showOnsetPicker, setShowOnsetPicker] = useState(false);
  const [showLastSeenPicker, setShowLastSeenPicker] = useState(false);
  const [dob, setDob] = useState('');
  const [onsetTime, setOnsetTime] = useState('');
  const [lastSeenTime, setLastSeenTime] = useState('');
  const [age, setAge] = useState('');

  const history = useHistory();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
  };

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const data = await subjectInfoManagementService.getData(subjectId);
        setSubject(data);
        setDob(formatDate(data.dateOfBirth || ''));
        setOnsetTime(data.onsetTime || '');
        setLastSeenTime(data.lastSeenNormalTime || '');
        setGender(data.gender || 'Male');
      } catch (error) {
        console.error('Error fetching subject data:', error);
      }
    };

    fetchSubject();
  }, [subjectId]);

  useEffect(() => {
    setAge(calculateAge(dob));
  }, [dob]);

  const handleToggleGender = () => {
    setGender(gender === 'Male' ? 'Female' : 'Male');
  };

  const handleSave = () => {
    // Add your save logic here
    history.push('/health-information');
  };

  const steps = getSteps(subjectId);

  const calculateAge = (dob: string) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return '';
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
  };

  const buttonStyle = {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  const modalStyle = {
    '--background': 'rgba(255, 255, 255, 0.0)',
  };

  return (
    <IonPage>
      <Header title="Subject Information" />
      <IonContent className="ion-padding">
        <HorizontalStepIndicator currentStep={1} totalSteps={steps.length} steps={steps} />
        <IonDatetimeButton datetime="dobPicker"  ></IonDatetimeButton>
        <IonList>
        <IonItem>
          <IonInput
            labelPlacement="stacked"
            label="Subject ID"
            placeholder="Subject ID"
            readonly
            value={subject?.id || ''}
          >
            <IonIcon slot="start" icon={lockClosed} aria-hidden="true"></IonIcon>
          </IonInput>
        </IonItem>

        <IonItem onClick={() => setShowDOBPicker(true)}>
          <IonInput
            labelPlacement="stacked"
            label="Date of Birth (dd/mm/yyyy)"
            value={dob}
            readonly
            placeholder="Select Date"
          >
            <IonIcon slot="start" icon={calendar} aria-hidden="true"></IonIcon>
          </IonInput>
        </IonItem>
        
        <IonModal 
          isOpen={showDOBPicker} 
          onDidDismiss={() => setShowDOBPicker(false)} 
          className="date-picker-modal"
          style={modalStyle}
        >
          <IonDatetime
            id='dobPicker'
            value={dob}
            presentation="date" 
            preferWheel={true}
            showDefaultButtons={true}
            onIonChange={(e) => setDob(Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value || '')}
          ></IonDatetime>
        </IonModal>

        <IonItem>
          <IonInput
            labelPlacement="stacked"
            label="Age (yy year old)"
            value={age}
            readonly
            placeholder="Automatically calculated"
          >
            <IonIcon slot="start" icon={calendar} aria-hidden="true"></IonIcon>
          </IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Gender</IonLabel>
          <IonSegment value={gender} onIonChange={(e) => setGender(e.detail.value!)}>
            <IonSegmentButton value="Male">
              <IonLabel>Male</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Female">
              <IonLabel>Female</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonItem>

        <IonItem  onClick={() => setShowOnsetPicker(true)}>
          <IonInput
            labelPlacement="stacked"
            label="Onset Time"
            value={onsetTime}
            readonly
            placeholder="Select Time"
          >
            <IonIcon slot="start" icon={calendar} aria-hidden="true"></IonIcon>
          </IonInput>
        </IonItem>

        <IonModal 
          isOpen={showOnsetPicker} 
          onDidDismiss={() => setShowOnsetPicker(false)} 
          className="time-picker-modal"
          style={modalStyle}
        >
          <IonDatetime
            presentation="time"
            value={onsetTime}
            onIonChange={(e) => setOnsetTime(Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value || '')}
          ></IonDatetime>
          <IonButton onClick={() => setShowOnsetPicker(false)}>Done</IonButton>
        </IonModal>

        <IonItem  onClick={() => setShowLastSeenPicker(true)}>
          <IonInput
            labelPlacement="stacked"
            label="Last Seen Normal Time"
            value={lastSeenTime}
            readonly
            placeholder="Select Time"
          >
            <IonIcon slot="start" icon={calendar} aria-hidden="true"></IonIcon>
          </IonInput>
        </IonItem>
        </IonList>
        <IonModal 
          isOpen={showLastSeenPicker} 
          onDidDismiss={() => setShowLastSeenPicker(false)} 
          className="time-picker-modal"
          style={modalStyle}
        >
          <IonDatetime
            presentation="time"
            value={lastSeenTime}
            onIonChange={(e) => setLastSeenTime(Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value || '')}
          ></IonDatetime>
          <IonButton onClick={() => setShowLastSeenPicker(false)}>Done</IonButton>
        </IonModal>

        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonCol size="auto" className="ion-text-center">
            <IonButton
              fill="clear"
              style={{ ...buttonStyle, backgroundColor: '#ff4444', color: 'white' }}
            >
              <IonIcon icon={closeCircle} />
            </IonButton>
            <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555' }}>Cancel</p>
          </IonCol>

          <IonCol size="auto" className="ion-text-center">
            <IonButton
              fill="clear"
              style={{ ...buttonStyle, backgroundColor: '#0bcb71', color: 'black' }}
              onClick={handleSave}
            >
              <IonIcon icon={save} />
            </IonButton>
            <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555' }}>Save</p>
          </IonCol>
        </IonRow>

        <IonFooter style={{ backgroundColor: '#f8f8f8', padding: '10px', textAlign: 'center' }}>
          <IonNote className="ion-margin-top">
            <p><strong>Note</strong></p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', textAlign: 'left' }}>
              <li style={{ marginBottom: '5px' }}>If you input "Date of Birth," then "Age" will automatically calculate.</li>
              <li style={{ marginBottom: '5px' }}>Required either "Onset Time" or "Last Seen Normal Time" or both times.</li>
            </ul>
          </IonNote>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default PersonalInformationPage;

