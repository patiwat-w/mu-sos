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
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
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
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Route สำหรับหน้า Login */}
        <Route exact path="/login">
          <LoginPage />
        </Route>
        
        {/* Route สำหรับหน้า Home */}
        <Route exact path="/home">
          <HomePage />
        </Route>

        {/* Route สำหรับ Tabs */}
        <Route path="/tabs">
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tabs/tab1">
                <Tab1 />
              </Route>
              <Route exact path="/tabs/tab2">
                <Tab2 />
              </Route>
              <Route path="/tabs/tab3">
                <Tab3 />
              </Route>
              <Route exact path="/tabs">
                <Redirect to="/tabs/tab1" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tabs/tab1">
                <IonIcon aria-hidden="true" icon={triangle} />
                <IonLabel>Tab 1</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tabs/tab2">
                <IonIcon aria-hidden="true" icon={ellipse} />
                <IonLabel>Tab 2</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tabs/tab3">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Tab 3</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Route>

        {/* Redirect หน้าแรกไป Login */}
        <Route exact path="/">
          <Redirect to="/login" />
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


      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

