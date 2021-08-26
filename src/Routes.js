import React, { Component } from 'react';
import { Scene, Router, } from 'react-native-router-flux'
// import firebase from 'firebase'


import Splash from './container/Splashscreen'
import Login from './container/signIn'
import SignUp from './container/signup'
import ForgotPassword from './container/forgetYourPassword'
import Home from './container/home'
import AdminHome from './container/adminHome'
import PhoneVerification from './container/phoneVerification'


class Route extends Component {
  render() {
    return (
      <Router>
        <Scene>
          <Scene key='Splash'  component={Splash} hideNavBar={true} initial />
          <Scene key='signIn' component={Login} hideNavBar={true} />
          <Scene key='signUp' component={SignUp} hideNavBar={true} />
          <Scene key='Home' component={Home} hideNavBar={true} />
          <Scene key='PhoneVerification'  component={PhoneVerification} hideNavBar={true} />
          <Scene key='AdminHome' component={AdminHome} hideNavBar={true} />
          <Scene key='forGotPassword' component={ForgotPassword} hideNavBar={true} />
  
        </Scene>
      </Router>
    )
  }
}

export default Route