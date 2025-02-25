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
import ToggleButtonGroup from '../../../components/ToggleButtonGroup';
import { ISubject } from '../../../types/subject.type';

const HealthInformation: React.FC = () => {
    const [comorbidities, setComorbidities] = useState({
        hypertension: 'Default',
        diabetes: 'Yes',
        hyperlipidemia: 'Default',
        heartDisease: 'Default',
        previousStroke: 'Yes',
    });

    const [symptoms, setSymptoms] = useState({
        speechDifficulties: 'Default',
        facialDrooping: 'Yes',
        visualProblems: 'Default',
        armLt: 'Yes',
        armRt: 'Default',
        legLt: 'Default',
        legRt: 'Yes',
    });

    const [nhiss, setNhiss] = useState('');
    const [preMrs, setPreMrs] = useState('');

    const history = useHistory();
    const { subjectId } = useParams<{ subjectId: string }>();
    const [subject, setSubject] = useState<ISubject | null>(null);

    const handleComorbidityChange = (key: keyof typeof comorbidities, value: string) => {
        setComorbidities({ ...comorbidities, [key]: value });
    };

    const handleSymptomChange = (key: keyof typeof symptoms, value: string) => {
        setSymptoms({ ...symptoms, [key]: value });
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
                    <ToggleButtonGroup
                        value={comorbidities.hypertension}
                        onChange={(value) => handleComorbidityChange('hypertension', value)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel>Diabetes mellitus</IonLabel>
                    <ToggleButtonGroup
                        value={comorbidities.diabetes}
                        onChange={(value) => handleComorbidityChange('diabetes', value)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel>Hyperlipidemia</IonLabel>
                    <ToggleButtonGroup
                        value={comorbidities.hyperlipidemia}
                        onChange={(value) => handleComorbidityChange('hyperlipidemia', value)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel>Heart disease</IonLabel>
                    <ToggleButtonGroup
                        value={comorbidities.heartDisease}
                        onChange={(value) => handleComorbidityChange('heartDisease', value)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel>Previous Stroke or TIA</IonLabel>
                    <ToggleButtonGroup
                        value={comorbidities.previousStroke}
                        onChange={(value) => handleComorbidityChange('previousStroke', value)}
                    />
                </IonItem>

                <IonTitle className="ion-text-center" style={{ marginTop: '16px' }}>Current Symptoms and Signs</IonTitle>

                <IonItem>
                    <IonLabel>Speech difficulties</IonLabel>
                    <ToggleButtonGroup
                        value={symptoms.speechDifficulties}
                        onChange={(value) => handleSymptomChange('speechDifficulties', value)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel>Facial drooping</IonLabel>
                    <ToggleButtonGroup
                        value={symptoms.facialDrooping}
                        onChange={(value) => handleSymptomChange('facialDrooping', value)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel>Visual problems</IonLabel>
                    <ToggleButtonGroup
                        value={symptoms.visualProblems}
                        onChange={(value) => handleSymptomChange('visualProblems', value)}
                    />
                </IonItem>

                <IonTitle className="ion-text-center" style={{ marginTop: '16px' }}>Arm/Leg Weakness</IonTitle>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Arm.Lt</IonLabel>
                            <ToggleButtonGroup
                                value={symptoms.armLt}
                                onChange={(value) => handleSymptomChange('armLt', value)}
                            />
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Arm.Rt</IonLabel>
                            <ToggleButtonGroup
                                value={symptoms.armRt}
                                onChange={(value) => handleSymptomChange('armRt', value)}
                            />
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Leg.Lt</IonLabel>
                            <ToggleButtonGroup
                                value={symptoms.legLt}
                                onChange={(value) => handleSymptomChange('legLt', value)}
                            />
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Leg.Rt</IonLabel>
                            <ToggleButtonGroup
                                value={symptoms.legRt}
                                onChange={(value) => handleSymptomChange('legRt', value)}
                            />
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
