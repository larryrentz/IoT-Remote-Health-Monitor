import { MenuItem } from '@mui/material';
import './App.css';
import Navigation from './components/Navigation.js';
import Patient from './components/Patient.js';
import MenuItems from './components/MenuItems.js';
import React from "react";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
import { useStyles } from "./styles";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.appRoot}>
      <Patient/>
      <Router>
        <Navigation />
        <div>
          <div className={classes.appBarSpacer}></div>
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route exact key={index} path={route.path}>
                  {route.component}
                </Route>
              );
            })}
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;
