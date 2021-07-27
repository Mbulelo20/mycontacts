import './App.css';
import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/Home.js';
import About from './pages/About.js'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import  AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Alerts/>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path ='/signup' component={Register} />
                <Route exact path ='/login' component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;