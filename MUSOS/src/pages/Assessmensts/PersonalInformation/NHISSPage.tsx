import React, { useState } from 'react';
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
    IonGrid
} from '@ionic/react';
import { home, personCircle, save, closeCircle, helpCircle } from 'ionicons/icons';
import { useHistory } from 'react-router';
import ToggleButtonGroupDynamic from '../../../components/ToggleButtonGroupDynamic';
import './NHISSPage.css';

const NHISSPage: React.FC = () => {
    const history = useHistory();
    const [scores, setScores] = useState<{ [key: string]: number | "UN" }>({});

    const nhissItems = [
        { id: "1A", label: "Consciousness", options: ["UN",0, 1, 2, 3],value:"UN" },
        { id: "1B", label: "Question", options: ["UN",0, 1, 2] },
        { id: "1C", label: "Commands", options: ["UN",0, 1, 2] },
        { id: "2", label: "Gaze", options: ["UN",0, 1, 2] },
        { id: "3", label: "Visual field", options: ["UN",0, 1, 2, 3] },
        { id: "4", label: "Facial Palsy", options: ["UN",0, 1, 2, 3] },
        { id: "5L", label: "Arm Strength - Left", options: ["UN",0, 1, 2, 3, 4 ] },
        { id: "5R", label: "Arm Strength - Right", options: ["UN",0, 1, 2, 3, 4 ] },
        { id: "6L", label: "Leg Strength - Left", options: ["UN",0, 1, 2, 3, 4 ] },
        { id: "6R", label: "Leg Strength - Right", options: ["UN",0, 1, 2, 3, 4] },
        { id: "7", label: "Ataxia", options: ["UN",0, 1, 2]},
        { id: "8", label: "Sensory", options: ["UN",0, 1, 2]},
    ];

    const handleScoreChange = (id: string, value: number | "UN") => {
        setScores({ ...scores, [id]: value });
    };

    const handleSave = () => {
        console.log("Saved Scores:", scores);
        history.goBack();
        // Add navigation or saving logic here
    };

    const handleCancel = () => {
        console.log("Cancel clicked");
        history.goBack();
        // Add navigation logic here
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton slot="start" fill="clear" routerLink="/home">
                        <IonIcon icon={home} />
                    </IonButton>
                    <IonTitle style={{ textAlign: 'center' }}>NHISS</IonTitle>
                    <IonButton slot="end" fill="clear">
                        <IonIcon icon={personCircle} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {nhissItems.map((item, index) => (
                    <IonGrid key={item.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                        {/* Label อยู่บรรทัดแรก */}
                        <IonRow>
                            <IonCol size="12" className="label-col">
                                <strong>{item.id} {item.label}</strong>
                            </IonCol>
                        </IonRow>

                        {/* ปุ่มตัวเลือกอยู่บรรทัดที่สอง */}
                        <IonRow className="button-group">
                            <ToggleButtonGroupDynamic
                                options={item.options.map(option => ({
                                    label: option.toString(),
                                    value: option.toString(),
                                    selected: scores[item.id] === option
                                }))}
                                onChange={(value) => handleScoreChange(item.id, value === "UN" ? "UN" : Number(value))}
                                maxOptions={6} // Set maxOptions to 6
                            />
                        </IonRow>
                    </IonGrid>
                ))}
            </IonContent>

            <IonFooter>
                <IonRow className="ion-justify-content-center ion-align-items-center" style={{ marginTop: '20px' }}>
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
                            onClick={handleCancel}
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
                            onClick={handleSave}
                        >
                            <IonIcon icon={save} />
                        </IonButton>
                        <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555' }}>Save</p>
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
                                fontSize: '1rem',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                color: 'black',
                            }}
                        >
                            <IonIcon icon={helpCircle} />
                        </IonButton>
                        <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#555' }}>Help</p>
                    </IonCol>
                </IonRow>
            </IonFooter>
        </IonPage>
    );
};

export default NHISSPage;
