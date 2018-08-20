import React, { Component } from 'react';

import { Layout, Input, Button, Row, Col } from "antd";

import logo from './logo.svg';

import './App.css';

const { Header, Footer, Content } = Layout;

class App extends Component {
  state = {
    response: '',
    shortening: false,
    currentUrl: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  async addUrl(evt) {
    const response = await fetch('/api/hello', { 
      method: 'POST',
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify({name: 'kitten'}) 
    });

    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <div className="App">
        <Content className="App-content">
          <div align="middle">
            <Row type="flex" justify="space-between" className="App-add-todo-span">
              <Col span={17} offset={2} >
                <Input
                className="App-url-input"
                size="large"
                placeholder="Enter the url to be shortened..."
                disabled={this.state.shortening}
                onChange={evt => this.setState({ currentUrl: evt.target.value })}
                value={this.state.currentUrl}
                onPressEnter={this.addUrl}
                />
              </Col>
              <Col align="right" span={3}>
                <Button
                  className="App-url-button"
                  size="large"
                  type="primary"
                  onClick={this.addUrl}
                  loading={this.state.shortening}
                >Shorten it!</Button>
              </Col>
              <Col offset={2}/>
            </Row>
          </div>
        </Content>
      </div>
    );
  }
}

export default App;