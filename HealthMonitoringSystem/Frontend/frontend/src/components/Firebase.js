import firebase from 'firebase/compat/app'

import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/functions"

firebase.initializeApp({
  apiKey: "AIzaSyB1hHKIUaKTbHS38-_OQLT7ROcev2UcTps",
  authDomain: "remote-health-monitor-9c217.firebaseapp.com",
  projectId: "remote-health-monitor-9c217",
  storageBucket: "remote-health-monitor-9c217.appspot.com",
  messagingSenderId: "747805954696",
  appId: "1:747805954696:web:5bf85297b59b83baf9c53d"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

export default firebase;