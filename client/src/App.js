import React, { Component } from "react";
import {Provider} from 'mobx-react';
import {  BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import stores from './stores/index';

import HomePage from "./pages/homePage/homePage";

class App extends Component{
  render(){
    return (
      <Provider {...stores}>
        <Router >
          <div>
           
            <Switch>
              <Route exact path="/" component={HomePage} />
            </Switch>
            
          </div>
        </Router>
      </Provider>
      
    )
  }
}

export default App;