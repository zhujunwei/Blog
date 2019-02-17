import React, {Component} from 'react';
import styles from "./ListItem.scss";
import {Link} from "react-router-dom";
export default class ListItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render(){
    let {
      title,
      desc,
      img,
      to,
      itemKey = ""
    } = this.props;
    return(
      <div className={styles.ListItem} key={itemKey}>
        <main className={styles.itemContain}>
          <Link to={to}><h3>{title}</h3></Link>
          <p>{desc}</p>
        </main>
        <div className={styles.itemImg}>
          {
            img && <img src={img} width="100%" height="100%" alt={"hohoho"}></img>
          }
          
        </div>
      </div>
    )
  }
}