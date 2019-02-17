import React, {Component} from "react";
import styles from "./index.scss";
import PropTypes from 'prop-types';
import axios from "axios";
import moment from "moment";
import marked from 'marked'
import hljs from 'highlight.js'

export default class DetailCard extends Component{

  constructor(props){
    super(props)
    this.state = {
      article: {}
    }
  }

  componentWillMount() {
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value
    })
  }

  componentDidMount() {
    let id = this.props.id;
    axios.get("/getArticleDetail?ID="+ id)
      .then(res => {
        this.setState({
          article: res.result[0]
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render(){
    let {
      article
    } = this.state;
    let {
      article_detail
    } = article;
    return(
      <div className={styles.detaiCardContain}>
        <h3 className={styles.detailTitle}>
          {article.article_title}
        </h3>
        <p className={styles.detailDesc}>
          <span>作者：朱俊伟 </span>
          <span>时间：{moment(new Date(+article.create_at)).format("YYYY-MM-DD HH:mm")}</span>
          {/* <span>4567人已阅读</span> */}
        </p>
        {/* <div className={styles.tags}>
          <span className={styles.tag}>正义</span>
          <span className={styles.tag}>佳杰会所</span>
          <span className={styles.tag}>艳龙私人定制</span>
        </div> */}
        <div className={styles.otherInfo}>
          {article.article_desc}
        </div>
        <div className={styles.detailInfos}
          dangerouslySetInnerHTML={
            {
              __html: article_detail ? marked(article_detail) : ""
            }
          }
        >
        
        </div>
      </div>
    )
  }
}

DetailCard.PropTypes = {
  id: PropTypes.number.isRequired
}