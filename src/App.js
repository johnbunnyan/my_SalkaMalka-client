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
import { useSelector } from 'react-redux';


export default function App() {
  const { isSignIn } = useSelector(state => state)


  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/LandingPage' render={() =>
            <LandingPage></LandingPage>} />
          <Route path='/WritePage' render={() => isSignIn ? (
            <WritePage></WritePage>
          ) : (
            <Redirect to="/LandingPage"></Redirect>
          )} />
          <Route path='/MyPage' render={() => isSignIn ? (
            <MyPage></MyPage>
          ) : (
            <Redirect to="/LandingPage"></Redirect>
          )} />
        </Switch>
      </BrowserRouter>
    </div>
  )

}

