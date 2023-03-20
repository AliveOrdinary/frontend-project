// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMPnbGRKoiMgCIwhKafZPW622QUdkNUDk",
    authDomain: "workplace-project-f6a3d.firebaseapp.com",
    projectId: "workplace-project-f6a3d",
    storageBucket: "workplace-project-f6a3d.appspot.com",
    messagingSenderId: "483531810239",
    appId: "1:483531810239:web:95ba97862d79ad59ae2d0a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);