import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";
import Auth from "./Auth";

import "./Login.css";

const { Header, Footer, Content } = Layout;

class Login extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      redirectToReferrer: false
    };
  }

  componentDidMount() {
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.async = true;
    e.src = "https://apis.google.com/js/client:platform.js";
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t);
    window.onSignin = googleUser => {
      console.log(googleUser);
      var id_token = googleUser.getAuthResponse().id_token;
      fetch("/api/auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: id_token })
      }).then( req => req.json() )
      .then( req => {
        if (req) {
          Auth.setUser(googleUser);
          Auth.authenticate(req, this.setState({ redirectToReferrer: true }));
        } else {
          console.log("Not authenticated...");
        }
      })

    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (

      <Content className="App-content">
        <div>
          <MetaTags>
            <meta
              name="google-signin-client_id"
              content="259902397583-g94c052uvh0urlk2r83a711icpuuuqo8.apps.googleusercontent.com"
            />
          </MetaTags>
          <div className="g-signin2" data-onsuccess="onSignin"></div>
        </div>
      </Content>
    );
  }
}

export default Login;
