import React, {Component} from "react";

import {Redirect, withRouter} from "react-router-dom";
import {observer, inject } from "mobx-react"
import axios from 'axios';

@withRouter
@inject("userInfoStore")
@observer
export default class CheckLoginComponent extends Component {
  componentDidMount(){
    console.log(this.props.location);
    let {
      pathname
    } = this.props.location;
    const token = window.localStorage.getItem('token');
    if(pathname === "/login"){//判断是否在登录
        return
    }
    //获取用户信息
    axios.get('/getUserInfo')
			.then(res=>{
				//有登录信息
				let { userInfoStore } = this.props;
				userInfoStore.setUserInfo(res)
			}).catch(err=>{
        this.props.history.replace('/login');
			})
	}
	

  render(){
    return null
  }
}