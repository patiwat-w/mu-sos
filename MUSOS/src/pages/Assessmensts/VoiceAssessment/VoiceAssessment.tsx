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
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonSpinner
} from '@ionic/react';
import { mic, play, cog, playCircle, send } from 'ionicons/icons';
import * as stringSimilarity from 'string-similarity';
import Header from '../../../components/Header';
import FrequencyDisplay from '../../../components/FrequencyDisplay';
import SubjectProfileHeader from '../../../components/SubjectProfileHeader';
import { ISubject } from '../../../types/subject.type';
import { apiFileService } from '../../../services/apiFileService';
import { useHistory, useParams } from 'react-router-dom';
const wordsToSay = ["แมงมุม", "ทับทิม", "ฟื้นฟู", "ขอบคุณ", "รื่นเริง", "ใบบัวบก"];

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: {
    isFinal: boolean;
    [key: number]: {
      transcript: string;
    };
  }[];
}

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
  const history = useHistory();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const [loading, setLoading] = useState<boolean>(false); // State to track loading
  const [uploadMessage, setUploadMessage] = useState<string>(''); // State to track upload message
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [wordTimer, setWordTimer] = useState<NodeJS.Timeout | null>(null);
  const [log, setLog] = useState<{ word: string, spokenWord: string, time: string }[]>([]);
  const [expectedLog, setExpectedLog] = useState<{ word: string, time: string }[]>([]);
  const [frequencyData, setFrequencyData] = useState<number[]>([]);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const similarityThreshold = 0.7;
  const { subjectId } = useParams<{ subjectId: string }>();
  const [subject, setSubject] = useState<ISubject | null>(null);
  // Function to start showing words
  const startShowingWords = () => {
    setCurrentWordIndex(0);
    setExpectedLog([]); // Reset the expected log
    const timer = setInterval(() => {
      setCurrentWordIndex(prev => {
        logExpectedWord(wordsToSay[prev]); // Log the expected word
        if (prev < wordsToSay.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          stopRecording(); // Stop recording when all words are shown
          setTimeout(() => setCurrentWordIndex(wordsToSay.length), 3000); // Show "All words completed!" after a delay
          return prev;
        }
      });
    }, 3000);
    setWordTimer(timer);
  };

  // Function to start recording
  const startRecording = async () => {
    setLoading(true);
    setError(null);
    setLog([]); // Reset the log
    setExpectedLog([]); // Reset the expected log
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          //alert(url)
          
          // Wait for audio to be ready
          if (audioRef.current) {
            audioRef.current.src = url;
            audioRef.current.onloadeddata = () => {
              setIsAudioReady(true);
              analyzeAudioFrequency(audioBlob);
            };
          }
        } catch (error) {
          console.error('Error processing audio:', error);
          setError('Error processing audio recording.');
        }
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
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript(prev => transcriptPart);
            logSpokenWord(transcriptPart); // Log the spoken word
            const currentWord = wordsToSay[currentWordIndex];
            if (currentWord) {
              let transcriptPartClean = transcriptPart.replace(/\s/g, '');
              let currentWordClean = currentWord.replace(/\s/g, '');

              const similarity = stringSimilarity.compareTwoStrings(transcriptPartClean, currentWordClean);
              if (similarity >= similarityThreshold) {
                console.log('Correct or Similar word:', transcriptPart);
              } else {
                console.log('Incorrect word:', transcriptPart);
              }
            }
          } else {
            interimTranscript = transcriptPart;
          }
        }
      };

      recognition.onerror = (event: any) => {
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

  // Function to stop recording
  const stopRecording = () => {
    setIsAudioReady(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (wordTimer) {
      clearInterval(wordTimer);
    }
    setIsRecording(false);
  };

  // Function to play recorded audio
  const playRecordedAudio = async () => {
    if (!audioRef.current || !audioUrl) {
      setError('Audio not ready for playback');
      return;
    }

    try {
      await audioRef.current.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setError('Error playing audio. Please try again.');
    }
  };

  // Function to log spoken words
  const logSpokenWord = (spokenWord: string) => {
    const currentWord = wordsToSay[currentWordIndex];
    const time = new Date().toLocaleTimeString();
    setLog(prevLog => [...prevLog, { word: currentWord, spokenWord, time }]);
  };

  // Function to log expected words
  const logExpectedWord = (word: string) => {
    const time = new Date().toLocaleTimeString();
    setExpectedLog(prevLog => [...prevLog, { word, time }]);
  };

  // Function to analyze audio frequency
  const analyzeAudioFrequency = async (audioBlob: Blob) => {
    try {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
  
      const audioBuffer = await audioBlob.arrayBuffer();
      const decodedData = await audioContext.decodeAudioData(audioBuffer);
      
      const source = audioContext.createBufferSource();
      source.buffer = decodedData;
      source.connect(analyser);
      source.start(0);
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);
      
      analyser.getFloatFrequencyData(dataArray);
      console.log('Frequency data:', dataArray);
      
      setFrequencyData(Array.from(dataArray));
      setIsAudioReady(true);
  
      // Calculate average frequency
      const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      return average;
      
    } catch (error) {
      console.error('Error analyzing frequency:', error);
      return null;
    }
  };

  // Function to get microphone information
  const getMicrophoneInfo = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputDevices = devices.filter(device => device.kind === 'audioinput');
      const selectedDevice = audioInputDevices[0]; // Select the first audio input device
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: selectedDevice.deviceId } });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);

      const sampleRate = audioContext.sampleRate;
      const channelCount = source.channelCount;

      // Calculate volume
      const volume = await getVolume(analyser);

      // Get audio quality and bit depth
      const audioQuality = getAudioQuality(sampleRate);
      const bitDepth = getBitDepth();

      console.log('Microphone info:', selectedDevice);
      return {
        label: selectedDevice.label,
        deviceId: selectedDevice.deviceId,
        groupId: selectedDevice.groupId,
        kind: selectedDevice.kind,
        sampleRate: sampleRate,
        channelCount: channelCount,
        volume: volume,
        audioQuality: audioQuality,
        bitDepth: bitDepth,
        usedForRecording: true
      };
    } catch (error) {
      console.error('Error getting microphone info:', error);
      return null;
    }
  };

  const getVolume = async (analyser: AnalyserNode) => {
    const dataArray = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const value = dataArray[i] / 128 - 1;
      sum += value * value;
    }
    const rms = Math.sqrt(sum / dataArray.length);
    return rms;
  };

  const getAudioQuality = (sampleRate: number) => {
    if (sampleRate >= 44100) {
      return 'High';
    } else if (sampleRate >= 22050) {
      return 'Medium';
    } else {
      return 'Low';
    }
  };

  const getBitDepth = () => {
    // Assuming standard bit depth for web audio
    return 16;
  };

  // Effect to handle transcript changes
  useEffect(() => {
    if (transcript) {
      const currentWord = wordsToSay[currentWordIndex];
      if (currentWord) {
        let transcriptPartClean = transcript.replace(/\s/g, '');
        let currentWordClean = currentWord.replace(/\s/g, '');

        const similarity = stringSimilarity.compareTwoStrings(transcriptPartClean, currentWordClean);
        if (similarity >= similarityThreshold) {
          console.log('Correct word:', transcript);
        }
      }
    }
  }, [transcript, currentWordIndex]);

  // Effect to clean up timers
  useEffect(() => {
    return () => {
      if (wordTimer) {
        clearInterval(wordTimer);
      }
    };
  }, [wordTimer]);

  

  const handleSubmit = async () => {
    setLoading(true);
    setUploadMessage('');
    try {
      if (audioBlob) {
        const userId = 1; // Replace with actual user ID
        let file = new File([audioBlob], "voice_audio.wav", { type: "audio/wav" });
        let fileName = file.name;
        let fileType = "audio/wav";
        let fileExtension = "wav";

        const microphoneInfo = await getMicrophoneInfo();
        // unique expectedLog
        let uniqueExpectedLog = expectedLog.filter((entry, index, self) =>
          index === self.findIndex((t) => (
            t.word === entry.word
          ))  
        );

        // Analyze frequency and get average
        const frequencyAverage = await analyzeAudioFrequency(audioBlob);

        let voiceLog = {
          expectedLog: uniqueExpectedLog,
          spokenLog: log,
          deviceInfo: microphoneInfo,
          frequencyAverage: frequencyAverage
        }
      
        let fileInfo = JSON.stringify(voiceLog);
        const response = await apiFileService.uploadFile(
          file, 
          Number(subjectId), 
          Number(userId), 
          'Voice',
          fileType,
          fileName,
          fileExtension,
          fileInfo
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        setUploadMessage('Upload Data Completed');
        setShowAlert(true); // Show alert
      } else {
        setUploadMessage('No audio to upload');
      }
    } catch (error) {
      setUploadMessage('Error uploading data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage style={{ backgroundColor: '#f5f5f5' }}>
       

      <IonLoading isOpen={loading} message="กรุณาอ่านข้อความที่ปรากฏ" />
      <IonAlert
        isOpen={showAlert}
        message={`Try again the word ${wordsToSay[currentWordIndex]}`}
        buttons={[{ text: 'OK', handler: () => setShowAlert(false) }]}
        onDidDismiss={() => setShowAlert(false)}
      />
      {/* <Header title="Voice Assessment" /> */}
      {/* <IonContent className="ion-padding"> */}
      <Header title="Speech Assessment" />
      <IonContent fullscreen>
      <SubjectProfileHeader 
                    subjectId={subjectId}
                    subject={subject} 
                    selectedSegment={"Speech"}
                />
                   <IonItem><IonTitle > กรุณากด 'เริ่ม' และอ่านคำที่ปรากฏ โดยคำที่ปรากฏจะเปลี่ยนทุก 2 วินาที</IonTitle></IonItem>
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
               
                history.push('/result/'+subjectId);

              }
            }
          ]}
        />
        {/* <div style={{ textAlign: 'center' }}>
          <h3>กรุณากด 'เริ่ม' และอ่านคำที่ปรากฏ โดยคำที่ปรากฏจะเปลี่ยนทุก 2 วินาที</h3>
        </div> */}
        <div style={wordDisplayAreaStyle}>
          {currentWordIndex < wordsToSay.length ? wordsToSay[currentWordIndex] : "All words completed!"}
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
            onError={(e) => {
              console.error('Audio error:', e);
              setError('Error loading audio');
            }}
          >
            <source src={audioUrl || ""} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <IonRow className="ion-justify-content-center">
          <IonCol size="auto" className="ion-text-center">
            <IonButton
              fill="clear"
              style={{
                ...buttonStyle,
                backgroundColor: isRecording ? '#FF5252' : '#4CAF50',
              }}
              onClick={() => {
                if (!isRecording) {
                  startRecording();
                  startShowingWords();
                } else {
                  stopRecording();
                }
              }}
            >
              <IonIcon icon={isRecording ? play : mic} />
            </IonButton>
            <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555555' }}>
              {isRecording ? 'Stop Record' : 'Record'}
            </p>
          </IonCol>
          <IonCol size="auto" className="ion-text-center">
            <IonButton
              fill="clear"
              style={{
                ...buttonStyle,
                backgroundColor: '#2196F3',
                opacity: isAudioReady ? 1 : 0.5
              }}
              onClick={playRecordedAudio}
              disabled={!isAudioReady}
            >
              <IonIcon icon={play} />
            </IonButton>
            <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555555' }}>Play</p>
          </IonCol>

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
        {error && <p style={{ color: '#FF5252', textAlign: 'center' }}>{error}</p>}
        <p style={{ textAlign: 'center', color: '#333333' }}>{transcript}</p>
        <div style={{ marginTop: '20px' }}>
          <h3>Expected Words Log</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Time</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Expected Word</th>
              </tr>
            </thead>
            <tbody>
              {expectedLog.map((entry, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.time}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.word}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h3>Log</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Time</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Expected Word</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Spoken Word</th>
              </tr>
            </thead>
            <tbody>
              {log.map((entry, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.time}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.word}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.spokenWord}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h3>Frequency Data</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {frequencyData.map((value, index) => (
              <div key={index} style={{ width: '10px', height: `${value}px`, backgroundColor: '#4CAF50', margin: '1px' }}></div>
            ))}
          </div>
        </div>
        <FrequencyDisplay data={frequencyData} />
      </IonContent>
      <IonFooter style={{ backgroundColor: '#ffffff', boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <IonButton fill="clear" color="medium">
            <IonIcon icon={playCircle} style={{ fontSize: '1.5rem' }} />
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default VoiceAssessment;