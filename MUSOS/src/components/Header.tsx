import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonIcon } from '@ionic/react';
import { home, personCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { userSessionService } from '../services/UserSessionService'; // Import user session service

const Header: React.FC<{ title: string }> = ({ title }) => {
  const history = useHistory();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null); // เพิ่ม state สำหรับ photoUrl
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false); // เพิ่ม state สำหรับตรวจสอบการโหลดหน้า

  useEffect(() => {
    userSessionService.getSession().then(user => {
      if (user) {
        setPhotoUrl(user.photoURL ?? null); // ตั้งค่า photoUrl
      }
    });
  }, []);

  useEffect(() => {
    // ฟังการเปลี่ยน URL
    const unlisten = history.listen((location) => {
      if (location.pathname === '/home') {
        setIsPageLoaded(false); // Reset page loaded state
        setTimeout(() => {
          if (!isPageLoaded) {
            window.location.reload(); // รีเฟรชหน้าใหม่ถ้าหน้ายังค้าง
          }
        }, 1000); // ตรวจสอบหลังจาก 1 วินาที
      }
    });

    // ล้าง listener เมื่อ component ถูก unmount
    return () => {
      unlisten();
    };
  }, [history, isPageLoaded]);

  useEffect(() => {
    setIsPageLoaded(true); // ตั้งค่าเมื่อ component ถูกโหลด
  }, []);

  const handleHomeClick = () => {
    history.push('/home');
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
          <IonIcon icon={home} />
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

export default Header;
