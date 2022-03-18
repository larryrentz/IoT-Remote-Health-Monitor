import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth"
import "firebase/compat/functions"

const firebaseConfig = {
    apiKey: "AIzaSyBFuLFk95pOi0FkcsMAdaq8OSuGWffpYic",
    authDomain: "iot-remote-health-monitor.firebaseapp.com",
    projectId: "iot-remote-health-monitor",
    storageBucket: "iot-remote-health-monitor.appspot.com",
    messagingSenderId: "72011895649",
    appId: "1:72011895649:web:7582011578b56eba766b20"
};

const app = firebase.initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = firebase.auth();
export const functions = firebase.functions();

export default app;