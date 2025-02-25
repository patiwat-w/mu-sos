import React, { useEffect, useState } from 'react';
import { apiSubjectDataService } from '../services/apiSubjectDataService';
import { IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import { ISubject } from '../types/subject.type';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns-tz';
import { th } from 'date-fns/locale';
import styles from './SubjectList.module.css'; // นำเข้า CSS Modules

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
                {subjects.slice().reverse().map((subject, index) => (
                    <IonItem 
                        key={index} 
                        onClick={() => handleItemClick(subject)}
                        className={`${styles.ionItem} ${index % 2 === 0 ? styles.even : styles.odd}`} // ใช้ CSS Modules
                    >
                        <IonLabel className={styles.ionLabel}>
                            <h2><span className={styles.label}>ID:</span> <span className={styles.value}>{subject.id}</span></h2>
                            <p><span className={styles.label}>Subject Name:</span> <span className={styles.value}>{subject.subjectName}</span></p>
                            
                            <p><span className={styles.label}>HN:</span> <span className={styles.value}>{subject.hn}</span></p>
                            <p><span className={styles.label}>Phone Number:</span> <span className={styles.value}>{subject.phoneNumber}</span></p>
                            <p><span className={styles.label}>Created Date:</span> <span className={styles.value}>{formatDate(subject.createdDate)}</span></p>
                            <p><span className={styles.label}>Created By:</span> <span className={styles.value}>{subject.createdBy}</span></p>
                        </IonLabel>
                    </IonItem>
                ))}
            </IonList>
        </IonContent>
    );
};

export default SubjectList;