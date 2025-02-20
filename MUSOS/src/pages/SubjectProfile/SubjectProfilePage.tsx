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
    IonPage

} from '@ionic/react';
import { IonAvatar, IonLabel,  IonSegment, IonSegmentButton, } from '@ionic/react';
import { createOutline, locationOutline, mailOutline, callOutline, cameraOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { personCircle, settings, helpCircle, addCircle, logOutOutline, addCircleOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { apiSubjectDataService } from '../../services/apiSubjectDataService';
import { ISubject } from '../../types/subject.type';

const SubjectProfilePage: React.FC = () => {
    const history = useHistory();
    const { subjectId } = useParams<{ subjectId: string }>();
    const [subject, setSubject] = useState<ISubject | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

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

    return (
        <IonPage>
            <Header title='Subject Profile' />
            <IonContent>
                {/* Profile Card */}
                <div className="profile-card">
                    <IonAvatar>
                        <img src={photoUrl || 'default-profile-image.jpg'} alt="Profile" />
                    </IonAvatar>
                    <IonLabel>{subject?.firstName} {subject?.lastName}</IonLabel>
                    <IonLabel>{subject?.phoneNumber}</IonLabel>

                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonLabel></IonLabel>
                                <IonButton shape="round" fill="solid" color="primary">
                                    <IonIcon icon={addCircleOutline} />
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    {/* Optional: Member Since */}
                    <IonLabel class="member-since">Add Subject </IonLabel>
                </div>

                {/* Segment Tabs */}
                <IonSegment>
                    <IonSegmentButton value="All">
                        <IonLabel>All</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="Pending">
                        <IonLabel>Pending</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="Submited">
                        <IonLabel>Submited</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                {/* Content based on selected segment */}
            </IonContent>
        </IonPage>
    );
};

export default SubjectProfilePage;

