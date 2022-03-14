import { MenuItem } from '@mui/material';
import './App.css';
import Navigation from './components/Navigation';
import Patient from './components/Patient.js';
import MenuItems from './components/MenuItems.js';

function App() {
  return (
    <div>
      <Patient/>
      <Navigation/>
    </div>
  );
}
export default App;
