import React, {Component} from "react";
import styles from "./detail.scss";
import Card from '@component/Card/card';
import Layout from '@component/Layout/layout';
import DetailCard from '@component/DetailCard/index';
import Avatar from "@images/aisi.jpeg";
import {Affix} from "antd";
import {withRouter} from "react-router-dom";

@withRouter
export default class Detail extends Component {
  state = {

  }
  render(){
    let id = this.props.match.params.id;
    return(
      <div>
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
          <DetailCard id={id}></DetailCard>
        </Layout>
      </div>
    )
  }
}
