import React, {Component} from "react";
import {
  Form, Icon, Input, Button, message
} from 'antd';
import styles from "./login.scss";
import axios from "axios";

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/login', values)
          .then((res) => {
            message.success("登录成功");
            this.props.history.replace('/');
            
          })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.loginPage}>
        <h1>小楼</h1>
        <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm