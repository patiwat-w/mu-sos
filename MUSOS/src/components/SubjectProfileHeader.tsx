import React from 'react';
import { IonAvatar, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { ISubject } from '../types/subject.type';
import { useHistory, useParams } from 'react-router-dom';

interface SubjectProfileHeaderProps {
    subject: ISubject | null;
    subjectId: string | null;
    selectedSegment: string;

}

const SubjectProfileHeader: React.FC<SubjectProfileHeaderProps> = ({ subjectId,subject, selectedSegment }) => {
    const history = useHistory();
    const { subjectId: paramSubjectId } = useParams<{ subjectId: string }>();

    const onSegmentChange = (value: string) => {
        const id = subjectId || paramSubjectId; // Use subjectId from props or URL
        if (!id) {
            console.error('Subject ID is null');
            return;
        }
        switch (value) {
            case 'Subject':
                history.push('/personal-information/' +  id);
                break;
            case 'Medical':
                history.push('/medical-information/' +  id);
                break;
            case 'Face':
                history.push('/face-assessment/' +  id);
                break;
            case 'Aim':
                history.push('/aim-assessment/' +  id);
                break;
            case 'Speech':
                history.push('/voice-assessment/' +  id);
                break;
            default:
                break;
        }
    };

    return (
        <div className="profile-card">
            <div className="profile-header">
                <IonAvatar>
                    <img src={subject?.photoUrl || 'images/default-profile-image.svg'} alt="Profile" />
                </IonAvatar>
                <div className="profile-info">
                    <IonLabel className="profile-label"><strong>Subject ID</strong>: {subject?.subjectId  || '-'} :  {subjectId || paramSubjectId || '-'}</IonLabel>
                </div>
            </div>
            <IonLabel>Select Collection Type</IonLabel>
            <IonSegment
                value={selectedSegment}
                onIonChange={(e) => onSegmentChange(e.detail.value as string)}
            >
                <IonSegmentButton value="Subject">
                    <IonLabel>Subject</IonLabel>
                </IonSegmentButton>
                {/* <IonSegmentButton value="Medical">
                    <IonLabel>Medical</IonLabel>
                </IonSegmentButton> */}
                <IonSegmentButton value="Face">
                    <IonLabel>Face</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Aim">
                    <IonLabel>Aim</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Speech">
                    <IonLabel>Speech</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        </div>
    );
};

export default SubjectProfileHeader;