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
    apiKey: "AIzaSyAMNihG2u4EDu6GHOSD1hp2TsX1W2A75Aw",
    authDomain: "msu-triage.firebaseapp.com",
    projectId: "msu-triage",
    storageBucket: "msu-triage.firebasestorage.app",
    messagingSenderId: "150313635848",
    appId: "1:150313635848:web:56a9815baee346098641bd",
    measurementId: "G-Q4H9Z65B6W"
  },
  production: {
    apiKey: "AIzaSyAMNihG2u4EDu6GHOSD1hp2TsX1W2A75Aw",
    authDomain: "msu-triage.firebaseapp.com",
    projectId: "msu-triage",
    storageBucket: "msu-triage.firebasestorage.app",
    messagingSenderId: "150313635848",
    appId: "1:150313635848:web:56a9815baee346098641bd",
    measurementId: "G-Q4H9Z65B6W"
  }
};

const environment = process.env.NODE_ENV || 'development';
const app = initializeApp(firebaseConfig[environment]);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };

