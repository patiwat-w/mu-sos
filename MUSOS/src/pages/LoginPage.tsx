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
import { useHistory, useLocation, Link } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from "../config/firebase";
import { userSessionService } from '../services/UserSessionService';
import { IUser } from '../types/user.type';
import { apiAuthenMethidDataService } from '../services/apiAuthenMethidDataService';
import { UserAuthenticationMethodModel } from '../types/authenMethod.type';
import TermsModal from '../components/TermsModal';
import HeaderSection from '../components/LogoSection';
import GoogleSignInButton from '../components/GoogleSignInButton';
import FooterSection from '../components/FooterSection';
import { a } from 'vitest/dist/chunks/suite.qtkXWc6R';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [agree, setAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    sessionStorage.clear();
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

        if (error) {
          try {
            const errorJson = JSON.parse(error.message);
            if (errorJson.type =="Custom/UserAuthenticationMethodNotFound") {
          
             alert("You email is not registered, Please contact admin.");
              
            }else{
              alert(errorJson.detail);
            }
           
          } catch (parseError) {
            alert("Something went wrong, Please try again later.");
          }
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
    <IonPage style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <IonContent style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <IonGrid style={{ height: '100%' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <IonRow style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonCol size="12" sizeMd="6" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <HeaderSection />
              <IonItem lines="none" style={{ marginBottom: '20px' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonCheckbox checked={agree} onIonChange={e => setAgree(e.detail.checked)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                <span style={{ marginLeft: '10px' }} onClick={seeAgreement}>
                  By signing in, you agree to our Terms and Conditions.
                </span>
              </IonItem>
              <GoogleSignInButton onClick={handleGoogleSignIn} />
              <IonItem lines="none" style={{ marginTop: '20px', justifyContent: 'center', textAlign: 'center' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Link to="/register" style={{ width: '100%', textAlign: 'center' }}>Don't have an account? Register here</Link>
              </IonItem>
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