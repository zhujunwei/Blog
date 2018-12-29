import React, {Component } from "react";
import {NavLink} from "react-router-dom";
import styles from "./header-nav.scss";
import { throttle } from "lodash"
import classnames from "classnames";

export default class HeaderNav extends Component{

  constructor(props){
    super(props);
    this.state = {
      showHeader: true
    }
  }

  componentDidMount(){
    document.addEventListener("scroll", throttle((e) => {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if(scrollTop > 50){
        this.setState({
          showHeader: false
        })
      }else{
        this.setState({
          showHeader: true
        })
      }
    }, 10))
  }

  render(){
    let navClass = classnames({
      [styles["header-nav"]]: true,
      [styles.slideUp]: !this.state.showHeader
    })
    return (
      <div className={navClass}>
        <header className={styles["header-navigation"]}>
          <nav>
            <div className={styles["logo"]}><a href="/">麻辣小面瘫</a></div>
            <ul>
              <li>
                <NavLink to={`/index`}>足迹</NavLink></li>
              <li>
                <NavLink to={`/index`}>首页</NavLink></li>
            </ul>
          </nav>
        </header>
      </div>
      
    )
    
  }
}