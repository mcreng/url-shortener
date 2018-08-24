import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';

class GoogleLogin extends Component{
    constructor(prop) {
        super(prop);
        this.onSignin = this.onSignin.bind(this);
    }

    componentDidMount(){
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "https://apis.google.com/js/client:platform.js";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
    }

    onSignin = (response) => {
        console.log(response);
    }

    render(){
        return(
            <div>
                <MetaTags>
                    <meta name="google-signin-client_id" content="259902397583-g94c052uvh0urlk2r83a711icpuuuqo8.apps.googleusercontent.com"/>
                </MetaTags>
                <div className="g-signin2" data-onsuccess={this.onSignIn} />
            </div>
        )
    }
}

export default GoogleLogin;