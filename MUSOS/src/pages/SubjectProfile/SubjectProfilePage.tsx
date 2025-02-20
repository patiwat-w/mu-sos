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
import { personCircle, settings, helpCircle, addCircle, logOutOutline, addCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';


const SubjectProfilePage: React.FC = () => {
    const history = useHistory();
    const [user, setUser] = useState<any>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null); // เพิ่ม state สำหรับ photoUrl




    return (
        <IonContent>
            
          {/* Profile Card */}
          <div className="profile-card">
            <IonAvatar>
              <img src={photoUrl || 'default-profile-image.jpg'} alt="Profile" />
            </IonAvatar>
            <IonLabel>{user?.displayName || 'Guest User'}</IonLabel>
            <IonLabel>{user?.email || ''} | {user?.location || 'User'}</IonLabel>
    
            <IonGrid>
              <IonRow>
              <IonCol size="12">
                  <IonLabel></IonLabel>
                  <IonButton 
                      shape="round" 
                      fill="solid" 
                      color="primary"
                      
                  >
                    <IonIcon icon={addCircleOutline} />
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
    
            {/* Optional: Member Since */}
            <IonLabel class="member-since">Add Subject </IonLabel> 
          </div>
    
          {/* Segment Tabs */}
          <IonSegment>
            <IonSegmentButton value="All" >
              <IonLabel>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Pending">
              <IonLabel>Pending</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Submited">
              <IonLabel>Submited</IonLabel>
            </IonSegmentButton>
          </IonSegment>
    
          {/* Content based on selected segment */}

        
         
    
        </IonContent>
      );
};

export default SubjectProfilePage;
function setProfileImage(arg0: string | null) {
    throw new Error('Function not implemented.');
}

