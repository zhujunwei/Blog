import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {observer, inject } from "mobx-react";


@inject("userInfoStore")
@observer
//私有路由，只有登录的用户才能访问
class PrivateRoute extends React.Component {
  componentWillMount() {
    let isAuthenticated = localStorage.getItem("token") ? true : false;
    this.setState({ isAuthenticated: isAuthenticated })
    if (!isAuthenticated) {
      const { history, location, userInfoStore } = this.props;
      if(/\/chapterlist||\/person/.test(location.pathname)){
        userInfoStore.setLoginBtn(true);
      }else{
        userInfoStore.setLoginBtn(false);
      }
    }
  }

  shouldComponentUpdate(){
    if (this.props.history.location !== this.props.location) {
      let isAuthenticated = localStorage.getItem("token") ? true : false;
      if (!isAuthenticated) {
        const { history, location, userInfoStore } = this.props;
        if(/\/chapterlist||\/person/.test(location.pathname)){
          userInfoStore.setLoginBtn(true);
        }else{
          userInfoStore.setLoginBtn(false);
        }
      }

    }
    return true;    
  }

  render() {
    let { component: Component, path = "/", exact = false, strict = false } = this.props;
    return this.state.isAuthenticated ? (
      <Route path={path} exact={exact} strict={strict} render={(props) => (<Component {...props} />)} />
    ) : ("请重新登录");
  }
}
PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  component: PropTypes.func.isRequired
}
export default withRouter(PrivateRoute);