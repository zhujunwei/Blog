import React, {Component} from 'react';
import styles from "./home.scss";
import {observer, inject } from "mobx-react";
import Card from '@component/Card/card';
import ListItem from '@component/List-item/ListItem';
import Avatar from "@images/aisi.jpeg";
import {Affix} from "antd";

const LIST = [{
  title: "title1",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  img: Avatar
}, {
  title: "title2",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  img: Avatar
}, {
  title: "title3",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  img: Avatar
}, {
  title: "title4",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  img: Avatar
}, {
  title: "title5",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  img: Avatar
}, {
  title: "title6",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  img: Avatar
}]

@observer
class HomePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render(){
   
    return(
      <div className={styles.homePage}>
        
        <aside className={styles.leftBlock}>
          <Affix offset={80}>
            <Card title={"个人介绍"}>
              <div className={styles.info}>
                <i className={styles.avatar}>
                  <img src={Avatar} width="100%" alt={"头像"}></img>
                </i>
                <p className={styles.info_desc}>
                  麻辣小面瘫,麻辣小面瘫,麻辣小面瘫,麻辣小面瘫麻辣小面瘫麻辣小面瘫麻辣小面瘫麻辣小面瘫，麻辣小面瘫，
                  麻辣小面瘫,麻辣小面瘫,麻辣小面瘫,麻辣小面瘫麻辣小面瘫麻辣小面瘫麻辣小面瘫麻辣小面瘫，麻辣小面瘫，
                </p>
              </div>
            </Card>
          </Affix>
          
        </aside>
        <main className={styles.rightBlock}>
          {
            LIST.map((element, index) => <ListItem title={element.title} desc={element.desc} key={index} img={element.img}/>)
          }
          
        </main>
      </div>
    )
  }
}

export default HomePage;