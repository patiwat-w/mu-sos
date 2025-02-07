import React, { useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonRow,
    IonCol,
    IonFooter,
    IonGrid,
    IonSegment,
    IonSegmentButton
} from '@ionic/react';
import { home, personCircle, save, closeCircle, helpCircle } from 'ionicons/icons';
import { useHistory } from 'react-router';

const NHISSPage: React.FC = () => {
    const history = useHistory();
    const [scores, setScores] = useState<{ [key: string]: number | "UN" }>({});

    const nhissItems = [
        { id: "1A", label: "Consciousness", options: [0, 1, 2, 3] },
        { id: "1B", label: "Question", options: [0, 1, 2] },
        { id: "1C", label: "Commands", options: [0, 1, 2] },
        { id: "2", label: "Gaze", options: [0, 1, 2] },
        { id: "3", label: "Visual field", options: [0, 1, 2, 3] },
        { id: "4", label: "Facial Palsy", options: [0, 1, 2, 3] },
        { id: "5L", label: "Arm Strength - Left", options: [0, 1, 2, 3, 4, "UN"] },
        { id: "5R", label: "Arm Strength - Right", options: [0, 1, 2, 3, 4, "UN"] },
        { id: "6L", label: "Leg Strength - Left", options: [0, 1, 2, 3, 4, "UN"] },
        { id: "6R", label: "Leg Strength - Right", options: [0, 1, 2, 3, 4, "UN"] },
        { id: "7", label: "Ataxia", options: [0, 1, 2, "UN"] },
        { id: "8", label: "Sensory", options: [0, 1, 2] },
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
            {nhissItems.map((item) => (
  <IonGrid key={item.id} className="nhiss-item">
    {/* Label อยู่บรรทัดแรก */}
    <IonRow>
      <IonCol size="12">
        <strong>{item.id} {item.label}</strong>
      </IonCol>
    </IonRow>

    {/* ปุ่มตัวเลือกอยู่บรรทัดที่สอง */}
    <IonRow className="button-group">
      {item.options.map((option) => (
        <IonCol key={option} size="auto">
          <IonButton
            expand="block"
            fill={scores[item.id] === option ? "solid" : "outline"}
            onClick={() => handleScoreChange(item.id, option)}
            className="option-button"
          >
            {option}
          </IonButton>
        </IonCol>
      ))}
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
