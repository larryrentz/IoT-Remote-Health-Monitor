import './App.css';
import { auth } from './components/Firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import Patient from './components/Patient.js'
import Signin from './components/SignIn';

function App() {
  //Get current user
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? <Patient/> : <Signin />}
    </div>
  );
}
export default App;
