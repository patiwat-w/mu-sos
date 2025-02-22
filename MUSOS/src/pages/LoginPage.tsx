import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
  IonButton,
  IonText,
  IonFooter,
  IonIcon,
  IonCheckbox,
  IonItem,
  IonLoading,
  IonAlert,
  IonGrid,
  IonCol,
  IonRow,
  IonModal,
} from '@ionic/react';
import { helpCircle, logoGoogle } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { auth, googleProvider, signInWithPopup } from "../config/firebase";
import { userSessionService } from '../services/UserSessionService';
import { IUser } from '../types/user.type';
import { saveToStorage } from '../utils/storage';
import { apiAuthenMethidDataService } from '../services/apiAuthenMethidDataService';
import { UserAuthenticationMethodModel } from '../types/authenMethod.type';
import TermsModal from '../components/TermsModal';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [agree, setAgree] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (location.state && typeof location.state === 'object' && 'accepted' in location.state) {
      setAgree((location.state as { accepted: boolean }).accepted);
    }
  }, [location.state]);

  const handleSignIn = () => {
    if (agree) {
      window.location.href = "/home";
    } else {
      setShowModal(true);
    }
  };

  const handleAgreement = async () => {
    setShowModal(true);
    return;
  };

  const handleGoogleSignIn = async () => {
    if (!agree) {
      setShowModal(true);
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const accessToken = btoa(user.email + ':' + user.uid);
      userSessionService.saveSession({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        localUserMappingId: 0,
        role: 'User',
        phone: '0943481249',
        token: accessToken
      } as IUser);

      try {
        let filter = { provider: 'google', providerKey: user.uid, email: "" + user.email };
        let res = await apiAuthenMethidDataService.filters(filter);
        if (res?.length > 0) {
          let authenResult = res[0] as UserAuthenticationMethodModel;
          userSessionService.saveSession({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            localUserMappingId: authenResult.userId,
            role: 'User',
            phone: '0943481249',
            token: accessToken
          } as IUser);
          window.location.href = "/home";
        } else {
          setError("You are not allowed to login, Please contact admin.");
          return;
        }
      } catch (error: any) {
        console.error('Error submitting data:', error);
        setIsLoading(false);
        if (error?.message) {
          setError(error?.message);
        } else {
          setError("Error submitting data");
        }
        return;
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google Sign-In Failed");
    }
  };

  const seeAgreement = () => {
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid style={{ height: '100%' }}>
          <IonRow style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <IonCol size="12" sizeMd="6">
              <div style={{ textAlign: 'center' }}>
                <img
                  src="images/icons/icon-384x384.png"
                  alt="MSU Stroke Triage"
                  style={{
                    width: '160px',
                    marginBottom: '20px',
                    borderRadius: '50%',
                    border: '5px solid rgb(231, 9, 9)', // Added border color
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Enhanced box shadow for more raised effect
                  }}
                />
                <h2 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '30px' }}>
                  Stroke Triage Data Collection (Beta.)
                </h2>

                <IonItem lines="none" style={{ marginBottom: '20px' }}>
                  <IonCheckbox checked={agree} onIonChange={e => setAgree(e.detail.checked)} />
                  <span style={{ marginLeft: '10px' }} onClick={seeAgreement}>
                    By signing in, you agree to our Terms and Conditions.
                  </span>
                </IonItem>

                <IonButton
                  expand="block"
                  color="primary"
                  onClick={handleGoogleSignIn}
                  style={{ backgroundColor: '#4285F4', color: 'white', fontSize: '1.2em' }}
                >
                  <IonIcon slot="start" icon={logoGoogle} style={{ color: 'white' }} />
                  Sign In with Google
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          Fixed account for research data collection.
        </div>
      </IonFooter>

      <TermsModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </IonPage>
  );
};

export default LoginPage;