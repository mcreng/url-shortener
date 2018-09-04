import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import "./App.css";
import UserDisplay from "./components/UserDisplay";
import UrlDisplay from "./components/UrlDisplay";
import UrlInput from "./components/UrlInput";

const { Header, Footer, Content } = Layout;

class App extends Component {
  componentWillMount() {
    document.title = "mcreng's URL Shortener";
  }

  render() {
    return (
      <div className="App">
        <Header className="App-header">
          <Row className="App-header-user" type="flex" align="middle">
            <Col className="App-header-user-col" span={6} offset={9}>
              <p>URL Shortener</p>
            </Col>
            <Col className="App-header-user-col" span={5} offset={2}>
              <UserDisplay />
            </Col>
          </Row>
        </Header>
        <Content className="App-content">
          <UrlInput className="App-url-input" />
          <UrlDisplay className="App-url-display" />
        </Content>
        <Footer style={{ textAlign: "center" }} className="App-footer">
          Using Nodejs, PostgreSQL, express, knex as backend; React, AntDesign
          as frontend; Heroku as host.
        </Footer>
      </div>
    );
  }
}

export default App;
