
import React, {Component} from 'react';
import {  BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import {Provider} from 'mobx-react';
import HeaderNav from './components/header-nav/header-nav';
import Loadable from '@component/Loadable/loadable';

import stores from './stores/index';

const HomePage = Loadable({
  loader: () => import('./pages/home/home')
});
const DetailPage = Loadable({
  loader: () => import('./pages/detail/detail')
});

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router >
          <div>
            <HeaderNav />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/detail" component={DetailPage} />
              <Redirect to={"/"} component={HomePage} />
            </Switch>
          </div>
        </Router>
      </Provider>
      
    );
  }
}

export default App;
