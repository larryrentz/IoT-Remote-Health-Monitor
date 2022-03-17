import { auth } from './Firebase';
import firebase from 'firebase/compat/app';
		
const signInWithGoogle = () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

const Signin = () => (
    <main>
    <button onClick={signInWithGoogle}>Sign In With Google</button>
  </main>
)


export default Signin;