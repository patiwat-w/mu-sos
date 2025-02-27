import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Agreement from './pages/Agreement';
import PreInformation from './pages/PreInformation';
import SelectAssessment from './pages/Assessmensts/SelectAssessment/SelectAssessment';
import ImageAssessment from './pages/Assessmensts/ImageAssessment/ImageAssessment';
import VoiceAssessment from './pages/Assessmensts/VoiceAssessment/VoiceAssessment';
import PersonalInformationPage from './pages/Assessmensts/PersonalInformation/PersonalInformation';
import HealthInformation from './pages/Assessmensts/PersonalInformation/HealthInformation';
import PreDiagnosisPage from './pages/Assessmensts/PersonalInformation/PreDiagnosisPage';
import NHISSPage from './pages/Assessmensts/PersonalInformation/NHISSPage';
import UserProfilePage from './pages/UserProfile';
import ConsentPage from './pages/Consent/ConsentPage'; // Import ConsentPage
import SubjectListPage from './pages/SubjectList/SubjectListPage'; // Import SubjectListPage
import ResultPage from './pages/Result/ResultPage'; // Import ResultPage

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


// import '@ionic/react/css/palettes/dark.always.css';
import '@ionic/react/css/palettes/dark.class.css';
//import '@ionic/react/css/palettes/dark.system.css';
/* Theme variables */
import './theme/variables.css';
import './theme/global.css';
import SubjectProfilePage from './pages/SubjectProfile/SubjectProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import FaceAssessmentPage from './pages/Assessmensts/FaceAssessment/FaceAssessmentPage';
import AimAssessmentPage from './pages/Assessmensts/AimAssessment/AimAssesssmentPage';
setupIonicReact({ mode: 'ios' });

const App: React.FC = () => (
  <IonApp className="app-container">
    <IonReactRouter>
      <IonRouterOutlet className="page-content">
        {/* Authentication Routes */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        
        {/* Main App Routes */}
        <ProtectedRoute exact path="/home" component={HomePage} />
        <ProtectedRoute exact path="/agreement" component={Agreement} />
        <ProtectedRoute exact path="/pre-information" component={PreInformation} />

        
        
        <ProtectedRoute exact path="/nhiss" component={NHISSPage} />
        <ProtectedRoute exact path="/user-profile" component={UserProfilePage} />
        <ProtectedRoute exact path="/consent" component={ConsentPage} />
        <ProtectedRoute exact path="/subject-list" component={SubjectListPage} />
        
        <ProtectedRoute exact path="/subject-profile/:id" component={SubjectProfilePage} />
        <ProtectedRoute exact path="/select-assessment/:subjectId" component={SelectAssessment} />
        <ProtectedRoute exact path="/image-assessment/:subjectId" component={ImageAssessment} />
        <ProtectedRoute exact path="/face-assessment/:subjectId" component={FaceAssessmentPage} />
        <ProtectedRoute exact path="/aim-assessment/:subjectId" component={AimAssessmentPage} />
        
        
        <ProtectedRoute exact path="/voice-assessment/:subjectId" component={VoiceAssessment} />
        <ProtectedRoute exact path="/pre-diagnosis/:subjectId" component={PreDiagnosisPage} />
        <ProtectedRoute exact path="/personal-information/:subjectId" component={PersonalInformationPage} />
        <ProtectedRoute exact path="/health-information/:subjectId" component={HealthInformation} />
        <ProtectedRoute exact path="/result/:subjectId" component={ResultPage} />
        {/* Catch-all Route */}
        <Route>
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
