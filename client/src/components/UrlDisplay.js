import React, { Component } from "react";
import { Table, Divider } from "antd";
import CopyToClipboard from "./CopyToClipboard";
import './UrlDisplay.css'
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
        width: 300,
      }, {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 300,
        render: (text, record) => (
          <span>
            <a onClick={() => CopyToClipboard(window.location.href + record.surl)}>Copy Shortened URL</a>
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
        <Table className="url-display-table" dataSource={this.state.data} columns={this.columns} scroll={{ x: 1500, y: 300 }} />
    );
  }
}

export default UrlDisplay;
