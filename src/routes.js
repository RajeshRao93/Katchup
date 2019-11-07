import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignInComponent from "./components/signInComponent/SignIn.Component";
import Validation from "./components/ValidationComponent/Validation.Component";

class Router extends Component {
  state = {};
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/signin/" />
            <Route exact path="/signin/" component={SignInComponent} />
            <Route path="/eventRequests/" component={Validation} />           

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Router;
