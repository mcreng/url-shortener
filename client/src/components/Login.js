import React, { Component } from 'react';
import { Layout } from "antd";
import GoogleLogin from './GoogleLogin';

import './Login.css';

const { Header, Footer, Content } = Layout;
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