
import React, {Component} from 'react';
import {  BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import {Provider} from 'mobx-react';
import Loadable from '@component/Loadable/loadable';

import stores from './stores/index';
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";
import CheckLoginComponent from "./components/CheckLogin/checkLogin";
// const HomePage = Loadable({
//   loader: () => import('./pages/home/home')
// });
import "./config/config";

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router >
          <div>
            <CheckLoginComponent />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Redirect to={"/login"} component={HomePage} />
            </Switch>
          </div>
        </Router>
      </Provider>
      
    );
  }
}

export default App;
