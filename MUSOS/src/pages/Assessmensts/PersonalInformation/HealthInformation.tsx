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
import ToggleButtonGroupDynamic from '../../../components/ToggleButtonGroupDynamic';
import { ISubject } from '../../../types/subject.type';
import { min } from 'date-fns';

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

    const createOptions = (selectedValue: string) => [
        { label: 'UN', value: 'UN', selected: selectedValue === 'UN' },
        { label: 'Yes', value: 'Yes', selected: selectedValue === 'Yes' },
        { label: 'No', value: 'No', selected: selectedValue === 'No' }
        
    ];

    const titleStyle = { textAlign: 'center', marginTop: '16px', fontSize: '1.2rem' };
    const labelStyle = { width: '150px', minWidth: '150px' };

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

                <IonTitle style={titleStyle}>Comorbidity</IonTitle>

                <IonItem>
                    <IonLabel style={labelStyle}>Hypertension</IonLabel>
                    <ToggleButtonGroupDynamic
                        options={createOptions(comorbidities.hypertension)}
                        onChange={(value) => handleComorbidityChange('hypertension', value)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel style={labelStyle}>Diabetes mellitus</IonLabel>
                    <ToggleButtonGroupDynamic
                        options={createOptions(comorbidities.diabetes)}
                        onChange={(value) => handleComorbidityChange('diabetes', value)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel style={labelStyle}>Hyperlipidemia</IonLabel>
                    <ToggleButtonGroupDynamic
                        options={createOptions(comorbidities.hyperlipidemia)}
                        onChange={(value) => handleComorbidityChange('hyperlipidemia', value)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel style={labelStyle}>Heart disease</IonLabel>
                    <ToggleButtonGroupDynamic
                        options={createOptions(comorbidities.heartDisease)}
                        onChange={(value) => handleComorbidityChange('heartDisease', value)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel style={labelStyle}>Previous Stroke or TIA</IonLabel>
                    <ToggleButtonGroupDynamic
                        options={createOptions(comorbidities.previousStroke)}
                        onChange={(value) => handleComorbidityChange('previousStroke', value)}
                    />
                </IonItem>

                <IonTitle style={titleStyle}>Current Symptoms and Signs</IonTitle>

                <IonItem>
                    <IonLabel style={labelStyle}>Speech difficulties</IonLabel>
                    <ToggleButtonGroupDynamic
                        options={createOptions(symptoms.speechDifficulties)}
                        onChange={(value) => handleSymptomChange('speechDifficulties', value)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel style={labelStyle}>Facial drooping</IonLabel>
                    <ToggleButtonGroupDynamic
                        options={createOptions(symptoms.facialDrooping)}
                        onChange={(value) => handleSymptomChange('facialDrooping', value)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel style={labelStyle}>Visual problems</IonLabel>
                    <ToggleButtonGroupDynamic
                        options={createOptions(symptoms.visualProblems)}
                        onChange={(value) => handleSymptomChange('visualProblems', value)}
                    />
                </IonItem>

                <IonTitle style={titleStyle}>Arm/Leg Weakness</IonTitle>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel style={labelStyle}>Arm.Lt</IonLabel>
                            <ToggleButtonGroupDynamic
                                options={createOptions(symptoms.armLt)}
                                onChange={(value) => handleSymptomChange('armLt', value)}
                            />
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel style={labelStyle}>Arm.Rt</IonLabel>
                            <ToggleButtonGroupDynamic
                                options={createOptions(symptoms.armRt)}
                                onChange={(value) => handleSymptomChange('armRt', value)}
                            />
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel style={labelStyle}>Leg.Lt</IonLabel>
                            <ToggleButtonGroupDynamic
                                options={createOptions(symptoms.legLt)}
                                onChange={(value) => handleSymptomChange('legLt', value)}
                            />
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel style={labelStyle}>Leg.Rt</IonLabel>
                            <ToggleButtonGroupDynamic
                                options={createOptions(symptoms.legRt)}
                                onChange={(value) => handleSymptomChange('legRt', value)}
                            />
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonTitle style={titleStyle}>NHISS and Pre mRS</IonTitle>

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
