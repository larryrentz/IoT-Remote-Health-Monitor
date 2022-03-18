import firebase from 'firebase/compat/app'

import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/functions"

firebase.initializeApp({
    apiKey: "AIzaSyBFuLFk95pOi0FkcsMAdaq8OSuGWffpYic",
    authDomain: "iot-remote-health-monitor.firebaseapp.com",
    projectId: "iot-remote-health-monitor",
    storageBucket: "iot-remote-health-monitor.appspot.com",
    messagingSenderId: "72011895649",
    appId: "1:72011895649:web:7582011578b56eba766b20"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

export default firebase;