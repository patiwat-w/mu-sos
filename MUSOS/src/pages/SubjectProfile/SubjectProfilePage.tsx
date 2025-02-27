import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonFooter,
    IonButton,
    IonTitle,
    IonGrid
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { subjectInfoManagementService } from '../../services/subjectInfoManagementService';
import { ISubject } from '../../types/subject.type';
import PersonalInformationPage from '../Assessmensts/PersonalInformation/PersonalInformation';
import SubjectProfileHeader from '../../components/SubjectProfileHeader';
import './SubjectProfilePage.css'; // Import the CSS file

const SubjectProfilePage: React.FC = () => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [subject, setSubject] = useState<ISubject | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [selectedSegment, setSelectedSegment] = useState<string>('Subject');

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const data = await subjectInfoManagementService.getData(id);
                setSubject(data);
            } catch (error) {
                console.error('Error fetching subject data:', error);
            }
        };

        fetchSubject();
    }, [id]);

    const handleSegmentChange = (value: string) => {
        setSelectedSegment(value);
        switch (value) {
            case 'Subject':
                history.push('/personal-information/' + id);
                break;
            case 'Medical':
                history.push('/medical-information/' + id);
                break;
            case 'Face':
                history.push('/face-assessment/' + id);
                break;
            case 'Aim':
                history.push('/aim-assessment/' + id);
                break;
            case 'Speech':
                history.push('/speech-assessment/' + id);
                break;
            default:
                break;
        }
    };

    const renderContent = () => {
        switch (selectedSegment) {
            case 'Subject':
                return <PersonalInformationPage className="full-height"></PersonalInformationPage>;
            case 'Medical':
                return <div className="full-height">Medical Content</div>;
            case 'Face':
                return <div className="full-height">Face Content</div>;
            case 'Aim':
                return <div className="full-height">Aim Content</div>;
            case 'Speech':
                return <div className="full-height">Speech Content</div>;
            default:
                return null;
        }
    };

    function handleSubmit(event: any): void {
        throw new Error('Function not implemented.');
    }

    return (
        <IonPage>
            
            <Header title='Subject Profile' />

            <IonContent>
                <SubjectProfileHeader 
                    subject={subject} 
                    selectedSegment={selectedSegment}
                   
                />


                <IonCard className="full-height">
                    <IonCardHeader>
                        <IonTitle>Subject Information</IonTitle>
                    </IonCardHeader>
                    <IonCardContent className="ion-card-content-full-height">
                        <IonGrid className="full-height">
                            {renderContent()}
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
            </IonContent>

            <IonFooter style={{ backgroundColor: '#f8f8f8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <IonButton color="primary" onClick={() => history.push('/home')} style={{ flex: 1, marginRight: '10px' }}>
                        Back
                    </IonButton>
                    <IonButton color="primary" onClick={handleSubmit} style={{ flex: 1, marginLeft: '10px' }}>
                        Submit
                    </IonButton>
                </div>
            </IonFooter>
        </IonPage>
    );
};

export default SubjectProfilePage;

