import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonFooter,
  IonNote,
  IonLabel,
} from '@ionic/react';
import { home, personCircle, helpCircle, camera, mic, documentText, checkmarkCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './SelectAssessment.module.css'; // Import CSS สำหรับ Responsive
import { userSessionService } from '../../services/UserSessionService'; // Import user session service
import Header from '../../components/Header'; // Import Header component

const SelectAssessment: React.FC = () => {
  const history = useHistory();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null); // เพิ่ม state สำหรับ photoUrl

  useEffect(() => {
    const user = userSessionService.getSession();
    if (user) {
      setPhotoUrl(user.photoURL ?? null); // ตั้งค่า photoUrl
    }
  }, []);

  const handleImageClick = () => {
    history.push('/image-assessment'); // Redirect to image-assessment page
  };

  const handleVoiceClick = () => {
    history.push('/voice-assessment'); // Redirect to voice-assessment page
  };

  const handleSubmit = () => {

    history.push('/select-assessment');
  };

  const handleHomeClick = () => {
    history.push('/home'); // Redirect to home page
  };

  const handleBack = () => {
    history.push('/pre-information'); // Redirect to home page
    // Add navigation logic here
  };

  const handleInfoClick = () => { 
    history.push('/health-information');
  };
  const handleResultClick = () => {
    history.push('/result');
  }

  const handleProfileClick = () => {
   
    history.push('/user-profile');
  };

  return (
    <IonPage>
      <Header title="Select Capture Type" /> {/* ใช้ Header component */}
      <IonContent className="ion-padding">
        <IonGrid>
          {/* Row 1 */}
          <IonRow>
            <IonCol size="6" className="ion-text-center">
              <IonButton className="responsive-button btn-image" onClick={handleImageClick} style={{ display: 'block' }}>
                <IonIcon icon={camera} className="btn-icon" />
                <IonLabel className="icon-text"></IonLabel>
              </IonButton>
            </IonCol>
            <IonCol size="6" className="ion-text-center">
              <IonButton className="responsive-button btn-voice" onClick={handleVoiceClick} style={{ display: 'block' }}>
                <IonIcon icon={mic} className="btn-icon" />
                <IonLabel className="icon-text"></IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
          {/* Row 2 */}
          <IonRow>
            <IonCol size="6" className="ion-text-center">
              <IonButton className="responsive-button btn-info" onClick={handleInfoClick}>
                <IonIcon icon={documentText} className="btn-icon" style={{ display: 'block' }} />
              
                <IonLabel className="icon-text"></IonLabel>
              </IonButton>
            </IonCol>
            <IonCol size="6" className="ion-text-center">
              <IonButton className="responsive-button btn-result" onClick={handleResultClick}>
                <IonIcon icon={checkmarkCircle} className="btn-icon" />
                <IonLabel className="icon-text"></IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonNote className="ion-margin-top">
          <ul>
            <IonIcon icon={helpCircle} />
            Please select the assessment you want to test.
          </ul>
        </IonNote>
      </IonFooter>
    </IonPage>
  );
};
export default SelectAssessment;
