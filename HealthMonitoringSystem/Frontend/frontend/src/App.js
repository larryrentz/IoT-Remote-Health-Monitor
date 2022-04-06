import './App.css';
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from 'react';
import Signin from './components/SignIn';
import Dashboard from './components/Dashboard';
import { auth } from './components/Firebase';
import Context from './Context';

function App() {
  const [supportsBluetooth, setSupportsBluetooth] = useState(false);

  //Get current user and store use as the default for app context
  const [user] = useAuthState(auth);

  // When the component mounts, check that the browser supports Bluetooth
  useEffect(() => {
    if (navigator.bluetooth) {
      setSupportsBluetooth(true);
    }
  }, []);

  const signInPage = <Signin />;
  const dashboard = <Dashboard user={user}/>;

  return (
    <>
      {user && supportsBluetooth && dashboard}
      {!user && supportsBluetooth && signInPage} 
    </>
  );
}
export default App;
