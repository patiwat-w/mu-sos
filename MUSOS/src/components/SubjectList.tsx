import React, { useEffect, useState } from 'react';
import { apiSubjectDataService } from '../services/apiSubjectDataService';
import { IonContent, IonList, IonItem, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent, IonSpinner } from '@ionic/react';
import { ISubject } from '../types/subject.type';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns-tz';
import { th } from 'date-fns/locale';

interface SubjectListProps {
    subjects?: ISubject[];
}

const SubjectList: React.FC<SubjectListProps> = () => {
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiSubjectDataService.getList();
                setSubjects(data);
            } catch (error: any) {
                setError(error.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy', { locale: th });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleItemClick = (subject: ISubject) => {
        history.push({
            pathname: '/subject-profile/' + subject.id,
            state: { subject }
        });
    };

    return (
        <IonContent>
            <IonList>
                {subjects.map((subject, index) => (
                    <IonItem key={index} onClick={() => handleItemClick(subject)}>
                        <IonLabel>
                            <h2>{subject.id}</h2>
                            <p>{subject.subjectName}</p>
                            <p>{subject.phoneNumber}</p>
                            <p>{subject.hn}</p>
                            <p>{formatDate(subject.createdDate)}: {subject.createdBy}</p>
                        </IonLabel>
                    </IonItem>
                ))}
            </IonList>
            {/* <IonInfiniteScroll
                onIonInfinite={(ev) => {
                    fetchMoreData();
                    (ev.target as HTMLIonInfiniteScrollElement).complete();
                }}
                threshold="100px"
                disabled={isInfiniteDisabled}
            >
                <IonInfiniteScrollContent
                    loadingSpinner="bubbles"
                    loadingText="Loading more subjects..."
                >
                    {isInfiniteDisabled && <IonSpinner />}
                </IonInfiniteScrollContent>
            </IonInfiniteScroll> */}
        </IonContent>
    );
};

export default SubjectList;