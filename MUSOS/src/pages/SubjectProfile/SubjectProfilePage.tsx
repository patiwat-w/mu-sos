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
import { IonAvatar, IonLabel,  IonSegment, IonSegmentButton, IonItem, IonInput, IonModal, IonDatetime, IonCard, IonCardContent } from '@ionic/react';
import { createOutline, locationOutline, mailOutline, callOutline, cameraOutline, checkmarkDoneOutline, calendar } from 'ionicons/icons';
import { personCircle, settings, helpCircle, addCircle, logOutOutline, addCircleOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { apiSubjectDataService } from '../../services/apiSubjectDataService';
import { ISubject } from '../../types/subject.type';
import SelectAssessment from '../SelectAssessment/SelectAssessment';
import AssessmentButton from '../../components/AssessmentButton';

const SubjectProfilePage: React.FC = () => {
    const history = useHistory();
    const { subjectId } = useParams<{ subjectId: string }>();
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
    useEffect(() => {
        const fetchSubject = async () => {
            try {
              
                const data = await apiSubjectDataService.getData(subjectId);
                setSubject(data);
            } catch (error) {
                console.error('Error fetching subject data:', error);
            }
        };

        fetchSubject();
    }, [subjectId]);

    const handleImageClick = () => {
        setMenuStatus({ ...menuStatus, image: 'done' });
        history.push('/image-assessment');
      };
    
      const handleVoiceClick = () => {
        setMenuStatus({ ...menuStatus, voice: 'done' });
        history.push('/voice-assessment');
      };
    
      const handleInfoClick = () => {
        setMenuStatus({ ...menuStatus, info: 'done' });
        history.push('/personal-information');
      };
    
      const handleResultClick = () => {
        setMenuStatus({ ...menuStatus, result: 'done' });
        history.push('/result');
      };

    function handleCancel(): void {
       location.href = '/home'; 
        
    }

    function handleSubmit(): void {
       
    }

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
                    <IonCard>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12" size-md="6">
                                        <IonItem>
                                            <IonLabel position="stacked" style={{ textAlign: 'left' }}>Subject ID</IonLabel>
                                            <IonInput value={subject?.subjectId} placeholder="Subject ID"  style={{ textAlign: 'right' }} />
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size="12" size-md="6">
                                        <IonItem>
                                            <IonLabel position="stacked" style={{ textAlign: 'left' }}>HN</IonLabel>
                                            <IonInput value={subject?.hn} placeholder="HN" onIonChange={(e) => setHn(e.detail.value!)} style={{ textAlign: 'right' }} />
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                <IonCol size="12" size-md="6">
                                        <IonItem>
                                            <IonLabel position="stacked" style={{ textAlign: 'left' }}>Subject Name</IonLabel>
                                            <IonInput value={subject?.subjectName} placeholder="Subject Name" onIonChange={(e) => setPhoneNumber(e.detail.value!)} style={{ textAlign: 'right' }} />
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size="12" size-md="6">
                                        <IonItem>
                                            <IonLabel position="stacked" style={{ textAlign: 'left' }}>Phone Number</IonLabel>
                                            <IonInput value={subject?.phoneNumber} placeholder="Phone Number" onIonChange={(e) => setPhoneNumber(e.detail.value!)} style={{ textAlign: 'right' }} />
                                        </IonItem>
                                    </IonCol>
                                    
                                </IonRow>
                                <IonRow>
                                <IonCol size="12" size-md="6">
                                        <IonItem>
                                            <IonLabel position="stacked" style={{ textAlign: 'left' }}>Onset Time</IonLabel>
                                            <IonInput
                                                value={subject?.onsetTime ? new Date(subject?.onsetTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                                placeholder="Onset Time"
                                                readonly
                                                onClick={() => setShowOnsetPicker(true)}
                                                style={{ textAlign: 'right' }}
                                            />
                                            <IonIcon icon={calendar} slot="end" onClick={() => setShowOnsetPicker(true)} />
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
                                                value={subject?.lastSeenNormalTime}
                                                placeholder="Last Seen Normal Time"
                                                readonly
                                                onClick={() => setShowLastSeenPicker(true)}
                                                style={{ textAlign: 'right' }}
                                            />
                                            <IonIcon icon={calendar} slot="end" onClick={() => setShowLastSeenPicker(true)} />
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
                        <IonTitle>Select Collection Type </IonTitle>
                    </IonCardHeader>
                        <IonCardContent>

                       
                <IonGrid>
                <IonRow>
                    <IonCol size="6" className="ion-text-center"> {/* Keep ion-text-center for overall alignment */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Center the button */}
                            <AssessmentButton
                                label="Image"
                                status={menuStatus.image}
                                onClick={handleImageClick}
                            />
                        </div>
                    </IonCol>
                    <IonCol size="6" className="ion-text-center"> {/* Keep ion-text-center */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Center the button */}
                            <AssessmentButton
                                label="Voice"
                                status={menuStatus.voice}
                                onClick={handleVoiceClick}
                            />
                        </div>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="6" className="ion-text-center"> {/* Keep ion-text-center */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Center the button */}
                            <AssessmentButton
                                label="Info"
                                status={menuStatus.info}
                                onClick={handleInfoClick}
                            />
                        </div>
                    </IonCol>
                    <IonCol size="6" className="ion-text-center"> {/* Keep ion-text-center */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Center the button */}
                            <AssessmentButton
                                label="Pre-Result"
                                status={menuStatus.result}
                                onClick={handleResultClick}
                            />
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid> 
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

