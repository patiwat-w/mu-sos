import React, { useEffect, useState } from 'react';
import { apiSubjectDataService } from '../services/apiSubjectDataService';
import { IonContent, IonList, IonItem, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent, IonSpinner } from '@ionic/react';
import { ISubject } from '../types/subject.type';
import { useHistory } from 'react-router-dom';

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
            } catch (error : any) {
                setError(error.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

      const handleItemClick = (subject: ISubject) => {
        history.push({

          pathname: '/subject-profile/'+subject.subjectId,
          state: { subject }
        });
      };

    return (
        <IonContent>
                <IonList>
                  {subjects.map((subject, index) => (
                    <IonItem key={index} onClick={() => handleItemClick(subject)}>
                      <IonLabel>
                        <h2>{subject.subjectId}</h2>
                        <p>{subject.phoneNumber}</p>
                        <p>{subject.onsetTime}</p>
                        <p>{subject.lastSeenNormalTime}</p>
                        <p>{subject.createdDate}</p>
                        <p>{subject.createdBy}</p>
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