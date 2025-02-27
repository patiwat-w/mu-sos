import React from 'react';
import { IonAvatar, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { ISubject } from '../types/subject.type';
import { useHistory } from 'react-router-dom';

interface SubjectProfileHeaderProps {
    subject: ISubject | null;
    selectedSegment: string;

}

const SubjectProfileHeader: React.FC<SubjectProfileHeaderProps> = ({ subject, selectedSegment }) => {
    const history = useHistory();

    const onSegmentChange = (value: string) => {
      
        switch (value) {
            case 'Subject':
                history.push('/personal-information/' + subject?.subjectId);
                break;
            case 'Medical':
                history.push('/medical-information/' + subject?.subjectId);
                break;
            case 'Face':
                history.push('/face-assessment/' + subject?.subjectId);
                break;
            case 'Aim':
                history.push('/aim-assessment/' + subject?.subjectId);
                break;
            case 'Speech':
                history.push('/speech-assessment/' + subject?.subjectId);
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
                    <IonLabel className="profile-label"><strong>Subject ID</strong>: {subject?.subjectId || '-'}</IonLabel>
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
                <IonSegmentButton value="Medical">
                    <IonLabel>Medical</IonLabel>
                </IonSegmentButton>
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