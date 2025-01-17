import React, { useState } from 'react';
import {
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonToggle,
    IonNote,
    IonModal,
    IonDatetime,
    IonIcon
} from '@ionic/react';
import { home, personCircle } from 'ionicons/icons';

const PersonalInformationPage: React.FC = () => {
    const [gender, setGender] = useState('Male');
    const [showDOBPicker, setShowDOBPicker] = useState(false);
    const [showOnsetPicker, setShowOnsetPicker] = useState(false);
    const [showLastSeenPicker, setShowLastSeenPicker] = useState(false);
    const [dob, setDob] = useState('');
    const [onsetTime, setOnsetTime] = useState('');
    const [lastSeenTime, setLastSeenTime] = useState('');

    const handleToggleGender = () => {
        setGender(gender === 'Male' ? 'Female' : 'Male');
    };

    const handleVoiceClick = () => {
        history.push('/voice-assessment'); // Redirect to voice-assessment page
      };

    return (
        <IonApp>
            <IonHeader>
                <IonToolbar>
                    <IonButton slot="start" fill="clear">
                        <IonIcon icon={home} />
                    </IonButton>
                    <IonTitle style={{ textAlign: 'center' }}>Personal Information</IonTitle>
                    <IonButton slot="end" fill="clear">
                        <IonIcon icon={personCircle} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Subject ID</IonLabel>
                    <IonInput placeholder="Enter Subject ID"></IonInput>
                </IonItem>

                <IonItem button onClick={() => setShowDOBPicker(true)}>
                    <IonLabel position="stacked">Date of Birth (dd/mm/yyyy)</IonLabel>
                    <IonInput value={dob} readonly placeholder="Select Date"></IonInput>
                </IonItem>

                <IonModal isOpen={showDOBPicker} onDidDismiss={() => setShowDOBPicker(false)}>
                    <IonDatetime
                        display-format="DD/MM/YYYY"
                        value={dob}
                        onIonChange={(e) => setDob(e.detail.value!)}
                    ></IonDatetime>
                    <IonButton onClick={() => setShowDOBPicker(false)}>Done</IonButton>
                </IonModal>

                <IonItem>
                    <IonLabel position="stacked">Age (yy year old)</IonLabel>
                    <IonInput readonly placeholder="Automatically calculated"></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel>Gender</IonLabel>
                    <IonToggle
                        checked={gender === 'Male'}
                        onIonChange={handleToggleGender}
                    ></IonToggle>
                    <IonLabel>{gender}</IonLabel>
                </IonItem>

                <IonItem button onClick={() => setShowOnsetPicker(true)}>
                    <IonLabel position="stacked">Onset Time</IonLabel>
                    <IonInput value={onsetTime} readonly placeholder="Select Time"></IonInput>
                </IonItem>

                <IonModal isOpen={showOnsetPicker} onDidDismiss={() => setShowOnsetPicker(false)}>
                    <IonDatetime
                        display-format="HH:mm"
                        value={onsetTime}
                        onIonChange={(e) => setOnsetTime(e.detail.value!)}
                    ></IonDatetime>
                    <IonButton onClick={() => setShowOnsetPicker(false)}>Done</IonButton>
                </IonModal>

                <IonItem button onClick={() => setShowLastSeenPicker(true)}>
                    <IonLabel position="stacked">Last Seen Normal Time</IonLabel>
                    <IonInput value={lastSeenTime} readonly placeholder="Select Time"></IonInput>
                </IonItem>

                <IonModal isOpen={showLastSeenPicker} onDidDismiss={() => setShowLastSeenPicker(false)}>
                    <IonDatetime
                        display-format="HH:mm"
                        value={lastSeenTime}
                        onIonChange={(e) => setLastSeenTime(e.detail.value!)}
                    ></IonDatetime>
                    <IonButton onClick={() => setShowLastSeenPicker(false)}>Done</IonButton>
                </IonModal>

                <div className="ion-margin-top ion-text-center">
                    <IonButton color="danger">Cancel</IonButton>
                    <IonButton color="success">Save</IonButton>
                </div>

                <IonNote className="ion-margin-top">
                    <p>Note:</p>
                    <ul>
                        <li>If you input "Date of Birth," then "Age" will automatically calculate.</li>
                        <li>Required either "Onset Time" or "Last Seen Normal Time" or both times.</li>
                    </ul>
                </IonNote>
            </IonContent>
        </IonApp>
    );
};

export default PersonalInformationPage;
