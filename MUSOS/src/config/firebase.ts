import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtitAAbFhcTcOXmM49xUNOHH5iYp-wqy4",
  authDomain: "musos-89802.firebaseapp.com",
  projectId: "musos-89802",
  storageBucket: "musos-89802.firebasestorage.app",
  messagingSenderId: "579012407593",
  appId: "1:579012407593:web:39280f65198035e9524738",
  measurementId: "G-2R38FKQPBG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
