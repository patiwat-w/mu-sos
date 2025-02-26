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
  IonDatetimeButton
} from '@ionic/react';
import { save, closeCircle } from 'ionicons/icons';
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
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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
    <IonApp>
      <IonPage>
        <IonHeader>
          <Header title="Subject Information" />
        </IonHeader>
        <IonContent className="ion-padding">
        <HorizontalStepIndicator currentStep={1} totalSteps={steps.length} steps={steps} />
        <IonDatetimeButton datetime="dobPicker"  ></IonDatetimeButton>
          <IonItem>
            <IonLabel position="stacked">Subject ID</IonLabel>
            <IonInput
              value={subject?.id || ''}
              readonly
              placeholder="Enter Subject ID"
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}
            ></IonInput>
          </IonItem>

          <IonItem button onClick={() => setShowDOBPicker(true)}>
            <IonLabel position="stacked">Date of Birth (dd/mm/yyyy)</IonLabel>
            <IonInput value={dob} readonly placeholder="Select Date" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}></IonInput>
          </IonItem>
          
          <IonModal 
          isOpen={showDOBPicker} 
          onDidDismiss={() => setShowDOBPicker(false)} 
          className="date-picker-modal"
          style={modalStyle}
          >
            <IonDatetime
              id='dobPicker'
               value="2023-11-02T01:22:00"
              //preferWheel={true}
              presentation="date-time"
             // value={dob}
              showDefaultButtons={true}
              onIonChange={(e) => setDob(Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value || '')}
            ></IonDatetime>
          </IonModal>

          <IonItem>
            <IonLabel position="stacked">Age (yy year old)</IonLabel>
            <IonInput
              value={subject ? calculateAge(subject.dateOfBirth) : ''}
              readonly
              placeholder="Automatically calculated"
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Gender</IonLabel>
            <IonToggle
              checked={gender === 'Male'}
              onIonChange={handleToggleGender}
            ></IonToggle>
            <IonLabel>{gender}</IonLabel>
          </IonItem>

          <IonItem button onClick={() => setShowOnsetPicker(true)}>
            <IonLabel position="stacked">Onset Time</IonLabel>
            <IonInput value={onsetTime} readonly placeholder="Select Time" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}></IonInput>
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

          <IonItem button onClick={() => setShowLastSeenPicker(true)}>
            <IonLabel position="stacked">Last Seen Normal Time</IonLabel>
            <IonInput value={lastSeenTime} readonly placeholder="Select Time" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}></IonInput>
          </IonItem>

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

          <IonNote className="ion-margin-top">
            <p>Note:</p>
            <ul>
              <li>If you input "Date of Birth," then "Age" will automatically calculate.</li>
              <li>Required either "Onset Time" or "Last Seen Normal Time" or both times.</li>
            </ul>
          </IonNote>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default PersonalInformationPage;

