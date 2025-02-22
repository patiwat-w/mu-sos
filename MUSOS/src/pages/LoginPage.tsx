import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonCol,
  IonRow,
  IonItem,
  IonCheckbox,
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from "../config/firebase";
import { userSessionService } from '../services/UserSessionService';
import { IUser } from '../types/user.type';
import { apiAuthenMethidDataService } from '../services/apiAuthenMethidDataService';
import { UserAuthenticationMethodModel } from '../types/authenMethod.type';
import TermsModal from '../components/TermsModal';
import HeaderSection from '../components/LogoSection';
import GoogleSignInButton from '../components/GoogleSignInButton';
import FooterSection from '../components/FooterSection';
import { al } from 'vitest/dist/reporters-5f784f42';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [agree, setAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (location.state && typeof location.state === 'object' && 'accepted' in location.state) {
      setAgree((location.state as { accepted: boolean }).accepted);
    }
  }, [location.state]);

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
          alert("You are not allowed to login, Please contact admin.");
          return;
        }
      } catch (error: any) {
        console.error('Error submitting data:', error);
        alert("Error submitting data");
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
              <HeaderSection />
              <IonItem lines="none" style={{ marginBottom: '20px' }}>
                <IonCheckbox checked={agree} onIonChange={e => setAgree(e.detail.checked)} />
                <span style={{ marginLeft: '10px' }} onClick={seeAgreement}>
                  By signing in, you agree to our Terms and Conditions.
                </span>
              </IonItem>
              <GoogleSignInButton onClick={handleGoogleSignIn} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <FooterSection />
      <TermsModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </IonPage>
  );
};

export default LoginPage;