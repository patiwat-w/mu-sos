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
  IonSpinner,
  IonAlert,
  IonItem,
} from '@ionic/react';
import { home, personCircle, helpCircle, camera, videocam, cog, closeCircle, send, cameraReverse } from 'ionicons/icons';
import './FaceAssessmentPage.module.css'; // CSS Module
import { useHistory, useParams } from 'react-router-dom';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { apiSendPhotoFaceService } from '../../../services/apiSendPhotoFaceService';
import { apiSendVideoService } from '../../../services/apiSendVideoService'
import { apiFileService } from '../../../services/apiFileService';
import AssessmentHeaderSection from '../AssessmentHeaderSection';
import Header from '../../../components/Header';
import SubjectProfileHeader from '../../../components/SubjectProfileHeader';
import { ISubject } from '../../../types/subject.type';

const FaceAssessmentPage: React.FC = () => {
  const history = useHistory();
  const { subjectId } = useParams<{ subjectId: string }>();
  const [subject, setSubject] = useState<ISubject | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isPhotoTaken, setIsPhotoTaken] = useState<boolean>(false); // State to track if photo is taken
  const [loading, setLoading] = useState<boolean>(false); // State to track loading
  const [uploadMessage, setUploadMessage] = useState<string>(''); // State to track upload message
  const [showAlert, setShowAlert] = useState<boolean>(false); // State to track alert visibility
  const [isRecording, setIsRecording] = useState<boolean>(false); // State to track recording status
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null); // State to store recorded video URL
  const [showOverlay, setShowOverlay] = useState<boolean>(true); // State to control overlay visibility
  const [activeButton, setActiveButton] = useState<string>('face'); // State to track active button
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true); // State to track camera direction

  useEffect(() => {
    // Access user camera
    const startCamera = async () => {
      try {
        const constraints = {
          video: {
            facingMode: isFrontCamera ? 'user' : 'environment', // Use state to determine camera direction
          },
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
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
  }, [isFrontCamera]);

  const handleSubmit = async () => {
    setLoading(true);
    setUploadMessage('');
    try {
      if (photo) {
        const base64Response = await fetch(photo);
        const blob = await base64Response.blob();
        //const subjectId = 1; // Replace with actual subject ID
        const userId = 1; // Replace with actual user ID
        // conver blob to File binaly
        let file = new File([blob], "face_image.png", { type: "image/png" });
        let fileName = file.name;
        let fileType = "image/png";
        let fileExtension = "png";
        const response = await apiFileService.uploadFile(
          file, 
          Number(subjectId), 
          Number(userId), 
          'Face',
          fileType,
          fileName,
          fileExtension
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setUploadMessage('Upload Data Completed');
        setShowAlert(true); // Show alert
      } else {
        setUploadMessage('No photo to upload');
      }
    } catch (error) {
      setUploadMessage('Error uploading data');
    } finally {
      setLoading(false);
    }
  };

  // const handleHomeClick = () => {
  //   history.push('/home'); // Redirect to home page
  // };

  // const handleBack = () => {
  //   history.push('/select-assessment'); // Redirect to home page
  // };

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

  

  // sendVideo to apiSendVideoService
  const sendVideo = async (video: string) => {
    try {
        // Convert base64 to blob
        const base64Response = await fetch(video);
        const blob = await base64Response.blob();

        // Get user from storage/context
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        // Send video using service
        const response = await apiSendVideoService.postData(blob);
        //alert(JSON.stringify(response))
        console.log('Video sent successfully:', response);
        return response;
    } catch (error) {
        console.error('Error sending video:', error);
        throw error;
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

  const handleRecordVideo = () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Cancel existing MediaRecorder if any
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current = null;
      }

      // Start new recording
      if (videoRef.current && videoRef.current.srcObject) {
        const mediaStream = videoRef.current.srcObject as MediaStream;
        const mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
          recordedChunksRef.current = [];
          const videoUrl = URL.createObjectURL(blob);
          setRecordedVideoUrl(videoUrl); // Set the recorded video URL
          const response = await sendVideo(videoUrl);
          //setUploadMessage(`Video sent successfully: ${JSON.stringify(response)}`);
          //setShowAlert(true); // Show alert with response message
        };

        mediaRecorder.start();
        setIsRecording(true);
      }
    }
  };

  const handleFaceClick = () => {
    setShowOverlay(true); // Show overlay when Face button is clicked
    drawFaceSilhouetteGuide(); // Redraw the overlay
    setActiveButton('face'); // Set active button to face
  };

  const handleBodyClick = () => {
    setShowOverlay(false); // Hide overlay when Body button is clicked
    setActiveButton('body'); // Set active button to body
  };

  const handleSwitchCamera = () => {
    setIsFrontCamera((prev) => !prev); // Toggle camera direction
  };

  return (
    <IonPage>
         <Header title="Face Assessment" />
      <IonContent fullscreen>
      <SubjectProfileHeader 
                    subjectId={subjectId}
                    subject={subject} 
                    selectedSegment={"Face"}
                />
                   <IonItem><IonTitle > มองหน้าตรงเข้ากล้อง, ยิมยิงฟัน</IonTitle></IonItem>
                   
    
        {/* Show loading spinner as overlay */}
        {loading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999
          }}>
            <IonSpinner name="crescent" style={{ width: '100px', height: '100px', color: 'white' }} />
          </div>
        )}
        {/* Show upload message */}
        {uploadMessage && (
          <div style={{ textAlign: 'center', marginBottom: '20px', color: 'green' }}>
            {uploadMessage}
          </div>
        )}
        {/* Show alert dialog */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Upload Data Completed'}
          message={'Click OK to continue'}
          buttons={[
            {
              text: 'Ok',
              handler: () => {
                //history.push('/voice-assessment/'+subjectId); // Redirect to VoiceAssessment page
                // back to subject profile page
                history.push('/aim-assessment/'+subjectId);

              }
            }
          ]}
        />
        {/* ปุ่ม Face และ Body */}
        {/* <IonRow className="ion-justify-content-center ion-margin-bottom">
          <IonCol size="auto" className="ion-text-center">
            <IonButton onClick={handleFaceClick} color={activeButton === 'face' ? 'primary' : 'medium'} className="toggle-button">
              Face
            </IonButton>
          </IonCol>
          <IonCol size="auto" className="ion-text-center">
            <IonButton onClick={handleBodyClick} color={activeButton === 'body' ? 'primary' : 'medium'} className="toggle-button">
              Body
            </IonButton>
          </IonCol>
        </IonRow> */}

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
          {showOverlay && (
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
          )}
          <video ref={videoRef} autoPlay playsInline className="video-stream" style={{ width: '100%', height: '100%', objectFit: 'fill', backgroundColor: 'rgba(9, 9, 9, 0.5)' }}></video>
          <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
          {photo && <img src={photo} alt="Captured" style={{ position: 'absolute', top: 0, left: 0, objectFit: 'fill', width: '100%', height: '100%' }} />}
          {recordedVideoUrl && (
            <video controls src={recordedVideoUrl} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
          )}
        </div>

        {/* ปุ่มด้านล่าง */}
        <IonRow className="ion-justify-content-center" style={{ marginTop: '20px' }}>
          {/* Switch Camera Button */}
          <IonCol size="auto" className="ion-text-center">
            <IonButton
              fill="clear"
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: '#FFC107', // Yellow color for switch camera
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onClick={handleSwitchCamera}
            >
              <IonIcon icon={cameraReverse} style={{ fontSize: '32px', color: 'white' }} />
            </IonButton>
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#FFC107' }}>Switch Camera</p>
          </IonCol>
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
          {/* {!isPhotoTaken && (
          <IonCol size="auto" className="ion-text-center">
            <IonButton
              onClick={handleRecordVideo}
              fill="clear"
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: isRecording ? '#FF0000' : '#000000', // Red color for stop, black for record
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <IonIcon icon={videocam} style={{ fontSize: '32px', color: 'white' }} />
            </IonButton>
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#2196F3' }}>
              {isRecording ? 'Stop Record' : 'Record Video'}
            </p>
          </IonCol>
          )} */}

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

     
      </IonContent>
      <IonFooter>
        {/* <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}> */}
            {/* ข้อความเพิ่มเติม */}
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Please keep clear and focus patient face on front/rear camera
        </p>

         {/* <IonButton color="primary" onClick={handleBack} style={{ flex: 1, marginRight: '10px' }}>
            Back
          </IonButton>
          <IonButton color="primary" onClick={handleSubmit} style={{ flex: 1, marginLeft: '10px' }}>
            Next
          </IonButton> */}
        {/* </div> */}
      </IonFooter>
    </IonPage>
  );
};

export default FaceAssessmentPage;