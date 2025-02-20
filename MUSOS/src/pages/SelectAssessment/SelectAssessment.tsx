import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonFooter,
  IonNote,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { checkmarkCircle, helpCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './SelectAssessment.module.css';
import { userSessionService } from '../../services/UserSessionService';
import Header from '../../components/Header';
import AssessmentButton from '../../components/AssessmentButton';

const SelectAssessment: React.FC = () => {
  const history = useHistory();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [menuStatus, setMenuStatus] = useState({
    image: 'normal',
    voice: 'normal',
    info: 'normal',
    result: 'normal',
  });

  useEffect(() => {
    const user = userSessionService.getSession();
    if (user) {
      setPhotoUrl(user.photoURL ?? null);
    }
  }, []);

  const handleImageClick = () => {
    setMenuStatus({ ...menuStatus, image: 'done' });
    history.push('/image-assessment');
  };

  const handleVoiceClick = () => {
    setMenuStatus({ ...menuStatus, voice: 'done' });
    history.push('/voice-assessment');
  };

  const handleInfoClick = () => {
    setMenuStatus({ ...menuStatus, info: 'done' });
    history.push('/personal-information');
  };

  const handleResultClick = () => {
    setMenuStatus({ ...menuStatus, result: 'done' });
    history.push('/result');
  };

  return (
   
    
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="6" className="ion-text-center">
              <AssessmentButton
                label="Image"
                status={menuStatus.image}
                onClick={handleImageClick}
              />
            </IonCol>
            <IonCol size="6" className="ion-text-center">
              <AssessmentButton
                label="Voice"
                status={menuStatus.voice}
                onClick={handleVoiceClick}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6" className="ion-text-center">
              <AssessmentButton
                label="Info"
                status={menuStatus.info}
                onClick={handleInfoClick}
              />
            </IonCol>
            <IonCol size="6" className="ion-text-center">
              <AssessmentButton
                label="Pre-Result"
                status={menuStatus.result}
                onClick={handleResultClick}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      // <IonFooter>
      //   <IonNote className="ion-margin-top">
      //     <ul>
      //       <IonIcon icon={helpCircle} />
      //       Please select the assessment you want to test.
      //     </ul>
      //   </IonNote>
      // </IonFooter>
   
  );
};

export default SelectAssessment;
