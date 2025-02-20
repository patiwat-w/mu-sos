import React, { useEffect, useState } from 'react';
import {
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonMenuButton

} from '@ionic/react';
import { IonAvatar, IonLabel,  IonSegment, IonSegmentButton, } from '@ionic/react';
import { createOutline, locationOutline, mailOutline, callOutline, cameraOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { personCircle, settings, helpCircle, addCircle, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { userSessionService } from '../services/UserSessionService';
import './HomePage.css';

const menuConfig = [
    { icon: addCircle, label: 'New Collection', target: '/consent' },
    { icon: personCircle, label: 'Subject List', target: '/subject-list' },
    { icon: settings, label: 'Settings', target: '/settings' },
    { icon: helpCircle, label: 'Help', target: '/help' }
];

const HomePage: React.FC = () => {
    const history = useHistory();
    const [user, setUser] = useState<any>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null); // เพิ่ม state สำหรับ photoUrl

    useEffect(() => {
        const sessionUser = userSessionService.getSession();
        if (sessionUser) {
            setUser(sessionUser);
        } else {
            history.push('/login');
        }

       
            if (sessionUser) {
              //setProfileImage(user.profileImage || 'default-profile-image.jpg'); // ตั้งค่า profileImage
              setPhotoUrl(sessionUser.photoURL ?? null); // ตั้งค่า photoUrl
            }
    }, [history]);

    const handleSignOut = () => {
        console.log('Sign out clicked');
        userSessionService.clearSession();
        history.push('/login');
    };

    return (
        <IonContent>
          {/* Header Section */}
          <IonHeader>
            <IonToolbar>
              <IonTitle>MSU Triage</IonTitle>
              <IonButton slot="end" onClick={handleSignOut}>
                <IonIcon icon={logOutOutline} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
    
          {/* Profile Card */}
          <div className="profile-card">
            <IonAvatar>
              <img src={photoUrl || 'default-profile-image.jpg'} alt="Profile" />
            </IonAvatar>
            <IonLabel>{user?.displayName || 'Guest User'}</IonLabel>
            <IonLabel>{user?.email || ''} | {user?.location || 'User'}</IonLabel>
    
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <IonLabel>{user?.subjectsCount || 99}</IonLabel>
                  <IonButton>Subjects</IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonLabel>{user?.normalCount || 99}</IonLabel>
                  <IonButton>Submit</IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonLabel>{user?.riskCount || 99}</IonLabel>
                  <IonButton>Result</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
    
            {/* Optional: Member Since */}
            <IonLabel class="member-since">Subjects </IonLabel> 
          </div>
    
          {/* Segment Tabs */}
          <IonSegment>
            <IonSegmentButton value="social">
              <IonLabel>Social</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="polls">
              <IonLabel>Polls</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="cards">
              <IonLabel>Cards</IonLabel>
            </IonSegmentButton>
          </IonSegment>
    
          {/* Content based on selected segment */}
         
    
        </IonContent>
      );
};

export default HomePage;
function setProfileImage(arg0: string | null) {
    throw new Error('Function not implemented.');
}

