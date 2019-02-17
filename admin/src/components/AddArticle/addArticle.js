/**
 * 添加文章
 */

import React, {Component} from "react";
import styles from "./index.scss";
import {Button, Form, Input, Message} from "antd";
import axios from "axios";
import {isFunction, get as safeGet} from "lodash";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 },
  },
};

class AddArticleComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      desc: null,
      editorHtml: '',
      editorText: '',
      value: "",
      tab: "write"
    }
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  componentDidMount() {
    let id = safeGet(this.props.updateParam, "ID");
    if(id){
      axios.get("/getArticleDetail?ID="+ id)
        .then(res => {
          if(res.result.length){
            let {
              article_detail,
              article_title,
              article_desc
            } = res.result[0];
            
            this.setState({
              value: article_detail,
              title: article_title,
              desc: article_desc 
            })
          }
        })
    }
  }

  //校验表单
  validateEditorFrom = (rule, value, callback) => {
    if (this.state.editorText.trim() === '') {
      callback('不能为空');
    }
    callback();
  }

  handleSubmit = (e) => {
    let {
      closeAddArticle
    } = this.props;
    let ID = safeGet(this.props.updateParam, "ID");
    if(!this.state.value){
      Message.error("请输入文章内容")
      return;
    }
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
         //提交表单处理事项
         values.article = this.state.value;
         ID && (values.ID = ID);
         axios.post('/addArticle', values)
         
          .then(res => {
            isFunction(closeAddArticle) && closeAddArticle();
          })
          .catch(err => {
            console.log(err);
            Message.error("添加或者修改失败")
          })
      }
    });
  }

  //值改变
  handleValueChange = (value) => {
    this.setState({ value });
  };

  //预览 写入切换
  handleTabChange = (tab) => {
    this.setState({tab})
  };


  render(){
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    let {
      title,
      desc,
      value,
      tab
    } = this.state;
    return(
      <div className={styles.article}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="标题"
          >
            {getFieldDecorator('title', {
              initialValue: title,
              rules: [{ required: true, message: 'Please input article title!' }],
            })(
              <Input placeholder="title" />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('desc', {
              initialValue: desc,
            })(
              <TextArea placeholder="desc" />
            )}
          </Form.Item>
          <Form.Item 
            {...formItemLayout} 
            label="内容"
          >
            <ReactMde
              onTabChange={this.handleTabChange}
              onChange={this.handleValueChange}
              value={value}
              selectedTab={tab}
              generateMarkdownPreview={markdown =>
                Promise.resolve(this.converter.makeHtml(markdown))
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              className={styles.subStyle}
              type="primary"
              htmlType="submit"
            >
              完成
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const AddArticleComponentForm = Form.create()(AddArticleComponent);
export default AddArticleComponentForm