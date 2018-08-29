import React, { Component } from "react";
import { Layout, Input, Button, Row, Col, Modal } from "antd";
// import "./App.css";

const { Header, Footer, Content } = Layout;

class AppRedirect extends Component {
  constructor(prop) {
      super(prop);
      this.state = { url: null, fetched: false }
  }


  async componentWillMount() {
    await fetch("/api/redirect", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ surl: this.props.match.params.id })
    }).then( res => res.json() )
    .then( res => this.setState( {url: res.url, fetched: true }) )
  }

  render() {
    if (this.state.fetched) {
        if (this.state.url) {
            window.location = ("https://" + this.state.url)
            return (<p>Redirecting...</p>)
        } else return (<p>Website not found</p>);
    } else {
        return (<p></p>);
    }
  }
}

export default AppRedirect;
