import React, { Component } from 'react';

import { Layout, Input, Button, Row, Col, notification, Modal, Tag } from "antd";

import {CopyToClipboard} from 'react-copy-to-clipboard';

import './App.css';

const { Header, Footer, Content } = Layout;

class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      response: '',
      shortening: false,
      currentUrl: ''
    };

    this.addUrl = this.addUrl.bind(this);
  }

   async addUrl(evt) {
    console.log(this.state.currentUrl);
    const response = await fetch('/api/url', { 
      method: 'POST',
      headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'}, 
      body: JSON.stringify({url: this.state.currentUrl}) 
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    Modal.success({
      title: 'Shortened URL Generated',
      content: (
        <div>
          <p>The shortened url is {body.surl}. </p>
          <span>Click to copy: <CopyToClipboard text={body.surl}><Tag color="geekblue">Copy</Tag></CopyToClipboard></span>
        </div>
      ),
      centered: true,
    });
  }

  render() {
    return (
      <div className="App">
        <Content className="App-content">
          <div align="middle">
            <Row type="flex" justify="space-between" className="App-add-todo-span">
              <Col lg={ {span: 17, offset: 2} } sm={24} xs={24}>
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
              <Col lg={0} sm={24} xs={24} style={ {padding: '5vh'} } />
              <Col align="center" lg={3} sm={24} xs={24}>
                <Button
                  className="App-url-button"
                  size="large"
                  type="primary"
                  onClick={this.addUrl}
                  loading={this.state.shortening}
                >Shorten it!</Button>
              </Col>
              <Col lg={2}/>
            </Row>
          </div>
        </Content>
      </div>
    );
  }
}

export default App;