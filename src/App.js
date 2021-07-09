import './App.css';
import React, { useEffect } from "react";
import WritePage from "./pages/WritePage";
import LandingPage from "./pages/LandingPage";
import MyPage from "./pages/MyPage";
import AboutPage from "./pages/AboutPage";
import {
  Switch,
  BrowserRouter,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector } from 'react-redux';
require("dotenv").config();

export default function App() {
  useEffect(() => {
    gapi.load('auth2', function() {
      gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_OAUTH_CODE
      })
    });
  }, [])

  useEffect(() => {
    if (!window.Kakao.Auth) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
  }, [])

  const { isSignIn, userId } = useSelector(state => state);
  
  return (
    <BrowserRouter>
      <Switch>
        <Route
            exact path='/'
            render={() => {
              return <Redirect to='/main?sort=date' />;
            }
          }
        />
        <Route path='/main' render={() =>
          <LandingPage></LandingPage>} />
        <Route path='/search' render={() =>
          <LandingPage></LandingPage>} />
        <Route exact path='/posts' render={() => isSignIn ? (
          <WritePage></WritePage>
        ) : (
          <Redirect to="/"></Redirect>
        )} />
        <Route path={`/mypage`} render={() => isSignIn ? (
          <MyPage></MyPage>
        ) : (
          <Redirect to="/"></Redirect>
        )} />
        <Route path={'/about'} render={() => 
          <AboutPage></AboutPage>} />
      </Switch>
    </BrowserRouter>
  )

}

