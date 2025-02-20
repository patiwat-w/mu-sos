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
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

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

/* import '@ionic/react/css/palettes/dark.always.css'; */
 import '@ionic/react/css/palettes/dark.class.css'; 
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';
import SubjectProfilePage from './pages/SubjectProfile/SubjectProfilePage';
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
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/agreement">
          <Agreement />
        </Route>
        <Route exact path="/pre-information">
          <PreInformation />
        </Route>
        <Route exact path="/select-assessment">
          <SelectAssessment />
        </Route>
        <Route exact path="/image-assessment">
          <ImageAssessment />
        </Route>
        <Route exact path="/voice-assessment">
          <VoiceAssessment />
        </Route>
        <Route exact path="/personal-information">
          <PersonalInformationPage />
        </Route>
        <Route exact path="/health-information">
          <HealthInformation />
        </Route>
        <Route exact path="/pre-diagnosis">
          <PreDiagnosisPage />
        </Route>
        <Route exact path="/nhiss">
          <NHISSPage />
        </Route>
        <Route exact path="/user-profile">
          <UserProfilePage />
        </Route>
        <Route exact path="/consent"> {/* Add route for ConsentPage */}
          <ConsentPage />
        </Route>
        <Route exact path="/subject-list"> {/* Add route for SubjectListPage */}
          <SubjectListPage />
        </Route>
        <Route exact path="/result"> {/* Add route for ResultPage */}
          <ResultPage />
        </Route>
        <Route exact path="/subject-profile/:id"> {/* Add route for SubjectProfilePage */}
          <SubjectProfilePage />
        </Route>


        {/* Catch-all Route */}
        <Route>
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
