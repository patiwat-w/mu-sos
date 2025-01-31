import React, { useState, useEffect } from 'react';
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
import { home, personCircle, helpCircle, arrowBack, logOut } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { userSessionService } from '../services/UserSessionService'; // Import user session service
import { IUser } from '../types/user.type';
import Header from '../components/Header'; // Import Header component

const UserInformationPage: React.FC = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [photoUrl, setPhotoUrl] = useState(''); // เพิ่ม state สำหรับ photoUrl
    const [email, setEmail] = useState(''); // เพิ่ม state สำหรับ email
    const history = useHistory();

    useEffect(() => {

        const user = userSessionService.getSession();
        if (!user) {
          window.location.href = '/login';
          throw new Error('Please login to continue');
    
        }

        if (user) {
            setName(user.displayName ?? '');
            setPhone(user.phone ?? '');
            setRole(user.role ?? '');
            setEmail(user.email ?? ''); // ตั้งค่า email
           
            setPhotoUrl(user.photoURL ?? ''); // ตั้งค่า photoUrl
        }

    }, []);

    const handleBack = () => {
        history.goBack();
    };

    const handleSignOut = () => {
        console.log('Sign out clicked');
        userSessionService.clearSession();
        history.push('/login');
        // Add sign-out logic here
    };
  

    return (
        <IonPage>
            <Header title="Profile" /> {/* ใช้ Header component */}
            <IonContent className="ion-padding">
                {/* แสดง PhotoUrl */}
                {photoUrl && (
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <img src={photoUrl} alt="Profile" style={{ borderRadius: '50%', width: '150px', height: '150px' }} />
                    </div>
                )}

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
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput
                        value={email}
                        placeholder=""
                        onIonChange={(e) => setEmail(e.detail.value!)}
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

                <IonRow className="ion-justify-content-between ion-margin-top">
                    {/* <IonCol size="auto">
                        <IonButton 
                            color="medium" 
                            onClick={handleBack}
                            fill="clear"
                            className="ion-float-start"
                        >
                            <IonIcon 
                                icon={arrowBack} 
                                slot="start" 
                                style={{ marginRight: '8px' }}
                            />
                            Back
                        </IonButton>
                    </IonCol> */}
                    
                    <IonCol size="12">
                        <IonButton 
                            color="danger" 
                            onClick={handleSignOut}
                            fill="solid"
                            expand="block"
                        >
                            <IonIcon 
                                icon={logOut} 
                                slot="start" 
                                style={{ marginRight: '8px' }}
                            />
                            Sign Out
                        </IonButton>
                    </IonCol>
                </IonRow>

                {/* <IonRow className="ion-justify-content-center" style={{ marginTop: '20px' }}>
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
                </IonRow> */}
            </IonContent>
        </IonPage>
    );
};

export default UserInformationPage;
