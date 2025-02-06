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
} from '@ionic/react';
import { helpCircle, logoGoogle } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom'; // เพิ่ม useHistory และ useLocation
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { auth, googleProvider, signInWithPopup } from "../config/firebase"; // เพิ่ม import ของ firebase
import { userSessionService } from '../services/UserSessionService';
import { IUser } from '../types/user.type';

const LoginPage: React.FC = () => {
  const history = useHistory(); // ใช้ useHistory เพื่อเปลี่ยนเส้นทาง
  const location = useLocation(); // ใช้ useLocation เพื่อรับ state
  const [agree, setAgree] = useState(false); // สร้าง state สำหรับ checkbox

  useEffect(() => {
    // ตรวจสอบ state ที่ส่งกลับมาจากหน้า Agreement
    if (location.state && typeof location.state === 'object' && 'accepted' in location.state) {
      setAgree((location.state as { accepted: boolean }).accepted);
    }
  }, [location.state]);

  const handleSignIn = () => {
    if (agree) {
      // เปลี่ยนเส้นทางไปยังหน้าข้อตกลง
      //history.push('/home');
      window.location.href="/home";
    } else {
      alert('Please agree to the terms and conditions.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      console.log("User:", user);
      userSessionService.saveSession({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        localUserMappingId:4,
        role: 'User',
        phone: '0943481249'
      } as IUser);
      //alert(`Welcome ${user.displayName}`);
      //history.push('/home'); // ไปหน้าถัดไปเมื่อ login สำเร็จ
      window.location.href="/home";
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google Sign-In Failed");
    }
  };

  const seeAgreement = () => {  
    // เปลี่ยนเส้นทางไปยังหน้าข้อตกลง
    history.push('/agreement');
  };

  useEffect(() => {
    if (userSessionService.isAuthenticated()) {
      //history.push('/home');
      window.location.href="/home";
    }
  }, [history]);

const clientId = "YOUR_GOOGLE_CLIENT_ID"; // ใส่ Client ID ที่ได้จาก Google

const handleGoogleSuccess = (response: any) => {
  console.log("Google Response:", response);
  alert("Login Success!");
};

const handleGoogleFailure = (error: any) => {
  console.error("Google Login Failed", error);
  alert("Google Login Failed");
};

  return (
    <IonPage>

      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {/* โลโก้ */}
          <img
            src="images/icons/icon-384x384.png" // แทนที่ด้วย URL หรือ path ของโลโก้คุณ
            alt="MSU SOS Logo"
            style={{ width: '100px', marginBottom: '20px' }}
          />

          {/* ชื่อโปรเจกต์ */}
          <h2>Stroke Triage Data Collection</h2>
        </div>

        {/* ช่องกรอกข้อมูล */}
        <div style={{ marginBottom: '20px' }}>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            placeholder="email"
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            placeholder="Password"
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}
          />
        </div>

        {/* Checkbox สำหรับข้อตกลง */}
        <IonItem lines="none">
          <IonCheckbox checked={agree} onIonChange={e => setAgree(e.detail.checked)} />
          <span style={{ marginLeft: '10px' }} onClick={seeAgreement}>
            By signing in, you agree to our Terms and Conditions.
          </span>
        </IonItem>

        {/* ปุ่ม Sign In */}
        {/* <IonButton
          expand="block"
          color="danger"
          style={{ marginTop: '20px' }}
          onClick={handleSignIn} // เรียกฟังก์ชัน handleSignIn เมื่อกดปุ่ม
        >
          Sign In
        </IonButton> */}

        {/* ปุ่ม Sign In with Google */}
        <IonButton
          expand="block"
          color="primary"
          style={{ marginTop: '10px' }}
          onClick={handleGoogleSignIn} // เรียกฟังก์ชัน handleGoogleSignIn เมื่อกดปุ่ม
        >
          <IonIcon slot="start" icon={logoGoogle} 
          />
          Sign In with Google
        </IonButton>



        {/* ข้อความเพิ่มเติม */}
        
      </IonContent>

      {/* ไอคอนคำถาม */}
      <IonFooter>
        <div style={{ textAlign: 'center', padding: '10px' }}>
        Fixed account for research data collection
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default LoginPage;