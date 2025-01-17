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
    IonIcon,
    IonCol,
    IonRow,
    IonFooter
} from '@ionic/react';
import { home, personCircle, save, closeCircle } from 'ionicons/icons';

const PersonalInformation: React.FC = () => {
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

    return (
        <IonApp>
            <IonHeader>
                <IonToolbar>
                    <IonButton slot="start" fill="clear" routerLink="/home">
                        <IonIcon icon={home} />
                    </IonButton>
                    <IonTitle style={{ textAlign: 'center' }}>Subject Information</IonTitle>
                    <IonButton slot="end" fill="clear">
                        <IonIcon icon={personCircle} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Subject ID</IonLabel>
                    <IonInput placeholder="Enter Subject ID" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}></IonInput>
                </IonItem>

                <IonItem button onClick={() => setShowDOBPicker(true)}>
                    <IonLabel position="stacked">Date of Birth (dd/mm/yyyy)</IonLabel>
                    <IonInput value={dob} readonly placeholder="Select Date" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}></IonInput>
                </IonItem>

                <IonModal isOpen={showDOBPicker} onDidDismiss={() => setShowDOBPicker(false)}>
                    <IonDatetime
                        display-format="DD/MM/YYYY"
                        value={dob}
                        onIonChange={(e) => setDob(Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value || '')}
                    ></IonDatetime>
                    <IonButton onClick={() => setShowDOBPicker(false)}>Done</IonButton>
                </IonModal>

                <IonItem>
                    <IonLabel position="stacked">Age (yy year old)</IonLabel>
                    <IonInput readonly placeholder="Automatically calculated" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}></IonInput>
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
                    <IonInput value={onsetTime} readonly placeholder="Select Time" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}></IonInput>
                </IonItem>

                <IonModal isOpen={showOnsetPicker} onDidDismiss={() => setShowOnsetPicker(false)}>
                    <IonDatetime
                        display-format="HH:mm"
                        value={onsetTime}
                        onIonChange={(e) => setOnsetTime(Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value || '')}
                    ></IonDatetime>
                    <IonButton onClick={() => setShowOnsetPicker(false)}>Done</IonButton>
                </IonModal>

                <IonItem button onClick={() => setShowLastSeenPicker(true)}>
                    <IonLabel position="stacked">Last Seen Normal Time</IonLabel>
                    <IonInput value={lastSeenTime} readonly placeholder="Select Time" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}></IonInput>
                </IonItem>

                <IonModal isOpen={showLastSeenPicker} onDidDismiss={() => setShowLastSeenPicker(false)}>
                    <IonDatetime
                        display-format="HH:mm"
                        value={lastSeenTime}
                        onIonChange={(e) => setLastSeenTime(Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value || '')}
                    ></IonDatetime>
                    <IonButton onClick={() => setShowLastSeenPicker(false)}>Done</IonButton>
                </IonModal>

                <IonRow className="ion-justify-content-center ion-align-items-center">
                    

                    <IonCol size="auto" className="ion-text-center">
                        <IonButton
                            fill="clear"
                            style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                backgroundColor: '#ff4444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1rem',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                color: 'white',
                            }}
                        >
                            <IonIcon icon={closeCircle} />
                        </IonButton>
                        <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555' }}>Cancel</p>
                    </IonCol>

                    <IonCol size="auto" className="ion-text-center">
                        <IonButton
                            fill="clear"
                            style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                backgroundColor: '#0bcb71',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1rem',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                color: 'black',
                            }}
                        >
                            <IonIcon icon={save} />
                        </IonButton>
                        <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555' }}>Save</p>
                    </IonCol>
                </IonRow>

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

export default PersonalInformation;
