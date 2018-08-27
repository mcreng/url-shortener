import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import "./GoogleLogin.css";

class Login extends Component {

  componentDidMount() {
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.async = true;
    e.src = "https://apis.google.com/js/client:platform.js";
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t);

    window.onSignin = googleUser => {
      var id_token = googleUser.getAuthResponse().id_token;
      fetch("/api/auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: id_token })
      })
    };
  }

  render() {
    return (
      <div>
        <MetaTags>
          <meta
            name="google-signin-client_id"
            content="259902397583-g94c052uvh0urlk2r83a711icpuuuqo8.apps.googleusercontent.com"
          />
        </MetaTags>
        <div className="g-signin2" data-onsuccess="onSignin"></div> />
      </div>
    );
  }
}



export default Login;
