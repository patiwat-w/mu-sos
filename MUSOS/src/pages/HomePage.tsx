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
import { home, personCircle, settings, helpCircle } from 'ionicons/icons';

const menuConfig = [
    { icon: home, label: 'Home', target: '/home' },
    { icon: personCircle, label: 'Profile', target: '/profile' },
    { icon: settings, label: 'Settings', target: '/settings' },
    { icon: helpCircle, label: 'Help', target: '/help' }
];

const HomePage: React.FC = () => {
    return (
        <IonApp>
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start" />
                    <IonTitle style={{ textAlign: 'center' }}>Home</IonTitle>
                    <IonButton slot="end" fill="clear">
                        <IonIcon icon={personCircle} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonGrid>
                    {menuConfig.map((item, index) => (
                        <IonRow key={index}>
                            <IonCol size="12" sizeSm="6" className="ion-text-center">
                                <IonButton expand="block" routerLink={item.target} fill="clear">
                                    <IonIcon icon={item.icon} slot="start" />
                                    {item.label}
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    ))}
                </IonGrid>
            </IonContent>
        </IonApp>
    );
};

export default HomePage;
