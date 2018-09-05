import React, { Component } from "react";
import { Button, Avatar } from "antd";
import { Redirect } from "react-router-dom";
import Auth from "./Auth";

import "./UserDisplay.css";

class UserDisplay extends Component {
  constructor(prop) {
    super(prop);
    this.logout = this.logout.bind(this);
    this.state = [{ redirect: false }];
  }

  async logout() {
    Auth.authenticate(false, () => {});
    Auth.disconnect();
    Auth.resetUser();
    const response = await fetch("/api/auth/logout", {
      method: "POST"
    });
    console.log(`response: ${response}.`);
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <span className="user-span">
        Hello {Auth.getName()}!
        <Avatar className="user-avatar" src={Auth.getImageUrl()} />
        <Button onClick={this.logout} className="user-logout">
          Logout
        </Button>
      </span>
    );
  }
}

export default UserDisplay;
