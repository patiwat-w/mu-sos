import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig:any = {
  development: {
    apiKey: "AIzaSyAtitAAbFhcTcOXmM49xUNOHH5iYp-wqy4",
    authDomain: "musos-89802.firebaseapp.com",
    projectId: "musos-89802",
    storageBucket: "musos-89802.firebasestorage.app",
    messagingSenderId: "579012407593",
    appId: "1:579012407593:web:39280f65198035e9524738",
    measurementId: "G-2R38FKQPBG"
  },
  staging: {
    apiKey: "AIzaSyBogZIy_lnTnsKEK2JEDRgmeBU95A3cgAc",
    authDomain: "msu-sos-triage.firebaseapp.com",
    projectId: "msu-sos-triage",
    storageBucket: "msu-sos-triage.firebasestorage.app",
    messagingSenderId: "673546523240",
    appId: "1:673546523240:web:0fe8b9655e0790a4cde1dd",
    measurementId: "G-807LXTHFKH"
  },
  production: {
    apiKey: "AIzaSyBogZIy_lnTnsKEK2JEDRgmeBU95A3cgAc",
    authDomain: "msu-sos-triage.firebaseapp.com",
    projectId: "msu-sos-triage",
    storageBucket: "msu-sos-triage.firebasestorage.app",
    messagingSenderId: "673546523240",
    appId: "1:673546523240:web:0fe8b9655e0790a4cde1dd",
    measurementId: "G-807LXTHFKH"
  },  
  test: {
    apiKey: "AIzaSyAtitAAbFhcTcOXmM49xUNOHH5iYp-wqy4",
    authDomain: "musos-89802.firebaseapp.com",
    projectId: "musos-89802",
    storageBucket: "musos-89802.firebasestorage.app",
    messagingSenderId: "579012407593",
    appId: "1:579012407593:web:39280f65198035e9524738",
    measurementId: "G-2R38FKQPBG"
  }
};

const environment = process.env.NODE_ENV || 'development';
const app = initializeApp(firebaseConfig[environment]);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };

