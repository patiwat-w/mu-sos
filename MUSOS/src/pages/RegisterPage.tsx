import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonCol,
  IonRow,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/react';
import { useHistory, Link } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from "../config/firebase";
import { userSessionService } from '../services/UserSessionService';
import { IUser } from '../types/user.type';
import HeaderSection from '../components/LogoSection';
import FooterSection from '../components/FooterSection';

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const accessToken = btoa(user.email + ':' + user.uid);
      userSessionService.saveSession({
        uid: user.uid,
        displayName: `${firstName} ${lastName}`,
        email: user.email,
        photoURL: user.photoURL,
        localUserMappingId: 0,
        role: 'User',
        phone: phone,
        token: accessToken
      } as IUser);
      history.push('/home');
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Registration Failed");
    }
  };

  return (
    <IonPage style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <IonContent style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <IonGrid style={{ height: '100%' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <IonRow style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonCol size="12" sizeMd="6" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <HeaderSection />
              <IonItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonLabel position="floating" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>First Name</IonLabel>
                <IonInput value={firstName} onIonChange={e => setFirstName(e.detail.value!)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              </IonItem>
              <IonItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonLabel position="floating" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Last Name</IonLabel>
                <IonInput value={lastName} onIonChange={e => setLastName(e.detail.value!)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              </IonItem>
              <IonItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonLabel position="floating" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Email</IonLabel>
                <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              </IonItem>
              <IonItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonLabel position="floating" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Phone</IonLabel>
                <IonInput value={phone} onIonChange={e => setPhone(e.detail.value!)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              </IonItem>
              <IonButton expand="block" onClick={handleRegister} style={{ marginTop: '20px', justifyContent: 'center' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Create Account</IonButton>
              <IonItem lines="none" style={{ marginTop: '20px', justifyContent: 'center', textAlign: 'center' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Link to="/login" style={{ width: '100%', textAlign: 'center' }}>Already have an account? Login here</Link>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <FooterSection />
    </IonPage>
  );
};

export default RegisterPage;
