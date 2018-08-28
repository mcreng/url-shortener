import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
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
  return fetch("/api/auth")
  .then( req => req.json() )
  .then( req => {
    Auth.setName(req.name);
    Auth.setImage(req.image);
    Auth.authenticate(req.auth, () => {})
  })
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={App} />
      <Route exact path="/login" component={Login}/>
      {/* <Route render={() => <Redirect to="/" />} /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
