import React, {Component } from "react";
import styles from "./card.scss";

export default class CardComponent extends Component{
  render(){
    let {
      title,
      children
    } = this.props;
    return (
      <div className={styles.card}>
        <header className={styles.cardHeader}>
          {title}
        </header>
        <div className={styles.cardBody}>
          {children}
        </div>
      </div>
      
    )
    
  }
}