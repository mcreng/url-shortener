import React, { Component } from 'react';

import { Layout, Input, Button, Row, Col, notification, Modal, Tag } from "antd";

import './Login.css';

const { Header, Footer, Content } = Layout;

class Login extends Component {

  render() {
    return (
      <Content className="App-content">
        <p>Login!</p>
      </Content>
    );
  }
}

export default Login;