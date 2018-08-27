import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import {fakeAuth, Login} from "./components/Login";
import registerServiceWorker from "./registerServiceWorker";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Async from 'react-promise';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => fakeAuth.isAuthenticated || checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )}
    
  />
);

async function checkAuth() {
  await fetch("/api/auth")
  .then( req => req.json() )
  .then( req => req.auth )
  .then(b => fakeAuth.authenticate(b))
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
