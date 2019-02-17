import React, {Component} from 'react';
import styles from "./home.scss";
import {observer} from "mobx-react";
import Card from '@component/Card/card';
import Layout from '@component/Layout/layout';
import ListItem from '@component/List-item/ListItem';
import Avatar from "@images/aisi.jpeg";
import {Affix} from "antd";
import axios from "axios";


@observer
class HomePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    axios.get("/getArticleList")
      .then(res => {
        this.setState({
          list: res.result
        })
      })
  }

  render(){
    let {
      list
    } = this.state;
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
                    朱俊伟， 男， 93年， 双鱼座， 前端。
                  </p>
                </div>
              </Card>
            </Affix>
          }
        >
          {
            list.map((element, index) => 
              <ListItem title={element.title} desc={element.description} key={index} img={element.img} to={`/detail/${element.ID}`}/>
            )
          }
        </Layout>
      </div>
    )
  }
}

export default HomePage;