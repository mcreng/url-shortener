import React, { Component } from "react";
import { Layout, Input, Button, Row, Col, Modal } from "antd";
import CopyToClipboard from "./CopyToClipboard";
import { connect } from "react-redux";
import { updateTable } from "../actions/UpdateTableAction";

const { Header, Footer, Content } = Layout;

class UrlInput extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      response: "",
      shortening: false,
      currentUrl: ""
    };

    this.addUrl = this.addUrl.bind(this);
    this.urlFormatter = this.urlFormatter.bind(this);
  }

  urlFormatter = str =>
    ((str.match(/.+:\/\/\S+/g) ? "" : "http://") + str).replace(/\s/g, "");

  async addUrl() {
    this.setState({ shortening: true });
    const response = await fetch("/api/url", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: this.urlFormatter(this.state.currentUrl) })
    });

    const body = await response
      .json()
      .then(this.setState({ shortening: false }));

    if (response.status !== 200) throw Error(body.message);

    this.props.updateTable();

    Modal.confirm({
      className: "modal-surl",
      title: "Shortened URL Generated",
      content: (
        <div>
          <p>
            The shortened url is {window.location.href}
            {body.surl}.{" "}
          </p>
        </div>
      ),
      centered: true,
      iconType: "check-circle",
      cancelText: "OK",
      okText: "Save to Clipboard",
      // Copy body.surl to clipboard.
      onOk: () => {
        CopyToClipboard(window.location.href + body.surl);
      }
    });
  }

  render() {
    return (
      <div align="middle">
        <Row type="flex" justify="space-between" className="url-row">
          <Col lg={{ span: 17, offset: 2 }} sm={24} xs={24}>
            <Input
              className="url-input"
              size="large"
              placeholder="Enter the url to be shortened..."
              disabled={this.state.shortening}
              onChange={evt => this.setState({ currentUrl: evt.target.value })}
              value={this.state.currentUrl}
              onPressEnter={this.addUrl}
            />
          </Col>
          <Col lg={0} sm={24} xs={24} style={{ padding: "5vh" }} />
          <Col align="center" lg={3} sm={24} xs={24}>
            <Button
              className="url-button"
              size="large"
              type="primary"
              onClick={this.addUrl}
              loading={this.state.shortening}
            >
              Shorten it!
            </Button>
          </Col>
          <Col lg={2} />
        </Row>
      </div>
    );
  }
}

export default connect(
  null,
  { updateTable }
)(UrlInput);
