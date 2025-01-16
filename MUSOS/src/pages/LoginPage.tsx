import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonText,
    IonFooter,
    IonIcon,
  } from '@ionic/react';
  import { helpCircle } from 'ionicons/icons';
  import { useHistory } from 'react-router-dom'; // เพิ่ม useHistory
  
  const LoginPage: React.FC = () => {
    const history = useHistory(); // ใช้ useHistory เพื่อเปลี่ยนเส้นทาง
  
    const handleSignIn = () => {
      // เปลี่ยนเส้นทางไปยังหน้าข้อตกลง
      history.push('/agreement');
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>MSU SOS</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {/* โลโก้ */}
            <img
              src="images/icons/icon-512x512.png" // แทนที่ด้วย URL หรือ path ของโลโก้คุณ
              alt="MSU SOS Logo"
              style={{ width: '150px', marginBottom: '20px' }}
            />
  
            {/* ชื่อโปรเจกต์ */}
            <h2>Stroke Triage Data Collection</h2>
          </div>
  
          {/* ช่องกรอกข้อมูล */}
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" placeholder="email" />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" placeholder="Password" />
          </IonItem>
  
          {/* ปุ่ม Sign In */}
          <IonButton
            expand="block"
            color="danger"
            style={{ marginTop: '20px' }}
            onClick={handleSignIn} // เรียกฟังก์ชัน handleSignIn เมื่อกดปุ่ม
          >
            Sign In
          </IonButton>
  
          {/* ข้อความข้อตกลง */}
          <IonText color="medium">
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              By signing in, you agree to our Terms and Conditions.
            </p>
          </IonText>
  
          {/* ข้อความเพิ่มเติม */}
          <IonText color="medium">
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Fixed account for research data collection
            </p>
          </IonText>
        </IonContent>
  
        {/* ไอคอนคำถาม */}
        <IonFooter>
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <IonButton fill="clear" color="medium">
              <IonIcon icon={helpCircle} />
            </IonButton>
          </div>
        </IonFooter>
      </IonPage>
    );
  };
  
  export default LoginPage;
  