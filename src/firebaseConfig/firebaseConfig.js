import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'; 
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'; 
const firebaseConfig = {
  apiKey: "AIzaSyBkhi55m0x2UMPdJryymvuCMdlgXlljXgo",
  authDomain: "invoice-app-f36df.firebaseapp.com",
  projectId: "invoice-app-f36df",
  storageBucket: "invoice-app-f36df.appspot.com",
  messagingSenderId: "1038756618152",
  appId: "1:1038756618152:web:2dc290b557606ee795479d"
};

 const app = initializeApp(firebaseConfig);
 export const  auth = getAuth(app);
 export const  db = getFirestore(app);
 export const  storage = getStorage(app);