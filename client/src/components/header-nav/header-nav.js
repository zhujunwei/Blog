import React, {Component } from "react";
import {NavLink} from "react-router-dom";
import styles from "./header-nav.scss";

export default class HeaderNav extends Component{
  render(){
    return (
      <div className={styles["header-nav"]}>
        <header className={styles["header-navigation"]} id="header">
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