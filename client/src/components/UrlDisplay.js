import React, { Component } from "react";
import { Layout, Input, Button, Row, Col, Table, Divider } from "antd";
import "./App.css";
import UserDisplay from "./UserDisplay";

const { Header, Footer, Content } = Layout;

class UrlDisplay extends Component {
  
  constructor(prop) {
    super(prop);
    this.state = { data: null, }
    this.columns  = [{
        title: 'Original URL',
        dataIndex: 'url',
        key: 'url',
      }, {
        title: 'Shortened URL',
        dataIndex: 'surl',
        key: 'surl',

      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">Copy Shortened URL</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
          </span>
        ),
      }];
  }

  componentWillMount() {
    fetch("/api/url")
    .then( req => req.json() )
    .then( req => this.setState({data: req}) )
  }

  render() {
    return (
        <Table dataSource={this.state.data} columns={this.columns} />
    );
  }
}

export default UrlDisplay;
