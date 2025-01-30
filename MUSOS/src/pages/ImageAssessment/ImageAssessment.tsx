import React, { useRef, useEffect, useState } from 'react';
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
import { home, personCircle, helpCircle, camera, videocam, cog, closeCircle, send } from 'ionicons/icons';
import './ImageAssessment.module.css'; // CSS Module
import { useHistory } from 'react-router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { apiSendPhotoFaceService } from '../../services/apiSendPhotoFaceService';
import { al } from 'vitest/dist/reporters-5f784f42';

const ImageAssessment: React.FC = () => {
  const history = useHistory();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isPhotoTaken, setIsPhotoTaken] = useState<boolean>(false); // State to track if photo is taken

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
    drawFaceSilhouetteGuide();
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
  };

  const takePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageDataUrl = canvasRef.current.toDataURL('image/png');
        setPhoto(imageDataUrl);
        setIsPhotoTaken(true); // Set photo taken to true
        sendPhoto(imageDataUrl);
      }
    }
  };

  const handleDiscard = () => {
    setPhoto(null); // Clear the photo
    setIsPhotoTaken(false); // Set photo taken to false
  };

  const sendPhoto = async (imageDataUrl: string) => {
    try {
      const base64Response = await fetch(imageDataUrl);
      const blob = await base64Response.blob();
      const response = await apiSendPhotoFaceService.postData(blob);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseblob = await response.blob();
      const responseurl = URL.createObjectURL(responseblob);
      let base64String = await convertBlobToBase64(responseblob);
      setPhoto(base64String);
    } catch (error) {
      console.log('Error sending photo:', error);
    }
  };

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  function drawFaceSilhouetteGuide() {
    const overlayCanvas = document.getElementById('overlayCanvas');
    const overlayCtx = (overlayCanvas as HTMLCanvasElement)?.getContext('2d');
    if (!overlayCanvas || !(overlayCanvas instanceof HTMLCanvasElement) || !overlayCtx) {
      return;
    }

    const width = overlayCanvas.width;
    const height = overlayCanvas.height + 20;
    overlayCtx.clearRect(0, 0, width, height);

    // Draw the silhouette guide (oval shape, centered)
    overlayCtx.beginPath();
    const maxOvalWidth = 60; // Adjust the width of the oval to fit a face
    const maxOvalHeight = 60; // Adjust the height of the oval to fit a face
    overlayCtx.ellipse(width / 2, height / 2, maxOvalWidth, maxOvalHeight, 0, 0, 3 * Math.PI);
    overlayCtx.strokeStyle = 'rgba(0, 255, 0, 0.8)';
    overlayCtx.lineWidth = 3;
    overlayCtx.stroke();

    // Lighter overlay outside the silhouette
    overlayCtx.globalCompositeOperation = 'destination-over';
    overlayCtx.fillStyle = 'transparent';
    overlayCtx.fillRect(0, 0, width, height);
    overlayCtx.globalCompositeOperation = 'source-over';
  }

  const drawFaceSilhouetteGuide2 = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.beginPath();
        context.arc(canvasRef.current.width / 2, canvasRef.current.height / 2, 100, 0, Math.PI * 2);
        context.stroke();
      }
    }
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
            <IonButton onClick={drawFaceSilhouetteGuide} color="primary" className="toggle-button">
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
            position: 'relative', // Change to relative
          }}
        >
          <canvas
            id="overlayCanvas"
            className="camera-display"
            style={{
              position: 'absolute', // Change to absolute
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          ></canvas>
          <video ref={videoRef} autoPlay playsInline className="video-stream" style={{ width: '100%', height: '100%', objectFit: 'fill', backgroundColor: 'rgba(9, 9, 9, 0.5)' }}></video>
          <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
          {photo && <img src={photo} alt="Captured" style={{ position: 'absolute', top: 0, left: 0, objectFit: 'fill', width: '100%', height: '100%' }} />}
        </div>

        {/* ปุ่มด้านล่าง */}
        <IonRow className="ion-justify-content-center" style={{ marginTop: '20px' }}>
          {/* ปุ่ม Capture Image (แสดงเมื่อยังไม่ถ่ายรูป) */}
          {!isPhotoTaken && (
            <IonCol size="auto" className="ion-text-center">
              <IonButton
                onClick={takePhoto}
                fill="clear"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: '#4CAF50', // Green color for capture
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <IonIcon icon={camera} style={{ fontSize: '32px', color: 'white' }} />
              </IonButton>
              <p style={{ marginTop: '8px', fontSize: '14px', color: '#4CAF50' }}>Capture Image</p>
            </IonCol>
          )}

          {/* ปุ่ม Discard (แสดงหลังจากถ่ายรูป) */}
          {isPhotoTaken && (
            <IonCol size="auto" className="ion-text-center">
              <IonButton
                onClick={handleDiscard}
                fill="clear"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: '#F44336', // Red color for discard
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <IonIcon icon={closeCircle} style={{ fontSize: '32px', color: 'white' }} />
              </IonButton>
              <p style={{ marginTop: '8px', fontSize: '14px', color: '#F44336' }}>Discard</p>
            </IonCol>
          )}

          {/* ปุ่ม Record Video */}
          {!isPhotoTaken && (
          <IonCol size="auto" className="ion-text-center">
            <IonButton
              fill="clear"
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: '#000000', //  color for record
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <IonIcon icon={videocam} style={{ fontSize: '32px', color: 'white' }} />
            </IonButton>
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#2196F3' }}>Record Video</p>
          </IonCol>
          )}

          {/* ปุ่ม Submit */}
          <IonCol size="auto" className="ion-text-center">
            <IonButton
              fill="clear"
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: '#2196F3', //  color for submit
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onClick={handleSubmit}
            >
              <IonIcon icon={send} style={{ fontSize: '32px', color: 'white' }} />
            </IonButton>
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#9C27B0' }}>Submit</p>
          </IonCol>
        </IonRow>

        {/* ข้อความเพิ่มเติม */}
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
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