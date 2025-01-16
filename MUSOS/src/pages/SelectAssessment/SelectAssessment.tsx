import React from 'react';
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
} from '@ionic/react';
import { home, personCircle, helpCircle, image, mic, informationCircle, checkmarkCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './SelectAssessment.module.css'; // Import CSS สำหรับ Responsive

const SelectAssessment: React.FC = () => {
  const history = useHistory();

  const handleImageClick = () => {
    history.push('/image-assessment'); // Redirect to image-assessment page
  };

  const handleVoiceClick = () => {
    history.push('/voice-assessment'); // Redirect to voice-assessment page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear">
            <IonIcon icon={home} />
          </IonButton>
          <IonTitle style={{ textAlign: 'center' }}>Select Assessment</IonTitle>
          <IonButton slot="end" fill="clear">
            <IonIcon icon={personCircle} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          {/* Row 1 */}
          <IonRow>
            <IonCol size="6" className="ion-text-center">
              <IonButton className="responsive-button btn-image" onClick={handleImageClick}>
                <IonIcon icon={image} className="btn-icon" />
              </IonButton>
            </IonCol>
            <IonCol size="6" className="ion-text-center">
              <IonButton className="responsive-button btn-voice" onClick={handleVoiceClick}>
                <IonIcon icon={mic} className="btn-icon" />
              </IonButton>
            </IonCol>
          </IonRow>
          {/* Row 2 */}
          <IonRow>
            <IonCol size="6" className="ion-text-center">
              <IonButton className="responsive-button btn-info">
                <IonIcon icon={informationCircle} className="btn-icon" />
              </IonButton>
            </IonCol>
            <IonCol size="6" className="ion-text-center">
              <IonButton className="responsive-button btn-result" disabled>
                <IonIcon icon={checkmarkCircle} className="btn-icon" />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
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

export default SelectAssessment;
