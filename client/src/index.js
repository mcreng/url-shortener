import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Login from "./components/Login";
import registerServiceWorker from "./registerServiceWorker";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";

function isLoggedIn() {
  return true;
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (isLoggedIn() ? <App /> : <Redirect to="/login" />)}
      />
      <Route
        exact
        path="/login"
        render={() => (isLoggedIn() ? <Redirect to="/" /> : <Login />)}
      />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
