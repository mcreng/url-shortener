import React, { Component } from 'react';
import { Layout, Input, Button, Row, Col, notification, Modal, Tag } from "antd";
import { GoogleLogin } from 'react-google-login';

import './Login.css';

const { Header, Footer, Content } = Layout;
const responseGoogle = (response) => {
  console.log(response);
}
class Login extends Component {

  render() {
    return (
      <Content className="App-content">
        <GoogleLogin
          clientId="259902397583-h8ub31rj0ob4pf3g1c0tb809qee3155d.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <p>Login!</p>
      </Content>
    );
  }
}

export default Login;