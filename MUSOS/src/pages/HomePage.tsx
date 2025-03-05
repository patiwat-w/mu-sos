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
    IonMenuButton,
    IonPage

} from '@ionic/react';
import { IonAvatar, IonLabel,  IonSegment, IonSegmentButton, } from '@ionic/react';
import { createOutline, locationOutline, mailOutline, callOutline, cameraOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { personCircle, settings, helpCircle, addCircle, logOutOutline, addCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { userSessionService } from '../services/UserSessionService';
import './HomePage.css';
import SubjectList from '../components/SubjectList';

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
        userSessionService.checkUserSession().then(sessionUser => {
            if (sessionUser) {
                //setProfileImage(user.profileImage || 'default-profile-image.jpg'); // ตั้งค่า profileImage
                setPhotoUrl(sessionUser.photoURL ?? null); // ตั้งค่า photoUrl
            }
        });
    }, [history]);

    const handleSignOut = () => {
        console.log('Sign out clicked');
        userSessionService.clearSession();
        history.push('/login');
    };

    const handleAddSubject = () => {
        history.push('/pre-information');
    };

    return (
      //scrollX={false} scrollY={false} no-bounce class="no-scroll" className="ion-padding no-scroll" style={{ overflow: 'hidden' ,height: '100vh',scrollY:false}}
      <IonPage>
        <IonContent scrollY={false} >
            
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
  <div className="profile-header">
    <IonAvatar className="profile-avatar">
      <img src={photoUrl || 'default-profile-image.jpg'} alt="Profile" />
    </IonAvatar>
    <div className="profile-info">
      <span className="profile-name">{user?.displayName || 'Patiwat Wisedsukol'}</span>
      <span className="profile-email-location">{user?.location || 'Researcher'}</span>
    </div>
    <IonButton onClick={handleAddSubject} className="add-subject-button" style={{ marginLeft: 'auto' }}>
      <IonIcon icon={addCircleOutline} />
    </IonButton>
  </div>
</div>




    
          {/* Segment Tabs */}
          <IonSegment>
            <IonSegmentButton value="All" >
              <IonLabel>Subjects</IonLabel>
            </IonSegmentButton>
            {/* <IonSegmentButton value="Pending">
              <IonLabel>Pending</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Submited">
              <IonLabel>Submited</IonLabel>
            </IonSegmentButton> */}
          </IonSegment>
    
          {/* Content based on selected segment */}

          <SubjectList />
         
    
        </IonContent>
        </IonPage>
      );
};

export default HomePage;
function setProfileImage(arg0: string | null) {
    throw new Error('Function not implemented.');
}

