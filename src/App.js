import './App.css';
import React, { Component } from "react";
import WritePage from "./pages/WritePage";
import LandingPage from "./pages/LandingPage";
import MyPage from "./pages/MyPage";
import {
  Switch,
  BrowserRouter,
  Route,
  Redirect
} from "react-router-dom";

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/LandingPage' render={() =>
              <LandingPage></LandingPage>} />
            <Route path='/WritePage' render={() => this.state.isSignIn ? (
              <WritePage></WritePage>
            ) : (
              <Redirect to="/LandingPage"></Redirect>
            )} />
            <Route path='/MyPage' render={() => this.state.isSignIn ? (
              <MyPage></MyPage>
            ) : (
              <Redirect to="/LandingPage"></Redirect>
            )} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}


export default App;
