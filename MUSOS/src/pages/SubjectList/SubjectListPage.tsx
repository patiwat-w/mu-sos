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
import { apiSubjectDataService } from '../../services/apiSubjectDataService'; // Import the service
import { ISubject } from '../../types/subject.type';
import { subjectInfoManagementService } from '../../services/subjectInfoManagementService'; // Import the service

const SubjectListPage: React.FC = () => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Initial load
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    try {
      const newSubjects = await apiSubjectDataService.getList(); // Fetch list of subjects from the API
      setSubjects([...subjects, ...newSubjects]);
      if (subjects.length + newSubjects.length >= 100) {
        setInfiniteDisabled(true);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };
 
  const handleItemClick = async (subject: ISubject) => {
    try {
      if (subject.id) {
        await subjectInfoManagementService.fetchData(subject.id); // Load subject from the service
      } else {
        console.error('Subject ID is undefined');
      }
      history.push({
        pathname: '/subject-profile/' + subject.id,
        state: { subject }
      });
    } catch (error) {
      console.error('Error loading subject:', error);
    }
  };

  return (
    <IonPage>
      <Header title="Subject List" />
      <IonContent scrollX={false} scrollY={false} no-bounce class="no-scroll" className="ion-padding no-scroll" style={{ overflow: 'hidden' ,height: '100vh',scrollY:false}}>
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
