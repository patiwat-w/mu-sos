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
import { createOutline, locationOutline, mailOutline, callOutline, cameraOutline, checkmarkDoneOutline, calendar } from 'ionicons/icons';
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
        image: 'normal',
        voice: 'normal',
        info: 'normal',
        result: 'normal',
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
        { label: 'Face', status: menuStatus.image, onClick: handleImageClick },
        { label: 'Voice', status: menuStatus.voice, onClick: handleVoiceClick },
        { label: 'Info', status: menuStatus.info, onClick: handleInfoClick },
        { label: 'Pre-Result', status: menuStatus.result, onClick: handleResultClick },
    ];

    return (
        <IonPage>
            <Header title='Subject Profile' />
            <IonContent>
                {/* Profile Card */}
                <div className="profile-card">
                    {/* <IonAvatar>
                        <img src={photoUrl || 'default-profile-image.jpg'} alt="Profile" />
                    </IonAvatar>
                    <IonLabel>{subject?.firstName} {subject?.lastName}</IonLabel>
                    <IonLabel>{subject?.phoneNumber}</IonLabel> */}

                    {/* Form Card */}
                    <IonCard  style={{ width: '100%' }}>
                        <IonCardHeader>
                            <IonTitle>Subject Information</IonTitle>
                            <IonButton onClick={handleInfoClick} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                {isEditing ? 'Save' : 'Edit'}
                            </IonButton>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonGrid style={{ width: '100%' }}>
                                <IonRow>
                                    <IonCol size="12" size-md="6">
                                        <IonItem>
                                            <IonLabel position="stacked" style={{ textAlign: 'left' }}>Subject ID</IonLabel>
                                            <IonInput value={subject?.subjectId} placeholder="Subject ID" style={{ textAlign: 'right' }} disabled={!isEditing} />
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size="12" size-md="6">
                                        <IonItem>
                                            <IonLabel position="stacked" style={{ textAlign: 'left' }}>HN</IonLabel>
                                            <IonInput value={subject?.hn} placeholder="HN" onIonChange={(e) => setHn(e.detail.value!)} style={{ textAlign: 'right' }} disabled={!isEditing} />
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="12" size-md="6">
                                        <IonItem>
                                            <IonLabel position="stacked" style={{ textAlign: 'left' }}>Subject Name</IonLabel>
                                            <IonInput value={subject?.subjectName} placeholder="Subject Name" onIonChange={(e) => setSubjectName(e.detail.value!)} style={{ textAlign: 'right' }} disabled={!isEditing} />
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size="12" size-md="6">
                                        <IonItem>
                                            <IonLabel position="stacked" style={{ textAlign: 'left' }}>Phone Number</IonLabel>
                                            <IonInput value={subject?.phoneNumber} placeholder="Phone Number" onIonChange={(e) => setPhoneNumber(e.detail.value!)} style={{ textAlign: 'right' }} disabled={!isEditing} />
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="12" size-md="6">
                                        <IonItem>
                                            <IonLabel position="stacked" style={{ textAlign: 'left' }}>Onset Time</IonLabel>
                                            <IonInput
                                                value={formatTime(subject?.onsetTime ?? null)}
                                                placeholder="Onset Time"
                                                readonly
                                                onClick={() => isEditing && setShowOnsetPicker(true)}
                                                style={{ textAlign: 'right' }}
                                                disabled={!isEditing}
                                            />
                                        </IonItem>
                                        <IonModal isOpen={showOnsetPicker}>
                                            <IonDatetime
                                                value={subject?.onsetTime}
                                                presentation="time"
                                                onIonChange={(e) => setOnsetTime(e.detail.value as string)}
                                            />
                                            <IonButton expand="full" onClick={() => setShowOnsetPicker(false)}>Set</IonButton>
                                        </IonModal>
                                    </IonCol>
                                    <IonCol size="12" size-md="6">
                                        <IonItem>
                                            <IonLabel position="stacked" style={{ textAlign: 'left' }}>Last Seen Normal Time</IonLabel>
                                            <IonInput
                                                value={formatDateTime(subject?.lastSeenNormalTime ?? null)}
                                                placeholder="Last Seen Normal Time"
                                                readonly
                                                onClick={() => isEditing && setShowLastSeenPicker(true)}
                                                style={{ textAlign: 'right' }}
                                                disabled={!isEditing}
                                            />
                                        </IonItem>
                                        <IonModal isOpen={showLastSeenPicker}>
                                            <IonDatetime
                                                value={subject?.lastSeenNormalTime}
                                                presentation="date-time"
                                                onIonChange={(e) => setLastSeenNormalTime(e.detail.value as string)}
                                            />
                                            <IonButton expand="full" onClick={() => setShowLastSeenPicker(false)}>Set</IonButton>
                                        </IonModal>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>
                    {/* Optional: Member Since */}
                </div>
                {/* Segment Tabs */}
                {/* <IonSegment>
                    <IonSegmentButton value="All">
                        <IonLabel>All</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="Pending">
                        <IonLabel>Pending</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="Submited">
                        <IonLabel>Submited</IonLabel>
                    </IonSegmentButton>
                </IonSegment> */}

                {/* Content based on selected segment */}
                <IonCard>
                    <IonCardHeader>
                        <IonTitle>Select Collection Type</IonTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            <IonSegment
                                        value={1}
                                        // onIonChange={(e) => setGender(e.detail.value as string)}
                                        //style={{ maxWidth:'350px' ,height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} // Align to the right
                                      >
                                        <IonSegmentButton value="Unspecified" style={{ flex: '1' }}>
                                          <IonLabel>Image</IonLabel>
                                        </IonSegmentButton>
                                        <IonSegmentButton value="Male" style={{ flex: '1' }}>
                                          <IonLabel>Voice</IonLabel>
                                        </IonSegmentButton>
                                        <IonSegmentButton value="Female" style={{ flex: '1' }}>
                                          <IonLabel>Comorbidities</IonLabel>
                                        </IonSegmentButton>
                                        <IonSegmentButton value="Female" style={{ flex: '1' }}>
                                          <IonLabel>Pre-Results</IonLabel>
                                        </IonSegmentButton>
                                      </IonSegment>

                            {steps.map((step, index) => (
                                <IonRow key={index} style={{ alignItems: 'center', marginBottom: '20px' }}>
                                    <IonCol size="2" className="ion-text-center">
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: currentStep === index + 1 ? 'blue' : 'gray', margin: '0 auto' }}></div>
                                        {index < steps.length - 1 && (
                                            <div style={{ width: '2px', height: '40px', backgroundColor: 'gray', margin: '0 auto' }}></div>
                                        )}
                                    </IonCol>
                                    <IonCol size="10">
                                        <div style={{ opacity: currentStep === index + 1 ? 1 : 0.5 }}>
                                            <AssessmentButton
                                                label={step.label}
                                                status={step.status}
                                                onClick={step.onClick}
                                                disabled={currentStep !== index + 1}
                                            />
                                        </div>
                                    </IonCol>
                                </IonRow>
                            ))}
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

