import React, { useRef, useEffect } from 'react';
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
import { home, personCircle, helpCircle, camera, videocam, cog } from 'ionicons/icons';
import './ImageAssessment.module.css'; // CSS Module
import { useHistory } from 'react-router';

const ImageAssessment: React.FC = () => {
  const history = useHistory();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Access user camera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    startCamera();

    return () => {
      // Clean up camera stream
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleSubmit = () => {

    history.push('/select-assessment');
  };

  const handleHomeClick = () => {
    history.push('/home'); // Redirect to home page
  };

  const handleBack = () => {
    history.push('/select-assessment'); // Redirect to home page
    // Add navigation logic here
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear" onClick={handleHomeClick}>
            <IonIcon icon={home} />
          </IonButton>
          <IonTitle style={{ textAlign: 'center' }}>Image</IonTitle>
          <IonButton slot="end" fill="clear">
            <IonIcon icon={personCircle} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* ปุ่ม Face และ Body */}
        <IonRow className="ion-justify-content-center ion-margin-bottom">
          <IonCol size="auto" className="ion-text-center">
            <IonButton color="primary" className="toggle-button">
              Face
            </IonButton>
          </IonCol>
          <IonCol size="auto" className="ion-text-center">
            <IonButton color="medium" className="toggle-button">
              Body
            </IonButton>
          </IonCol>
        </IonRow>

        {/* HTML Camera Display */}
        <div
          className="camera-display"
          style={{
            height: 'calc(100vh - 400px)', // Adjust height dynamically
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <video ref={videoRef} autoPlay playsInline className="video-stream" style={{ width: '100%' }}></video>
        </div>

        {/* ปุ่มด้านล่าง */}
        <IonRow className="ion-justify-content-center">
          <IonCol size="auto" className="ion-text-center">
            <IonButton className="circle-button" fill="clear">
              <IonIcon icon={camera} />
            </IonButton>
            <p className="button-label">Capture Image</p>
          </IonCol>
          <IonCol size="auto" className="ion-text-center">
            <IonButton className="circle-button record-button" fill="clear">
              <IonIcon icon={videocam} />
            </IonButton>
            <p className="button-label">Record Video</p>
          </IonCol>
          <IonCol size="auto" className="ion-text-center">
            <IonButton className="circle-button" fill="clear">
              <IonIcon icon={cog} />
            </IonButton>
            <p className="button-label">Submit</p>
          </IonCol>
        </IonRow>

        {/* ข้อความเพิ่มเติม */}
        <p className="instructions">
          Please keep clear and focus patient face on front/rear camera
        </p>
      </IonContent>
      <IonFooter>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <IonButton color="primary" onClick={handleBack} style={{ flex: 1, marginRight: '10px' }}>
                  Back
                </IonButton>
                <IonButton color="primary" onClick={handleSubmit} style={{ flex: 1, marginLeft: '10px' }}>
                  Next
                </IonButton>
              </div>
            </IonFooter>
    </IonPage>
  );
};

export default ImageAssessment;