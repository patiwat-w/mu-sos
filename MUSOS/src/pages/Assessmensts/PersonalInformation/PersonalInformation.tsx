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
  IonSegmentButton,
  IonGrid, // Add IonGrid
  IonTitle
} from '@ionic/react';
import { save, closeCircle, lockClosed, eye,calendar, arrowDown, arrowUp, create } from 'ionicons/icons';
import Header from '../../../components/Header';
import { useHistory, useParams } from 'react-router-dom';
import { ISubject } from '../../../types/subject.type';
import { subjectInfoManagementService } from '../../../services/subjectInfoManagementService';
import HorizontalStepIndicator from '../../../components/HorizontalStepIndicator';
import { getSteps } from './stepsConfig';
import { da } from 'date-fns/locale';
import { addYears } from 'date-fns';
import SubjectProfileHeader from '../../../components/SubjectProfileHeader';
import ToggleButtonGroupDynamic from '../../../components/ToggleButtonGroupDynamic';

interface PersonalInformationPageProps {
    className?: string;
}

const PersonalInformationPage: React.FC<PersonalInformationPageProps> = ({ className }) => {
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

  const [showModal, setShowModal] = useState(false); // State สำหรับควบคุมการแสดง Modal
  const [showOnsetModal, setShowOnsetModal] = useState(false); // State for Onset Time modal
  const [showLastSeenModal, setShowLastSeenModal] = useState(false); // State for Last Seen Time modal

  const history = useHistory();
    const [comorbidities, setComorbidities] = useState({
        hypertension: 'Default',
        diabetes: 'Yes',
        hyperlipidemia: 'Default',
        heartDisease: 'Default',
        previousStroke: 'Yes',
    });

    const [symptoms, setSymptoms] = useState({
        speechDifficulties: 'Default',
        facialDrooping: 'Yes',
        visualProblems: 'Default',
        armLt: 'Yes',
        armRt: 'Default',
        legLt: 'Default',
        legRt: 'Yes',
    });

  

  const [nhiss, setNhiss] = useState('');
  const [preMrs, setPreMrs] = useState('');

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

  const incrementAge = () => {
    setAge((prevAge) => (prevAge ? (parseInt(prevAge) + 1).toString() : '1'));
  };

  const decrementAge = () => {
    setAge((prevAge) => (prevAge && parseInt(prevAge) > 0 ? (parseInt(prevAge) - 1).toString() : '0'));
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




    const createOptions = (selectedValue: string) => [
        { label: 'UN', value: 'UN', selected: selectedValue === 'UN' },
        { label: 'Yes', value: 'Yes', selected: selectedValue === 'Yes' },
        { label: 'No', value: 'No', selected: selectedValue === 'No' }
        
    ];

    const titleStyle = { textAlign: 'center', marginTop: '16px', fontSize: '1.2rem' };
    const labelStyle = { width: '150px', minWidth: '150px' };

  function handleSegmentChange(value: string): void {
    throw new Error('Function not implemented.');
  }
  const handleComorbidityChange = (key: keyof typeof comorbidities, value: string) => {
    setComorbidities({ ...comorbidities, [key]: value });
};

const handleSymptomChange = (key: keyof typeof symptoms, value: string) => {
    setSymptoms({ ...symptoms, [key]: value });
};
function handleNhiss(event: any): void {
  // Add navigation logic here
  history.push('/nhiss');
}

  return (
    <IonPage>
      <Header title="Subject Info" />
      <IonContent fullscreen>
      <SubjectProfileHeader 
                    subject={subject} 
                    selectedSegment={"Subject"}
                />
                   <IonItem><IonTitle >Personal Info</IonTitle></IonItem>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel style={{ minWidth: '100px' }}>Subject ID</IonLabel>
                <IonInput
                  placeholder="Subject ID"
                  readonly
                  value={subject?.id || ''}
                  style={{ maxWidth:'350px' ,height: '40px',flex: '1', backgroundColor: '#f8f8f8' , justifyContent: 'flex-end' }}
                  fill="solid"
                >
                  <IonIcon slot="end" icon={lockClosed} aria-hidden="true"></IonIcon>
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonItem onClick={() => setShowModal(true)}>
                <IonLabel>Date of Birth</IonLabel>
                <IonDatetime
                  id="dobPicker"
                  value={dob}
                  presentation="date"
                  preferWheel={true}
                  style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  className="small-font" // Add class for font size
                  onIonChange={(e) => {
                    const selectedDate = Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value || '';
                    setDob(selectedDate);
                    setShowModal(false);
                  }}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel style={{ minWidth: '100px' }}>Age (yy year old)</IonLabel>
                <IonInput
                  labelPlacement="stacked"
                  value={age}
                  placeholder="Automatically calculated"
                  style={{ padding:"10px",maxWidth:'280px' ,height: '40px',flex: '1', backgroundColor: '#f8f8f8' , justifyContent: 'flex-end' }}
                  fill="solid"
                />
                <IonButton fill="clear" onClick={decrementAge}>
                  <IonIcon slot="icon-only" icon={arrowDown} aria-hidden="true"></IonIcon>
                </IonButton>
                <IonButton fill="clear" onClick={incrementAge}>
                  <IonIcon slot="icon-only" icon={arrowUp} aria-hidden="true"></IonIcon>
                </IonButton>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel>Gender</IonLabel>
                <IonSegment
                  value={gender}
                  onIonChange={(e) => setGender(e.detail.value as string)}
                  style={{ maxWidth:'350px' ,height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                  <IonSegmentButton value="Unspecified" style={{ flex: '1' }}>
                    <IonLabel>ไม่ระบุ</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="Male" style={{ flex: '1' }}>
                    <IonLabel>เพศชาย</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="Female" style={{ flex: '1' }}>
                    <IonLabel>เพศหญิง</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonItem onClick={() => setShowOnsetModal(true)}  style={{ fontSize: '0.5em' }} >
                <IonLabel  >Onset Time</IonLabel>
                <IonDatetime
                  id="onsetPicker"
                  value={onsetTime}
                  presentation="date-time"
                  preferWheel={true}
                  style={{ width:'50%' ,maxWidth:'280px' ,height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  className="small-font" // Add class for font size
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonItem onClick={() => setShowLastSeenModal(true)}>
                <IonLabel>Last Seen Normal Time</IonLabel>
                <IonDatetime
                  id="lastSeenPicker"
                  value={lastSeenTime}
                  presentation="date-time"
                  preferWheel={true}
                  style={{ width:'50%' ,height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  className="small-font" // Add class for font size
                />
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonModal style={modalStyle} isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonDatetime
            id="modalDobPicker"
            value={dob}
            presentation="date"
            preferWheel={true}
            title="Select Date of Birth"
            className="small-font" // Add class for font size
            onIonChange={(e) => {
              const selectedDate = Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value || '';
              setDob(selectedDate);
              setShowModal(false);
            }}
            showDefaultButtons={true}
          />
        </IonModal>
        <IonModal style={modalStyle} isOpen={showOnsetModal} onDidDismiss={() => setShowOnsetModal(false)}>
          <IonDatetime
            id="modalOnsetPicker"
            value={onsetTime}
            presentation="date-time"
            preferWheel={true}
            title="Select Onset Time"
            className="small-font" // Add class for font size
            onIonChange={(e) => {
              const selectedTime = Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value || '';
              setOnsetTime(selectedTime);
              setShowOnsetModal(false);
            }}
            showDefaultButtons={true}
          />
        </IonModal>
        <IonModal style={modalStyle} isOpen={showLastSeenModal} onDidDismiss={() => setShowLastSeenModal(false)}>
          <IonDatetime
            id="modalLastSeenPicker"
            value={lastSeenTime}
            presentation="date-time"
            preferWheel={true}
            title="Select Last Seen Normal Time"
            className="small-font" // Add class for font size
            onIonChange={(e) => {
              const selectedTime = Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value || '';
              setLastSeenTime(selectedTime);
              setShowLastSeenModal(false);
            }}
            showDefaultButtons={true}
          />
        </IonModal>
        
    
       
        <IonItem><IonTitle >Comorbidity</IonTitle></IonItem>
<IonItem>
    <IonLabel style={labelStyle}>Hypertension</IonLabel>
    <ToggleButtonGroupDynamic
        options={createOptions(comorbidities.hypertension)}
        onChange={(value) => handleComorbidityChange('hypertension', value)}
    />
</IonItem>

<IonItem>
    <IonLabel style={labelStyle}>Diabetes mellitus</IonLabel>
    <ToggleButtonGroupDynamic
        options={createOptions(comorbidities.diabetes)}
        onChange={(value) => handleComorbidityChange('diabetes', value)}
    />
</IonItem>

<IonItem>
    <IonLabel style={labelStyle}>Hyperlipidemia</IonLabel>
    <ToggleButtonGroupDynamic
        options={createOptions(comorbidities.hyperlipidemia)}
        onChange={(value) => handleComorbidityChange('hyperlipidemia', value)}
    />
</IonItem>

<IonItem>
    <IonLabel style={labelStyle}>Heart disease</IonLabel>
    <ToggleButtonGroupDynamic
        options={createOptions(comorbidities.heartDisease)}
        onChange={(value) => handleComorbidityChange('heartDisease', value)}
    />
</IonItem>

<IonItem>
    <IonLabel style={labelStyle}>Previous Stroke or TIA</IonLabel>
    <ToggleButtonGroupDynamic
        options={createOptions(comorbidities.previousStroke)}
        onChange={(value) => handleComorbidityChange('previousStroke', value)}
    />
</IonItem>
<IonItem><IonTitle >Current Symptoms and Signs</IonTitle></IonItem>


<IonItem>
    <IonLabel style={labelStyle}>Speech difficulties</IonLabel>
    <ToggleButtonGroupDynamic
        options={createOptions(symptoms.speechDifficulties)}
        onChange={(value) => handleSymptomChange('speechDifficulties', value)}
    />
</IonItem>

<IonItem>
    <IonLabel style={labelStyle}>Facial drooping</IonLabel>
    <ToggleButtonGroupDynamic
        options={createOptions(symptoms.facialDrooping)}
        onChange={(value) => handleSymptomChange('facialDrooping', value)}
    />
</IonItem>

<IonItem>
    <IonLabel style={labelStyle}>Visual problems</IonLabel>
    <ToggleButtonGroupDynamic
        options={createOptions(symptoms.visualProblems)}
        onChange={(value) => handleSymptomChange('visualProblems', value)}
    />
</IonItem>

<IonTitle style={titleStyle}>Arm/Leg Weakness</IonTitle>

<IonRow>
    <IonCol>
        <IonItem>
            <IonLabel style={labelStyle}>Arm.Lt</IonLabel>
            <ToggleButtonGroupDynamic
                options={createOptions(symptoms.armLt)}
                onChange={(value) => handleSymptomChange('armLt', value)}
            />
        </IonItem>
    </IonCol>
    <IonCol>
        <IonItem>
            <IonLabel style={labelStyle}>Arm.Rt</IonLabel>
            <ToggleButtonGroupDynamic
                options={createOptions(symptoms.armRt)}
                onChange={(value) => handleSymptomChange('armRt', value)}
            />
        </IonItem>
    </IonCol>
</IonRow>

<IonRow>
    <IonCol>
        <IonItem>
            <IonLabel style={labelStyle}>Leg.Lt</IonLabel>
            <ToggleButtonGroupDynamic
                options={createOptions(symptoms.legLt)}
                onChange={(value) => handleSymptomChange('legLt', value)}
            />
        </IonItem>
    </IonCol>
    <IonCol>
        <IonItem>
            <IonLabel style={labelStyle}>Leg.Rt</IonLabel>
            <ToggleButtonGroupDynamic
                options={createOptions(symptoms.legRt)}
                onChange={(value) => handleSymptomChange('legRt', value)}
            />
        </IonItem>
    </IonCol>
</IonRow>

<IonTitle style={titleStyle}>NHISS and Pre mRS</IonTitle>

<IonItem>
    <IonLabel>NHISS (max 42)</IonLabel>
    <IonInput
        value={nhiss}
        onIonChange={(e) => setNhiss(e.detail.value!)}
        placeholder="max 42"
        style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
    ></IonInput>
    <IonButton fill="clear" onClick={handleNhiss}>
        <IonIcon icon={create} />
    </IonButton>
</IonItem>

<IonItem>
    <IonLabel>Pre mRS</IonLabel>
    <IonInput
        value={preMrs}
        onIonChange={(e) => setPreMrs(e.detail.value!)}
        placeholder=""
        style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
    ></IonInput>
</IonItem>

      </IonContent>
      <IonFooter>

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

</IonFooter>
    </IonPage>

  );
};

export default PersonalInformationPage;