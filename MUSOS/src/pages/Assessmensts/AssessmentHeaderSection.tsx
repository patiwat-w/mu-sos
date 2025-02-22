import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonIcon } from '@ionic/react';
import { arrowBack, home, personCircle } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import { userSessionService } from '../../services/UserSessionService'; // Import user session service
const AssessmentHeaderSection: React.FC<{ title: string }> = ({ title }) => {
  const history = useHistory();
  const { subjectId } = useParams<{ subjectId: string }>();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null); // เพิ่ม state สำหรับ photoUrl

  useEffect(() => {
    userSessionService.getSession().then(user => {
      if (user) {
        setPhotoUrl(user.photoURL ?? null); // ตั้งค่า photoUrl
      }
    });
  }, []);

  const handleHomeClick = () => {
    // return to subject profile page
    history.push('/subject-profile/'+subjectId);

   
  };

  const handleProfileClick = () => {
    history.push('/user-profile');
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButton 
          slot="start" 
          fill="clear" 
          onClick={handleHomeClick}
          style={{ 
            '--background': 'white',
            '--color': '#3880ff'
          }}
        >
          <IonIcon icon={arrowBack} />
        </IonButton>
        
        <IonTitle className="ion-title-custom">{title}</IonTitle>
        
        <IonButton 
          slot="end" 
          fill="clear" 
          onClick={handleProfileClick}
          style={{ 
            '--background': 'white',
            '--color': '#3880ff'
          }}
        >
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" style={{ borderRadius: '50%', width: '32px', height: '32px' }} />
          ) : (
            <IonIcon icon={personCircle} />
          )}
        </IonButton>
      </IonToolbar>
    </IonHeader>
  );
};

export default AssessmentHeaderSection;
