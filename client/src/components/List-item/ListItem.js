import React, {Component} from 'react';
import styles from "./ListItem.scss";
import Avatar from "@images/aisi.jpeg";

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
      itemKey = ""
    } = this.props;
    return(
      <div className={styles.ListItem} key={itemKey}>
        <main className={styles.itemContain}>
          <h3>{title}</h3>
          <p>{desc}</p>
        </main>
        <div className={styles.itemImg}>
          <img src={img} width="100%" height="100%" alt={"hohoho"}></img>
        </div>
      </div>
    )
  }
}