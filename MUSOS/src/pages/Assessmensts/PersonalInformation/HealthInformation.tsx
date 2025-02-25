import React, { useState } from 'react';
import {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonButton,
    IonToggle,
    IonInput,
    IonIcon,
    IonCol,
    IonRow,
    IonFooter
} from '@ionic/react';
import { home, personCircle, save, closeCircle, create } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import withStepIndicator from '../../../components/withStepIndicator';
import { getSteps } from './stepsConfig';
import HorizontalStepIndicator from '../../../components/HorizontalStepIndicator';
import { ISubject } from '../../../types/subject.type';

const HealthInformation: React.FC = () => {
    const [comorbidities, setComorbidities] = useState({
        hypertension: false,
        diabetes: true,
        hyperlipidemia: false,
        heartDisease: false,
        previousStroke: true,
    });

    const [symptoms, setSymptoms] = useState({
        speechDifficulties: false,
        facialDrooping: true,
        visualProblems: false,
        armLt: true,
        armRt: false,
        legLt: false,
        legRt: true,
    });

    const [nhiss, setNhiss] = useState('');
    const [preMrs, setPreMrs] = useState('');

    const history = useHistory();
      const { subjectId } = useParams<{ subjectId: string }>();
      const [subject, setSubject] = useState<ISubject | null>(null);

    const toggleComorbidity = (key: keyof typeof comorbidities) => {
        setComorbidities({ ...comorbidities, [key]: !comorbidities[key] });
    };

    const toggleSymptom = (key: keyof typeof symptoms) => {
        setSymptoms({ ...symptoms, [key]: !symptoms[key] });
    };

    function handleSave(event: any): void {
        history.push('/pre-diagnosis');
    }

    function handleCancel(event: any): void {
        history.push('/select-assessment');
    }

    function handleNhiss(event: any): void {
        // Add navigation logic here
        history.push('/nhiss');
    }

    const steps = getSteps(subjectId);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton slot="start" fill="clear" routerLink="/home">
                        <IonIcon icon={home} />
                    </IonButton>
                    <IonTitle style={{ textAlign: 'center' }}>Health Information</IonTitle>
                    <IonButton slot="end" fill="clear">
                        <IonIcon icon={personCircle} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
            <HorizontalStepIndicator currentStep={2} totalSteps={steps.length} steps={steps} />

                <IonTitle className="ion-text-center" style={{ marginTop: '16px' }}>Comorbidity</IonTitle>

                <IonItem>
                    <IonLabel>Hypertension</IonLabel>
                    <IonToggle
                        checked={comorbidities.hypertension}
                        onIonChange={() => toggleComorbidity('hypertension')}
                    ></IonToggle>
                </IonItem>

                <IonItem>
                    <IonLabel>Diabetes mellitus</IonLabel>
                    <IonToggle
                        checked={comorbidities.diabetes}
                        onIonChange={() => toggleComorbidity('diabetes')}
                    ></IonToggle>
                </IonItem>

                <IonItem>
                    <IonLabel>Hyperlipidemia</IonLabel>
                    <IonToggle
                        checked={comorbidities.hyperlipidemia}
                        onIonChange={() => toggleComorbidity('hyperlipidemia')}
                    ></IonToggle>
                </IonItem>

                <IonItem>
                    <IonLabel>Heart disease</IonLabel>
                    <IonToggle
                        checked={comorbidities.heartDisease}
                        onIonChange={() => toggleComorbidity('heartDisease')}
                    ></IonToggle>
                </IonItem>

                <IonItem>
                    <IonLabel>Previous Stroke or TIA</IonLabel>
                    <IonToggle
                        checked={comorbidities.previousStroke}
                        onIonChange={() => toggleComorbidity('previousStroke')}
                    ></IonToggle>
                </IonItem>

                <IonTitle className="ion-text-center" style={{ marginTop: '16px' }}>Current Symptoms and Signs</IonTitle>

                <IonItem>
                    <IonLabel>Speech difficulties</IonLabel>
                    <IonToggle
                        checked={symptoms.speechDifficulties}
                        onIonChange={() => toggleSymptom('speechDifficulties')}
                    ></IonToggle>
                </IonItem>

                <IonItem>
                    <IonLabel>Facial drooping</IonLabel>
                    <IonToggle
                        checked={symptoms.facialDrooping}
                        onIonChange={() => toggleSymptom('facialDrooping')}
                    ></IonToggle>
                </IonItem>

                <IonItem>
                    <IonLabel>Visual problems</IonLabel>
                    <IonToggle
                        checked={symptoms.visualProblems}
                        onIonChange={() => toggleSymptom('visualProblems')}
                    ></IonToggle>
                </IonItem>

                <IonTitle className="ion-text-center" style={{ marginTop: '16px' }}>Arm/Leg Weakness</IonTitle>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Arm.Lt</IonLabel>
                            <IonToggle
                                checked={symptoms.armLt}
                                onIonChange={() => toggleSymptom('armLt')}
                            ></IonToggle>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Arm.Rt</IonLabel>
                            <IonToggle
                                checked={symptoms.armRt}
                                onIonChange={() => toggleSymptom('armRt')}
                            ></IonToggle>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Leg.Lt</IonLabel>
                            <IonToggle
                                checked={symptoms.legLt}
                                onIonChange={() => toggleSymptom('legLt')}
                            ></IonToggle>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Leg.Rt</IonLabel>
                            <IonToggle
                                checked={symptoms.legRt}
                                onIonChange={() => toggleSymptom('legRt')}
                            ></IonToggle>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonTitle className="ion-text-center" style={{ marginTop: '16px' }}>NHISS and Pre mRS</IonTitle>

                <IonItem>
                    <IonLabel>NHISS (max 42)</IonLabel>
                    <IonInput
                        value={nhiss}
                        onIonChange={(e) => setNhiss(e.detail.value!)}
                        placeholder="max 42"
                        style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
                    ></IonInput>
                    <IonButton fill="clear" onClick={handleNhiss}>
                        <IonIcon icon={create} />
                    </IonButton>
                </IonItem>

                <IonItem>
                    <IonLabel>Pre mRS</IonLabel>
                    <IonInput
                        value={preMrs}
                        onIonChange={(e) => setPreMrs(e.detail.value!)}
                        placeholder=""
                        style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
                    ></IonInput>
                </IonItem>
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
                </IonRow>
            </IonFooter>
        </IonPage>
    );
};



export default HealthInformation;
