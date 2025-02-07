import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSpinner
} from '@ionic/react';
import Header from '../../components/Header';

interface Subject {
  id: string;
  date: string;
  status: string;
}

const SubjectListPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Initial load
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    // Simulate fetching data from an API
    setTimeout(() => {
      const newSubjects = Array.from({ length: 20 }, (_, i) => ({
        id: `Subject ${subjects.length + i + 1}`,
        date: new Date().toLocaleDateString(),
        status: Math.random() > 0.5 ? 'Completed' : 'Pending'
      }));
      setSubjects([...subjects, ...newSubjects]);
      if (subjects.length + newSubjects.length >= 100) {
        setInfiniteDisabled(true);
      }
    }, 1000);
  };

  const handleItemClick = (subject: Subject) => {
    history.push({
      pathname: '/select-assessment',
      state: { subject }
    });
  };

  return (
    <IonPage>
      <Header title="Subject List" />
      <IonContent>
        <IonList>
          {subjects.map((subject, index) => (
            <IonItem key={index} onClick={() => handleItemClick(subject)}>
              <IonLabel>
                <h2>{subject.id}</h2>
                <p>{subject.date}</p>
                <p>{subject.status}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonInfiniteScroll
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
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default SubjectListPage;
