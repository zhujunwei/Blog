/**
 * 添加文章
 */

import React, {Component} from "react";
import ReactDOM from 'react-dom';
import styles from "./index.scss";
import {Button, Form, Input} from "antd";
import axios from "axios";
import Editor from 'wangeditor';
import {isFunction, get as safeGet} from "lodash";
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
      editorHtml: '',
      editorText: '',
    }
  }

  componentDidMount() {
    var editor = new Editor(ReactDOM.findDOMNode(this._div));
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = (html) => {
      this.setState({
        editorHtml: html,
        editorText: editor.txt.text()
      })
      //将html值设为form表单的desc属性值
      this.props.form.setFieldsValue({
        'article': html
      });
    }
    editor.create();

  }

  getArticleDetail = () => {
    let {
      updateParam
    } = this.props;
    axios.post()
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
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
         //提交表单处理事项
         console.log(values);
         axios.post('/addArticle', values)
          .then(res => {
            console.log(res);
            isFunction(closeAddArticle) && closeAddArticle();
          })
          .catch(err => {
            console.log(err);
          })
      }
    });
  }

  render(){
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    return(
      <div className={styles.article}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="标题"
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input article title!' }],
            })(
              <Input placeholder="title" />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('desc')(
              <TextArea placeholder="desc" />
            )}
          </Form.Item>
          <Form.Item 
            {...formItemLayout} 
            label="内容"
          >
            {getFieldDecorator('article', {
              rules: [{
                required: true,
                message: '请填写描述',
              }, {// 使用自定义的校验规则
                validator: this.validateEditorFrom
              }],
              initialValue: ''
            })(
              <div ref={(ref) => this._div = ref}></div>
            )}
          </Form.Item>
          <Form.Item>
            <Button
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