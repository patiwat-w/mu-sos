import React, { useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonRow,
    IonCol
} from '@ionic/react';
import { home, personCircle, helpCircle } from 'ionicons/icons';
import { useHistory } from 'react-router';

const UserProfilePage: React.FC = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const history = useHistory();

    const handleBack = () => {
        history.goBack();
    };

    const handleSignOut = () => {
        console.log('Sign out clicked');
        history.push('/login');
        // Add sign-out logic here
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton slot="start" fill="clear" routerLink="/home">
                        <IonIcon icon={home} />
                    </IonButton>
                    <IonTitle style={{ textAlign: 'center' }}>Information</IonTitle>
                    <IonButton slot="end" fill="clear">
                        <IonIcon icon={personCircle} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Name Surname</IonLabel>
                    <IonInput
                        value={name}
                        placeholder="Enter your name"
                        onIonChange={(e) => setName(e.detail.value!)}
                        style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
                    ></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Phone Number</IonLabel>
                    <IonInput
                        value={phone}
                        placeholder="Enter your phone number"
                        onIonChange={(e) => setPhone(e.detail.value!)}
                        style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
                    ></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Role</IonLabel>
                    <IonSelect
                        value={role}
                        placeholder="Select Role"
                        onIonChange={(e) => setRole(e.detail.value)}
                        interface="popover"
                    >
                        <IonSelectOption value="Admin">Admin</IonSelectOption>
                        <IonSelectOption value="User">User</IonSelectOption>
                        <IonSelectOption value="Guest">Guest</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonRow className="ion-justify-content-between" style={{ marginTop: '20px' }}>
                    <IonCol size="auto">
                        <IonButton color="primary" onClick={handleBack}>
                            &lt;&lt;Back
                        </IonButton>
                    </IonCol>
                    <IonCol size="auto">
                        <IonButton color="danger" onClick={handleSignOut}>
                            Sign out
                        </IonButton>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-justify-content-center" style={{ marginTop: '20px' }}>
                    <IonButton
                        fill="clear"
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: '#ffcc00',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                        }}
                    >
                        <IonIcon icon={helpCircle} />
                    </IonButton>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default UserProfilePage;
