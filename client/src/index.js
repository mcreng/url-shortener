import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Login from "./components/Login";
import registerServiceWorker from "./registerServiceWorker";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Async from 'react-promise';

var isLoggedIn = new Promise( (resolve, reject) => {
  resolve(fetch("/api/auth")
  .then( req => req.json() )
  .then( req => req.auth ))
})

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Async promise={isLoggedIn} then={ (b) =>  b ? <App/> : <Redirect to="/login"/> } />}
        // render={() => <Async promise={isLoggedIn} then={ (b) =>  <App/>  } />}
      />
      <Route
        exact
        path="/login"
        render={() => <Async promise={isLoggedIn} then={ (b) =>  b ? <Redirect to="/"/> : <Login/> } />}
      />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
