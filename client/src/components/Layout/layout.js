import React, {Component} from "react";
import styles from "./layout.scss";

export default class Layout extends Component{
  render(){
    let {
      sides,
      children,
      className
    } = this.props;
    return(
      <div className={styles.layout + " " + className}>
        <aside className={styles.leftBlock}>
          {sides}
        </aside>
        <main className={styles.rightBlock}>
          {children}
        </main>
      </div>
    )
  }
}