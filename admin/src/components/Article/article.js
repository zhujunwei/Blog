/**
 * 文章列表
 */

import React, {Component, Fragment} from "react";
import styles from "./index.scss";
import {Button, Popconfirm} from "antd";
import axios from "axios";
import Loadable from '@component/Loadable/loadable';
// import AddArticleComponent from "../AddArticle/addArticle";
const AddArticleComponent = Loadable({
  loader: () => import('../AddArticle/addArticle')
});
export default class ArticleComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      articleList : [],
      updateParam : null,
      mode: "list" //列表 发布模式区分
    }
  }


  componentDidMount() {
    this.fetchArticleList()
  }

  fetchArticleList = () => {
    axios.get('/getArticleList')
      .then(res => {
        console.log(res);
        this.setState({
          articleList: res.result
        })
      })
  }

  addArticle = () => {
    let {
      mode
    } = this.state;
    this.setState({
      mode: mode === "add" ? "list" : "add"
    })
  }

  //关闭编辑
  closeAddArticle = () => {
    this.fetchArticleList()
    this.setState({
      mode: "list",
      updateParam: null
    })
  }

  //删除文章
  deleteArticle = (id) => {
    axios.post('/deleteArticle', {
      id
    })
    .then(res => {
      this.fetchArticleList()
    })
  }

  render(){
    let {
      articleList,
      mode,
      updateParam
    } = this.state;
    return(
      <div className={styles.article}>
        <Button 
          onClick={this.addArticle}
          type="primary" className={styles.addArticle}>
          {
            mode === "list" ? "发布" : "关闭"
          }  
        </Button>
        {
          mode === "list" ? 
            <Fragment>
              
              {
                !!articleList.length ? 
                  articleList.map((element, index) => {
                    return (
                      <ul className={styles.articleList} key={element.ID}>
                        <li className={styles.articleListItem}>
                          <p className={styles.articleIndex}>{index + 1}.</p>
                          <p className={styles.articleTitle}>{element.title}</p>
                          <p className={styles.articleDesc}>{element.description}</p>
                          <section className={styles.rightBtns}>
                            <Popconfirm
                              title="确认删除吗?" 
                              okText="确认"
                              cancelText="取消"
                              onConfirm={() => {
                                this.deleteArticle(element.ID)
                              }}
                            >
                              <Button 
                                type="primary">删除</Button>
                            </Popconfirm>
                           
                            <Button 
                              onClick={() => {
                                this.setState({
                                  mode: "edit",
                                  updateParam: {
                                    ID: element.ID,
                                    editItem: element
                                  }
                                })
                              }}
                              type="primary">编辑</Button>
                          </section>
                        </li>
                      </ul>
                    )
                    
                  })
                  :
                  "暂无记录"
              }
            </Fragment>
            :
            <AddArticleComponent
              updateParam={updateParam}
              closeAddArticle={this.closeAddArticle}
            />
        }
        
       
      </div>
    )
  }
}