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
} from '@ionic/react';
import { helpCircle, logoGoogle } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom'; // เพิ่ม useHistory และ useLocation
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { auth, googleProvider, signInWithPopup } from "../config/firebase"; // เพิ่ม import ของ firebase
import { userSessionService } from '../services/UserSessionService';
import { IUser } from '../types/user.type';
import { saveToStorage } from '../utils/storage'; // Corrected import statement
import { apiAuthenMethidDataService } from '../services/apiAuthenMethidDataService';
import { al, au } from 'vitest/dist/reporters-5f784f42';
import { UserAuthenticationMethodModel } from '../types/authenMethod.type';

const LoginPage: React.FC = () => {
  const history = useHistory(); // ใช้ useHistory เพื่อเปลี่ยนเส้นทาง
  const location = useLocation(); // ใช้ useLocation เพื่อรับ state
  const [agree, setAgree] = useState(false); // สร้าง state สำหรับ checkbox
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
      userSessionService.saveSession({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        localUserMappingId:0,
        role: 'User',
        phone: '0943481249'
      } as IUser);

     // alert(`Welcome ${user.displayName}`);
     // alert(JSON.stringify(result));
      /**
       * {
    "federatedId": "https://accounts.google.com/109386409667429907646",
    "providerId": "google.com",
    "email": "patiwat.pfc@gmail.com",
    "emailVerified": true,
    "firstName": "Patiwat",
    "fullName": "Patiwat W",
    "lastName": "W",
    "photoUrl": "https://lh3.googleusercontent.com/a/ACg8ocIgdJQ3P6bCYoIvJdpPFxxzLaT4lWN7Gc3egzG40OqpoH702Ukm=s96-c",
    "localId": "7sVqxJSX39U0BJGjXsHZxE9wbBY2",
    "displayName": "Patiwat W",
    "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYmJiZDI2NjNhY2U4OTU4YTFhOTY4ZmZjNDQxN2U4MDEyYmVmYmUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUGF0aXdhdCBXIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lnZEpRM1A2YkNZb0l2SmRwUEZ4eHpMYVQ0bFdON0djM2Vnekc0ME9xcG9INzAyVWttPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL211c29zLTg5ODAyIiwiYXVkIjoibXVzb3MtODk4MDIiLCJhdXRoX3RpbWUiOjE3NDAwNTI5ODEsInVzZXJfaWQiOiI3c1ZxeEpTWDM5VTBCSkdqWHNIWnhFOXdiQlkyIiwic3ViIjoiN3NWcXhKU1gzOVUwQkpHalhzSFp4RTl3YkJZMiIsImlhdCI6MTc0MDA1Mjk4MSwiZXhwIjoxNzQwMDU2NTgxLCJlbWFpbCI6InBhdGl3YXQucGZjQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA5Mzg2NDA5NjY3NDI5OTA3NjQ2Il0sImVtYWlsIjpbInBhdGl3YXQucGZjQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.hXeQ7zV78LvCRFkydk4xoro4j199CdHwlSwqyvLqQsyZHLSj1JzEPVIKO1XRGF17sxWpQAfRlwWX7ZNWq55ood08goFhII9cSd80QsUg1QjX7HDacCW8Vff7vg-8bMd9U9dzdMdqVQwcgVgPawNT-WiEhEk9evWrE8ZJyx-8rp8sTtItRAzWg8unhkKukk0sb1kEf2-2U743Odxi9x83DjDU15FieFux3xq5OXden-78AeUtpGteCrkeTfY1Qfnpjd5rY1aEK7V05-8jr1uJgGKQUTIdcOWVJO0vSpafxGGqyUfM2-wnnDTvh0jTq44V8ZyCtRmxZvfrV-5dA06guA",
    "context": "",
    "oauthAccessToken": "ya29.a0AXeO80QRpvYOUyt2WRDKvk8hcq3hPbEev2LBA2x5gqbzWetn39irNWUJNNMJSmUrBHr6bmNHty-61Ufhyikk1KK8rfirJkgGK4DULJFnU9tBrvqqIYmapoTMVXKHRM2WBJ3BFUw5V2tEGRd2cxtZ9zfsxKQqmxL57JrZTreQxQaCgYKAQ8SARASFQHGX2MiL84BqK84GhgXFOWF9STBbg0177",
    "oauthExpireIn": 3598,
    "refreshToken": "AMf-vBxUm91BM25ANyAhRMA9S6O2FCnR6z0oaRGdD87JDWmEmGC_PXT5vZCEWjxQr7j895vvKWZ1jjPWj_aActT8ZLYDjjJxgS59o2SblC0xzS6lt9migLRhzDoUaRmLIhnKR7kCcOlFE72QJIFKFoifiAAmohwfpajvt5Mh2kdSbv7cP4ohsinwHKYwH8T3Ioggyy5nVVQHULJrABCRWAhUz2EYLvmXpigsDAGq4QRxOPr3RCQNkTtDZih7hiBykisoZz5UsYCUM2KPHej2L6UX0kVFdiDs-dcqEgbDhXMH5OpULqER8-7VEElQoyYQ1EHgVjHAOtnCo5OR_QJtVojm9-1qBw4lGiMsCnxv-BeXL2JULSv30vhbhTMDtheBocpb0a6PNTcuZElkPsZ5t807u0M4xcc8REkCX9w5uJUszi-YGDTaokM",
    "expiresIn": "3600",
    "oauthIdToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVkMTJhYjc4MmNiNjA5NjI4NWY2OWU0OGFlYTk5MDc5YmI1OWNiODYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTc5MDEyNDA3NTkzLXZuMDR2cWVydDdqMmYwdTQyZDRmaW41OXJjdDVxcDc1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNTc5MDEyNDA3NTkzLXZuMDR2cWVydDdqMmYwdTQyZDRmaW41OXJjdDVxcDc1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA5Mzg2NDA5NjY3NDI5OTA3NjQ2IiwiZW1haWwiOiJwYXRpd2F0LnBmY0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InBnLV9wamc5YnRyT190Z1Fpbm1SdUEiLCJpYXQiOjE3NDAwNTI5ODEsImV4cCI6MTc0MDA1NjU4MX0.UhiIJ6AQNZOTT7OXGxf1QY-RL-WZSvkoBNaTHvt7AdhRfsbB3Gpsj1rDdHRSBU9fOVPtIeOKbaG4KYO52BlF2JucMdQJdM83N3h3DBkupzjdG_htQVWHT4Tqe076jnqkXUVHxfz9rE_QhuSsjrftG2itnAbGH3Ctuq0Ok6FcrqYMqXtWmKzCNzbaXYrfxzt36ewNPq2xPydHpuDi89fIIfaVii2hEUtR9S4LyXlOHUrRKpSrXTrShjDKzADINTwhbe9cfzDf5-eA1PEl1wW2SeNkFW0jK3YJmfUULsrigtj3443dlS1IIP72raWa96omWWOPkbD4Wi5rMlbfxV-ktQ",
    "rawUserInfo": "{\"name\":\"Patiwat W\",\"granted_scopes\":\"https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid\",\"id\":\"109386409667429907646\",\"verified_email\":true,\"given_name\":\"Patiwat\",\"family_name\":\"W\",\"email\":\"patiwat.pfc@gmail.com\",\"picture\":\"https://lh3.googleusercontent.com/a/ACg8ocIgdJQ3P6bCYoIvJdpPFxxzLaT4lWN7Gc3egzG40OqpoH702Ukm=s96-c\"}",
    "kind": "identitytoolkit#VerifyAssertionResponse"
}
       */

      // check user from authen method
      //{provider: 'google', providerKey: '7sVqxJSX39U0BJGjXsHZxE9wbBY2', email: 'patiwat.pfc@gmail.com'}

          try {
            let filter = { provider: 'google', providerKey: user.uid, email: ""+user.email };
           
        
            let res = await apiAuthenMethidDataService.filters(filter);
            if(res?.length>0){
              let authenResult = res[0] as UserAuthenticationMethodModel  ;
             // login success
             userSessionService.saveSession({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              localUserMappingId:authenResult.userId,
              role: 'User',
              phone: '0943481249'
            } as IUser);
             console.log("User:", user);
             
          
             //setError(`Welcome ${user.displayName}`);
             //history.push('/home'); // ไปหน้าถัดไปเมื่อ login สำเร็จ
             window.location.href="/home";
            }else{

            // not allow to login
            setError("You are not allow to login, Please contact admin.");
            return;
              
            }
  
            //history.push('/select-assessment');
          } catch (error : any) {
            console.error('Error submitting data:', error);
           //alert("error")
           // alert(JSON.stringify(error)); 
            setIsLoading(false);
            if(error?.message){
              setError(error?.message);
            }else{
              setError("Error submitting data");
            }
           // setError(error?.message);
           
            return;
            
          }

      
      

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

const handleLogin = () => {
  // Perform login logic
  // ...

  // Save user data to storage
  saveToStorage('user', { username });
};

  return (
    <IonPage>

      <IonContent className="ion-padding">
              <IonLoading isOpen={isLoading} message={'Please wait...'} />
                <IonAlert
                  isOpen={!!error}
                  onDidDismiss={() => setError(null)}
                  header={'Error'}
                  message={error}
                  buttons={['OK']}
                />
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
        {/* <div style={{ marginBottom: '20px' }}>
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
        </div> */}

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

        {/* <button onClick={handleLogin}>Login</button> */}

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