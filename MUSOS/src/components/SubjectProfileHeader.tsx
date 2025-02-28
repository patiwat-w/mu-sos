import React from 'react';
import { IonAvatar, IonLabel, IonSegment, IonSegmentButton, IonButton, IonIcon } from '@ionic/react';
import { ISubject } from '../types/subject.type';
import { useHistory, useParams } from 'react-router-dom';
import { send } from 'ionicons/icons';
import './SubjectProfileHeader.css';

interface SubjectProfileHeaderProps {
    subject: ISubject | null;
    subjectId: string | null;
    selectedSegment: string;
    onSubmit: () => void;
}

const SubjectProfileHeader: React.FC<SubjectProfileHeaderProps> = ({ subjectId, subject, selectedSegment, onSubmit }) => {
    const history = useHistory();
    const { subjectId: paramSubjectId } = useParams<{ subjectId: string }>();

    const onSegmentChange = (value: string) => {
        const id = subjectId || paramSubjectId;
        if (!id) {
            console.error('Subject ID is null');
            return;
        }
        const routes: Record<string, string> = {
            'Subject': '/personal-information/',
            'Medical': '/medical-information/',
            'Face': '/face-assessment/',
            'Aim': '/aim-assessment/',
            'Speech': '/voice-assessment/',
        };
        if (routes[value]) {
            history.push(routes[value] + id);
        }
    };

    return (
        <div className="profile-card">
            <div className="profile-header">
                <div className="profile-info-container">
                    <IonAvatar>
                        <img src={subject?.photoUrl || 'images/default-profile-image.svg'} alt="Profile" />
                    </IonAvatar>
                    <IonLabel className="profile-label">
                        <strong>Subject ID</strong>: {subject?.subjectId || '-'} : {subjectId || paramSubjectId || '-'}
                    </IonLabel>
                </div>
                <IonButton onClick={onSubmit} className="submit-button">
                    <IonIcon icon={send} slot="start" />
                    Submit
                </IonButton>
            </div>

            <IonLabel>Select Collection Type</IonLabel>
            <IonSegment value={selectedSegment} onIonChange={(e) => onSegmentChange(e.detail.value as string)}>
                <IonSegmentButton value="Subject">
                    <IonLabel>Subject</IonLabel>
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
