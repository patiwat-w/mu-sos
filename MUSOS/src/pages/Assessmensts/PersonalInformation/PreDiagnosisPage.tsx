import React, { useState } from 'react';
import {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonTextarea,
    IonButton,
    IonIcon,
    IonCol,
    IonRow,
    IonFooter
} from '@ionic/react';
import { home, personCircle, save, closeCircle } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { apiSubjectDataService } from '../../../services/apiSubjectDataService';


const PreDiagnosisPage: React.FC = () => {
     const history = useHistory();

     // Add state for form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
        notes: ''
    });
    
     async function handleSave(event: any): Promise<void> {

        try {
            let response = await apiSubjectDataService.postData(formData);
            if(response){
                //alert(JSON.stringify(response))
            }
            // Navigate to select-assessment page after successful submit
            history.push('/select-assessment');
        } catch (error) {
            console.error('Error submitting data:', error);
            // Show error message to user
        }

        
    }

    function handleCancel(event: any): void {
        history.push('/select-assessment');
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton slot="start" fill="clear" routerLink="/home">
                        <IonIcon icon={home} />
                    </IonButton>
                    <IonTitle style={{ textAlign: 'center' }}>Pre-Diagnosis</IonTitle>
                    <IonButton slot="end" fill="clear">
                        <IonIcon icon={personCircle} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonTextarea
                    placeholder="Neurologist or Physician or Stroke Nurse input pre-diagnosis"
                    rows={10}
                    style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', width: '100%' }}
                ></IonTextarea>

               
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

export default PreDiagnosisPage;
