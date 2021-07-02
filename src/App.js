import './App.css';
import React from "react";
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

