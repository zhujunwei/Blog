import React, {Component} from "react";
import styles from "./detail.scss";
import Card from '@component/Card/card';
import Layout from '@component/Layout/layout';
import DetailCard from '@component/DetailCard/index';
import Avatar from "@images/aisi.jpeg";
import {Affix} from "antd";

export default class Detail extends Component {
  render(){
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
                    麻辣小面瘫,麻辣小面瘫,麻辣小面瘫,麻辣小面瘫麻辣小面瘫麻辣小面瘫麻辣小面瘫麻辣小面瘫，麻辣小面瘫，
                    麻辣小面瘫,麻辣小面瘫,麻辣小面瘫,麻辣小面瘫麻辣小面瘫麻辣小面瘫麻辣小面瘫麻辣小面瘫，麻辣小面瘫，
                  </p>
                </div>
              </Card>
            </Affix>
          }
        >
          <DetailCard
            title={"test啊啊啊"}
            name={'麻辣小面瘫'}
            time={"1"}
          ></DetailCard>
        </Layout>
      </div>
    )
  }
}
