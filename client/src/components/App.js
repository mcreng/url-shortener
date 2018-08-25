import React, { Component } from 'react';

import { Layout, Input, Button, Row, Col, notification, Modal, Tag } from "antd";

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
    const response = await fetch('/api/url', { 
      method: 'POST',
      headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'}, 
      body: JSON.stringify({url: this.state.currentUrl}) 
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    Modal.confirm({
      className: 'App-modal-surl',
      title: 'Shortened URL Generated',
      content: (
        <div>
          <p>The shortened url is {body.surl}. </p>
          {/* <span>Click to copy: <CopyToClipboard text={body.surl}><Tag color="geekblue">Copy</Tag></CopyToClipboard></span> */}
        </div>
      ),
      centered: true,
      iconType: "check-circle",
      cancelText: "OK",
      okText: "Save to Clipboard",
      // Copy body.surl to clipboard.
      onOk: () => {
        const el = document.createElement('textarea');
        el.value = body.surl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      } 
    });
  }

  render() {
    return (
      <div className="App">
        <Header className="App-header">
          <p>URL Shortener</p>
        </Header>
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
        <Footer style={{ textAlign: 'center' }} className="App-footer">
          Using Nodejs, PostgreSQL, express, knex as backend; React, AntDesign as frontend; Heroku as host.
        </Footer>
      </div>
    );
  }
}

export default App;