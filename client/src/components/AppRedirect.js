import React, { Component } from "react";

class AppRedirect extends Component {
  constructor(prop) {
      super(prop);
      this.state = { url: null, fetched: false }
  }


  async componentWillMount() {
    const response = await fetch("/api/redirect", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ surl: this.props.match.params.id })
    })
    if (response.status !== 404) {
        const body = await response.json();
        this.setState({url: body.url, fetched: true})
    } else {
        this.setState({fetched: true})
    }


}

  render() {
    if (this.state.fetched) {
        if (this.state.url) {
            window.location = this.state.url
            return (<p>Redirecting...</p>)
        } else return (<p>Website not found</p>);
    } else {
        return (<p></p>);
    }
  }
}

export default AppRedirect;
