import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonIcon } from '@ionic/react';
import { home, personCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { userSessionService } from '../services/UserSessionService'; // Import user session service

const Header: React.FC<{ title: string }> = ({ title }) => {
  const history = useHistory();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null); // เพิ่ม state สำหรับ photoUrl

  useEffect(() => {
    const user = userSessionService.getSession();
    if (user) {
      setPhotoUrl(user.photoURL ?? null); // ตั้งค่า photoUrl
    }
  }, []);

  const handleHomeClick = () => {
    history.push('/select-assessment'); // Redirect to home page
  };

  const handleProfileClick = () => {
    history.push('/user-profile');
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButton slot="start" fill="clear" onClick={handleHomeClick}>
          <IonIcon icon={home} />
        </IonButton>
        
        <IonTitle className="ion-title-custom">{title}</IonTitle>
        
        <IonButton slot="end" fill="clear" onClick={handleProfileClick}>
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

export default Header;
