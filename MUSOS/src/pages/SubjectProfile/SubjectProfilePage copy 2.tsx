import React, { useEffect, useState } from 'react';
import {
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonMenuButton,
    IonPage,
    IonCardHeader,
    IonFooter
} from '@ionic/react';
import { IonAvatar, IonLabel, IonSegment, IonSegmentButton, IonItem, IonInput, IonModal, IonDatetime, IonCard, IonCardContent } from '@ionic/react';
import { createOutline, locationOutline, mailOutline, callOutline, cameraOutline, checkmarkDoneOutline, calendar, medical } from 'ionicons/icons';
import { personCircle, settings, helpCircle, addCircle, logOutOutline, addCircleOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { subjectInfoManagementService } from '../../services/subjectInfoManagementService';
import { ISubject } from '../../types/subject.type';
import SelectAssessment from '../Assessmensts/SelectAssessment/SelectAssessment';
import AssessmentButton from '../../components/AssessmentButton';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

const SubjectProfilePage: React.FC = () => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [subject, setSubject] = useState<ISubject | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [hn, setHn] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [onsetTime, setOnsetTime] = useState<string | null>(null);
    const [subjectName, setSubjectName] = useState<string | null>(null);
    const [lastSeenNormalTime, setLastSeenNormalTime] = useState<string | null>(null);
    const [showOnsetPicker, setShowOnsetPicker] = useState<boolean>(false);
    const [showLastSeenPicker, setShowLastSeenPicker] = useState<boolean>(false);
    const [menuStatus, setMenuStatus] = useState({
        image: 'pending',
        voice: 'pending',
        info: 'pending',
        result: 'pending',
        face: 'pending',
        aim: 'pending',
        speech: 'pending',
        preResult: 'pending',
        subject: 'pending',
        medical: 'pending',
    });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(1);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            // Save changes logic here
        }
    };

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

    const handleImageClick = () => {
        setMenuStatus({ ...menuStatus, image: 'in-progress' });
        history.push('/image-assessment/' + id);
    };

    const handleVoiceClick = () => {
        setMenuStatus({ ...menuStatus, voice: 'in-progress' });
        history.push('/voice-assessment/' + id);
    };

    const handleInfoClick = () => {
        setMenuStatus({ ...menuStatus, info: 'in-progress' });
        history.push('/personal-information/' + id);
    };

    const handleResultClick = () => {
        setMenuStatus({ ...menuStatus, result: 'in-progress' });
        history.push('/result/' + id);
    };

    function handleCancel(): void {
        location.href = '/home';
    }

    function handleSubmit(): void {
        // Submit logic here
    }

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const formatDateTime = (dateString: string | null) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy HH:mm');
    };

    const formatTime = (timeString: string | null) => {
        if (!timeString) return '';
        const date = new Date(timeString);
        return format(date, 'HH:mm');
    };

    const steps = [
        { label: 'Subject', status: menuStatus.image, onClick: handleInfoClick },
        { label: 'Medical', status: menuStatus.image, onClick: handleInfoClick },
        { label: 'Face', status: menuStatus.image, onClick: handleImageClick },
        { label: 'Aim', status: menuStatus.voice, onClick: handleImageClick },
        { label: 'Speech', status: menuStatus.voice, onClick: handleVoiceClick },
        { label: 'Pre-Result', status: menuStatus.result, onClick: handleResultClick },
    ];

    return (
        <IonPage>
            <Header title='Subject Profile' />

           


            <IonContent>
                 {/* Profile Card */}
                 <div className="profile-card">
                        <div className="profile-header">
                          <IonAvatar>
                            <img src={photoUrl || 'images/default-profile-image.svg'} alt="Profile" />
                          </IonAvatar>
                          <div className="profile-info">
                            <IonLabel className="profile-label"><strong>Subject ID</strong>:{subject?.subjectId || '-'}</IonLabel>
                            <IonLabel className="profile-label"><strong>Subject Name</strong>:{subject?.subjectName || '-'}</IonLabel>
                          </div>
                        </div>
                
                        <IonGrid>
                          <IonRow>
                          <IonCol size="12">
                              <IonLabel></IonLabel>
                              {/* <IonButton 
                                  shape="round" 
                                  fill="solid" 
                                  color="primary"
                                  onClick={handleAddSubject}
                              >
                                <IonIcon icon={addCircleOutline} />
                              </IonButton> */}
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                
                        {/* Optional: Member Since 
                        <IonLabel class="member-since">Add Subject </IonLabel>
                         */}
                      </div>
     
                <IonCard>
                    <IonCardHeader>
                        <IonTitle>Select Collection Type</IonTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
    

                             {/* Progress  */}          

                            <IonGrid>
                                <IonRow>
                                    {steps.map((step, index) => (
                                        <IonCol key={index} className="ion-text-center">
                                            <IonIcon
                                                icon={
                                                    step.status === 'pending'
                                                        ? helpCircle
                                                        : step.status === 'in-progress'
                                                        ? createOutline
                                                        : checkmarkDoneOutline
                                                }
                                                style={{ fontSize: '20px', color: currentStep === index + 1 ? 'blue' : 'gray' }}
                                            />
                                            <div style={{ opacity: currentStep === index + 1 ? 1 : 0.5, marginTop: '10px' }}>
                                                <AssessmentButton
                                                    label={step.label}
                                                    status={step.status}
                                                    onClick={step.onClick}
                                                    disabled={currentStep !== index + 1}
                                                />
                                            </div>
                                        </IonCol>
                                    ))}
                                </IonRow>
                            </IonGrid>
                        </IonGrid>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <IonButton onClick={handlePreviousStep} disabled={currentStep === 1}>Previous</IonButton>
                            {currentStep < steps.length && (
                                <IonButton onClick={handleNextStep}>Next</IonButton>
                            )}
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>

            <IonFooter style={{ backgroundColor: '#f8f8f8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <IonButton color="primary" onClick={handleCancel} style={{ flex: 1, marginRight: '10px' }}>
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

