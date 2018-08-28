import React, { Component } from "react";
import { Layout, Button, Avatar } from "antd";
import Auth from "./Auth";

import "./UserDisplay.css";

const { Header, Footer, Content } = Layout;

class UserDisplay extends Component {

  render() {
    console.log(Auth.user);
    return (
      <span className="user-span">
        Hello {Auth.getName()}!
        <Avatar className="user-avatar" src={Auth.getImageUrl()}/>  
        <Button className="user-logout">Logout</Button>
      </span>
    );
  }
}

export default UserDisplay;
