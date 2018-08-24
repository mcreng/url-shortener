import React, { Component } from 'react';
import { Layout, Input, Button, Row, Col, notification, Modal, Tag } from "antd";
import MetaTags from 'react-meta-tags';
import GoogleLogin from './GoogleLogin';

import './Login.css';

const { Header, Footer, Content } = Layout;
const responseGoogle = (response) => {
  console.log(123, response);
}
class Login extends Component {

  render() {
    return (
      <Content className="App-content">
        <GoogleLogin />
        <p>Login!</p>
      </Content>
    );
  }
}

export default Login;