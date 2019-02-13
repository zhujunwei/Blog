import React, { Component } from 'react';
import styles from "./home.scss";
import { observer } from "mobx-react";
import {
  Layout, Menu, Icon
} from 'antd';
import ArticleComponent from "@component/Article/article.js";

const { Header, Content, Sider } = Layout;


@observer
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selectKeys: 1
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  //点击列表
  handleClick = (e) => {
    let {
      key
    } = e;
    this.setState({
      selectKeys: key
    })
  }

  render() {
    let {
      selectKeys
    } = this.state;
    return (
      <div className={styles.homePage}>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className={styles.logo}>你好</div>
            <Menu 
              theme="dark"
              mode="inline" 
              onClick={this.handleClick}
              defaultSelectedKeys={[selectKeys.toString()]}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>文章列表</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="setting" />
                <span>设置</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{
                margin: '24px 16px', padding: 24, background: '#fff', minHeight: 580,
              }}
            >
              {
                selectKeys === 1 ? 
                  <ArticleComponent ></ArticleComponent>
                  :
                  null
              }
              
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default HomePage;