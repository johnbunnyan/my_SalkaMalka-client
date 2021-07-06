import './App.css';
import React from "react";
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


export default function App() {
  const { isSignIn, userId } = useSelector(state => state)
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
        <Route path={`/users/${userId}`} render={() => isSignIn ? (
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

