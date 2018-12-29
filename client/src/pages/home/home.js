import React, {Component} from 'react';
import styles from "./home.scss";
import {observer} from "mobx-react";
import Card from '@component/Card/card';
import Layout from '@component/Layout/layout';
import ListItem from '@component/List-item/ListItem';
import Avatar from "@images/aisi.jpeg";
import {Affix} from "antd";

const LIST = [{
  title: "title1",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  id: 1,
  img: Avatar
}, {
  title: "title2",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  id: 2,
  img: Avatar
}, {
  title: "title3",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  id: 3,
  img: Avatar
}, {
  title: "title4",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  id: 4,
  img: Avatar
}, {
  title: "title5",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  id: 5,
  img: Avatar
}, {
  title: "title6",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  id: 6,
  img: Avatar
}, {
  title: "title6",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  id: 7,
  img: Avatar
}, {
  title: "title6",
  desc: "desc1111111, 22222, 3333333333333333333333333333",
  id: 8,
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
        <Layout
          sides={
            <Affix offset={0}>
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
          }
        >
          {
            LIST.map((element, index) => 
              <ListItem title={element.title} desc={element.desc} key={index} img={element.img} to={`/detail/${element.id}`}/>
            )
          }
        </Layout>
      </div>
    )
  }
}

export default HomePage;