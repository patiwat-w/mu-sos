import React from 'react';
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
    IonMenuButton
} from '@ionic/react';
import { personCircle, settings, helpCircle, addCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { userSessionService } from '../services/UserSessionService';
import './HomePage.css';

const menuConfig = [
    { icon: addCircle, label: 'New Collection', target: '/consent' },
    { icon: personCircle, label: 'Subject List', target: '/subject-list' },
    { icon: settings, label: 'Settings', target: '/settings' },
    { icon: helpCircle, label: 'Help', target: '/help' }
];

const HomePage: React.FC = () => {
    const history = useHistory();

    const handleSignOut = () => {
        console.log('Sign out clicked');
        userSessionService.clearSession();
        history.push('/login');
    };

    return (
        <IonApp>
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start" />
                    <IonTitle style={{ textAlign: 'left' }}>MSU TRIAGE</IonTitle>
                    <IonButton slot="end" fill="clear">
                        <IonIcon icon={personCircle} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="home-content">
                <IonGrid className="menu-container">
                    {menuConfig.map((item, index) => (
                        <IonRow key={index}>
                            <IonCol size="12">
                                <IonButton expand="block" routerLink={item.target} fill="outline" size="large" className="menu-button">
                                    <IonIcon icon={item.icon} slot="start" />
                                    {item.label}
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    ))}
                </IonGrid>
                
                <IonGrid className="logout-container">
                    
                    <IonRow>
                        <IonCol size="12">
                            <IonButton expand="block" fill="outline" size="large" className="menu-button" onClick={handleSignOut}>
                                <IonIcon icon={personCircle} slot="start" />
                                Log Out
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonApp>
    );
};

export default HomePage;
