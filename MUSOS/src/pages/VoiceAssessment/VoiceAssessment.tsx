import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
  IonFooter,
} from '@ionic/react';
import { home, personCircle, helpCircle, mic, play, cog } from 'ionicons/icons';

const VoiceAssessment: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear">
            <IonIcon icon={home} />
          </IonButton>
          <IonTitle style={{ textAlign: 'center' }}>Voice</IonTitle>
          <IonButton slot="end" fill="clear">
            <IonIcon icon={personCircle} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* พื้นที่แสดงข้อความ */}
        <div
          style={{
            width: '100%',
            height: '260px',
            backgroundColor: '#e0e0e0',
            border: '2px solid #c0c0c0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          Image or Text for Reading
        </div>

        {/* HTML5 Audio Player */}
        <div
          style={{
            width: '100%',
            height: '80px',
            backgroundColor: 'transparent',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <audio
            controls
            style={{
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <source src="path/to/audio-file.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* ปุ่มควบคุมเสียง */}
        <IonRow className="ion-justify-content-center">
          <IonCol size="auto" className="ion-text-center">
            <IonButton
              fill="clear"
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: '#ffcc00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                color: 'black',
              }}
            >
              <IonIcon icon={mic} />
            </IonButton>
            <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555' }}>Record</p>
          </IonCol>
          <IonCol size="auto" className="ion-text-center">
            <IonButton
              fill="clear"
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: '#ffcc00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                color: 'black',
              }}
            >
              <IonIcon icon={play} />
            </IonButton>
            <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555' }}>Play</p>
          </IonCol>
          <IonCol size="auto" className="ion-text-center">
            <IonButton
              fill="clear"
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: '#ffcc00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                color: 'black',
              }}
            >
              <IonIcon icon={cog} />
            </IonButton>
            <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555' }}>Submit</p>
          </IonCol>
        </IonRow>
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

export default VoiceAssessment;
