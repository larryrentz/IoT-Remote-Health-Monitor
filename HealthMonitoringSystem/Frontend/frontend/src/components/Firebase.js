import firebase from 'firebase/compat/app'

import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/functions"

// firebase.initializeApp({
//     apiKey: "AIzaSyBFuLFk95pOi0FkcsMAdaq8OSuGWffpYic",
//     authDomain: "iot-remote-health-monitor.firebaseapp.com",
//     projectId: "iot-remote-health-monitor",
//     storageBucket: "iot-remote-health-monitor.appspot.com",
//     messagingSenderId: "72011895649",
//     appId: "1:72011895649:web:7582011578b56eba766b20"
// });

firebase.initializeApp({
    apiKey: "AIzaSyDGC2SCuqZHB7rBblDPyTNJflmuMmULD10",
    authDomain: "remote-health-monitor-740d6.firebaseapp.com",
    projectId: "remote-health-monitor-740d6",
    storageBucket: "remote-health-monitor-740d6.appspot.com",
    messagingSenderId: "1031641000421",
    appId: "1:1031641000421:web:d9c94e16b830ae3096e70c"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

export default firebase;