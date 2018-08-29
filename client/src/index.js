import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import AppRedirect from "./components/AppRedirect"
import Login from "./components/Login";
import Auth from "./components/Auth";
import registerServiceWorker from "./registerServiceWorker";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Async from 'react-promise';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => 
      <Async promise={checkAuth()} then={() => 
        Auth.isAuthenticated 
        ? (<Component {...props} />) 
        : (<Redirect to={{pathname: "/login", state: { from: props.location }}}/>)
      }/>
    }
  />
);

async function checkAuth() {
  if (Auth.getToken()) return
  return fetch("/api/auth")
  .then( req => req.json() )
  .then( async req => {
      if (req.auth) {
        await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.token}`)
        .then( authreq => authreq.json() )
        .then( authreq => {
            Auth.setName(authreq.name);
            Auth.setImage(authreq.picture);
            Auth.authenticate(req.auth, () => {})
        })
        .catch(console.error)
      }
    }
  )
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={App} />
      <Route exact path="/login" component={Login}/>
      <Route path="/:id" render={(props) => (
      <AppRedirect {...this.props} {...props}/>)}/>
      {/* <Route render={() => <Redirect to="/" />} /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
