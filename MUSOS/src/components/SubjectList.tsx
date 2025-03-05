import React, { useEffect, useState } from 'react';
import { apiSubjectDataService } from '../services/apiSubjectDataService';
import { IonContent, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonSpinner } from '@ionic/react';
import { ISubject } from '../types/subject.type';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns-tz';
import { th } from 'date-fns/locale';
import styles from './SubjectList.module.css'; // นำเข้า CSS Modules
import { subjectInfoManagementService } from '../services/subjectInfoManagementService'; // Import the service
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Import animation components
import { useLoading } from '../contexts/LoadingContext'; // Import the custom hook
import { useAlert } from '../contexts/AlertContext'; // Import the custom hook
interface SubjectListProps {
    subjects?: ISubject[];
}

const SubjectList: React.FC<SubjectListProps> = () => {
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const history = useHistory();
    const { showLoading, hideLoading } = useLoading();
    const { showAlert ,showConfirm} = useAlert();

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
    }, [showLoading, hideLoading]);

    const triggerAlert = () => {
        showAlert('This is an alert message', 'Alert Header');
      };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy', { locale: th });
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <IonSpinner name="crescent" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleItemClick = async (subject: ISubject) => {
        if (subject.slidingItem) {
            subject.slidingItem.close(); // Close sliding item first
        }
        showLoading(); // Show loading overlay
        try {
            if (subject.id) {
                await subjectInfoManagementService.fetchData(subject.id); // Load subject from the service
            } else {
                console.error('Subject ID is undefined');
                alert('Error loading subject. Please try again.');
            }
            history.push({
                pathname: '/personal-information/' + subject.id,
                state: { subjectId: subject.id } // Pass only the subject ID
            });
        } catch (error) {
            alert('Error loading subject. Please try again.');
            console.error('Error loading subject:', error);
        } finally {
            hideLoading(); // Hide loading overlay
        }
    };

    const handleDelete = async (subjectId: string, slidingItem: any) => {
        showConfirm('Are you sure you want to delete this subject?', 'Confirm Delete', async () => {
            showLoading(); // Show loading overlay
            try {
                await apiSubjectDataService.delete(subjectId);
                setSubjects(subjects.filter(subject => subject.id !== subjectId));
                slidingItem.close(); // Reset IonItemSliding to its initial state
            } catch (error) {
                console.error('Error deleting subject:', error);
                setError('Error deleting subject. Please try again.');
            } finally {
                hideLoading(); // Hide loading overlay
            }
        }, () => {
            slidingItem.close(); // Close sliding item on cancel
        });
    };

    return (
        <IonContent placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

            <TransitionGroup component={IonList}>
                {subjects.slice().reverse().map((subject, index) => (
                    <CSSTransition key={subject.id} timeout={500} classNames="fade">
                        <IonItemSliding ref={slidingItem => slidingItem && (subject.slidingItem = slidingItem)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <IonItem
                                button
                                onClick={() => handleItemClick(subject)}
                                className={`${styles.ionItem} ${index % 2 === 0 ? styles.even : styles.odd}`} // ใช้ CSS Modules
                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                <IonLabel className={styles.ionLabel} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    <h2><span className={styles.label}>#</span> <span className={styles.value}>{subject.id}</span></h2>
                                    <p><span className={styles.label}>Subject Id:</span> <span className={styles.value}>{subject.subjectId}</span></p>
                                    <p><span className={styles.label}>Subject Name:</span> <span className={styles.value}>{subject.subjectName}</span></p>
                                    <p><span className={styles.label}>HN:</span> <span className={styles.value}>{subject.hn}</span></p>
                                    <p><span className={styles.label}>Phone Number:</span> <span className={styles.value}>{subject.phoneNumber}</span></p>
                                    <p><span className={styles.label}>Created Date:</span> <span className={styles.value}>{formatDate(subject.createdDate)}</span></p>
                                    <p><span className={styles.label}>Created By:</span> <span className={styles.value}>{subject.createdBy}</span></p>
                                </IonLabel>
                            </IonItem>
                            <IonItemOptions side="end" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <IonItemOption color="danger" onClick={() => subject.id && handleDelete(subject.id, subject.slidingItem)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Delete</IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </IonContent>
    );
};

export default SubjectList;