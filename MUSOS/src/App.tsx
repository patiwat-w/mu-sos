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

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Agreement from './pages/Agreement';
import PreInformation from './pages/PreInformation';
import SelectAssessment from './pages/SelectAssessment/SelectAssessment';
import ImageAssessment from './pages/ImageAssessment/ImageAssessment';
import VoiceAssessment from './pages/VoiceAssessment/VoiceAssessment';
import PersonalInformationPage from './pages/PersonalInformation/PersonalInformation';
import HealthInformation from './pages/PersonalInformation/HealthInformation';
import PreDiagnosisPage from './pages/PersonalInformation/PreDiagnosisPage';
import NHISSPage from './pages/PersonalInformation/NHISSPage';
import UserProfilePage from './pages/UserProfile';
import ConsentPage from './pages/Consent/ConsentPage'; // Import ConsentPage
import SubjectListPage from './pages/SubjectList/SubjectListPage'; // Import SubjectListPage
import ResultPage from './pages/Result/ResultPage'; // Import ResultPage
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/*  import '@ionic/react/css/palettes/dark.class.css';   

 /*import '@ionic/react/css/palettes/dark.always.css';*/
/* import '@ionic/react/css/palettes/dark.system.css'; */
/*import '@ionic/react/css/palettes/high-contrast.class.css'; */
/* Theme variables */
import './theme/variables.css';
import './theme/global.css';
import SubjectProfilePage from './pages/SubjectProfile/SubjectProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
setupIonicReact();

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
        <ProtectedRoute exact path="/select-assessment" component={SelectAssessment} />
        <ProtectedRoute exact path="/image-assessment" component={ImageAssessment} />
        <ProtectedRoute exact path="/voice-assessment" component={VoiceAssessment} />
        <ProtectedRoute exact path="/personal-information" component={PersonalInformationPage} />
        <ProtectedRoute exact path="/health-information" component={HealthInformation} />
        <ProtectedRoute exact path="/pre-diagnosis" component={PreDiagnosisPage} />
        <ProtectedRoute exact path="/nhiss" component={NHISSPage} />
        <ProtectedRoute exact path="/user-profile" component={UserProfilePage} />
        <ProtectedRoute exact path="/consent" component={ConsentPage} />
        <ProtectedRoute exact path="/subject-list" component={SubjectListPage} />
        <ProtectedRoute exact path="/result" component={ResultPage} />
        <ProtectedRoute exact path="/subject-profile/:id" component={SubjectProfilePage} />

        {/* Catch-all Route */}
        <Route>
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
