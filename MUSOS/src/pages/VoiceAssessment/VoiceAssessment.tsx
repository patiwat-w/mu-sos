import React, { useState, useRef, useEffect } from 'react';
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
  IonLoading,
  IonAlert
} from '@ionic/react';
import { home, personCircle, helpCircle, mic, play, cog } from 'ionicons/icons';
import * as stringSimilarity from 'string-similarity';

const wordsToSay = ["สวัสดี", "ขอบคุณ", "ลาก่อน", "ยินดี"];

// Style Constants
const buttonStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  color: '#ffffff',
  transition: 'background-color 0.3s ease',
};

const wordDisplayAreaStyle = {
  width: '100%',
  height: '260px',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#333333',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const audioPlayerAreaStyle = {
  width: '100%',
  height: '80px',
  backgroundColor: 'transparent',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const VoiceAssessment: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const similarityThreshold = 0.7;

  const startRecording = async () => {
    setLoading(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };
      mediaRecorder.start();
      setIsRecording(true);
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'th-TH';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        console.log("---------------------------------------------------");
        console.log('Speech recognition result:', event);
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          console.log('Transcript:', i, transcriptPart);
          if (event.results[i].isFinal) {
            console.log('Final:', transcriptPart);
            setTranscript(prev => transcriptPart);
            const currentWord = wordsToSay[i];
            if (currentWord) {
              // Remove whitespace
              let transcriptPartClean = transcriptPart.replace(/\s/g, '');
              let currentWordClean = currentWord.replace(/\s/g, '');

              const similarity = stringSimilarity.compareTwoStrings(transcriptPartClean, currentWordClean);
              console.log("Similarity Score:", transcriptPartClean, currentWordClean, similarity);
              if (similarity >= similarityThreshold) {
                console.log('Correct or Similar word:', transcriptPart);
                setCurrentWordIndex(prev => prev + 1);
                setTranscript('');
                console.log('Reset transcript for the next word:');
                console.log('Current word index:', currentWordIndex);
              } else {
                console.log('Incorrect word:', transcriptPart);
                setShowAlert(true);
              }
            }
          } else {
            console.log('else:', transcriptPart);
            interimTranscript = transcriptPart;
          }
        }
        console.log('Interim Transcript:', interimTranscript);
      };
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event);
        setError('Error during speech recognition.');
      };
      recognition.onend = () => {
        setIsRecording(false);
      };
      recognition.start();
    } catch (err) {
      console.error("Error accessing microphone", err);
      setError("Failed to access the microphone. Please check permissions.");
    } finally {
      setLoading(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const playRecordedAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
        setError('Error playing audio. Please try again.');
      });
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.load();
    }
  }, [audioUrl]);

  useEffect(() => {
    if (transcript && transcript.includes(wordsToSay[currentWordIndex])) {
      console.log('Correct word:', transcript);
      setCurrentWordIndex(prev => prev + 1);
      setTranscript('');
    }
  }, [transcript, currentWordIndex]);

  const handleAlertDismiss = () => {
    setShowAlert(false);
  };

  return (
    <IonPage style={{ backgroundColor: '#f5f5f5' }}>
      <IonLoading isOpen={loading} message="Loading..." />
      <IonAlert
        isOpen={showAlert}
        message={`Try again the word ${wordsToSay[currentWordIndex]}`}
        buttons={[{ text: 'OK', handler: () => handleAlertDismiss() }]}
        onDidDismiss={handleAlertDismiss}
      />
      <IonHeader>
        <IonToolbar style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <IonButton slot="start" fill="clear" color="dark">
            <IonIcon icon={home} />
          </IonButton>
          <IonTitle style={{ textAlign: 'center', color: '#333333', fontWeight: 'bold' }}>Voice Assessment</IonTitle>
          <IonButton slot="end" fill="clear" color="dark">
            <IonIcon icon={personCircle} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={wordDisplayAreaStyle}>
          {wordsToSay[currentWordIndex] || "All words completed!"}
        </div>
        <div style={audioPlayerAreaStyle}>
          <audio
            ref={audioRef}
            controls
            style={{
              width: '100%',
              maxWidth: '400px',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <source src={audioUrl || ""} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <IonRow className="ion-justify-content-center">
          <IonCol size="auto" className="ion-text-center">
            <IonButton
              fill="solid"
              style={{
                ...buttonStyle,
                backgroundColor: isRecording ? '#FF5252' : '#4CAF50',
              }}
              onClick={isRecording ? stopRecording : startRecording}
            >
              <IonIcon icon={isRecording ? play : mic} />
            </IonButton>
            <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555555' }}>
              {isRecording ? 'Stop Record' : 'Record'}
            </p>
          </IonCol>
          <IonCol size="auto" className="ion-text-center">
            <IonButton
              fill="solid"
              style={{
                ...buttonStyle,
                backgroundColor: '#2196F3',
              }}
              onClick={playRecordedAudio}
              disabled={!audioUrl}
            >
              <IonIcon icon={cog} />
            </IonButton>
            <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555555' }}>Play</p>
          </IonCol>
        </IonRow>
        {error && <p style={{ color: '#FF5252', textAlign: 'center' }}>{error}</p>}
        <p style={{ textAlign: 'center', color: '#333333' }}>{transcript}</p>
      </IonContent>
      <IonFooter style={{ backgroundColor: '#ffffff', boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <IonButton fill="clear" color="medium">
            <IonIcon icon={helpCircle} style={{ fontSize: '1.5rem' }} />
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default VoiceAssessment;