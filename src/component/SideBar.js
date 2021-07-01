import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import MyPost from "./MyPost";
import MyComment from "./MyComment";
import Profile from "./Profile";
import MyBookMark from "./MyBookMark";
import MyPage from "../pages/MyPage";

export default function SideBar(props) {
  const myPageMenu = (whatIsDisplayed, pathName) => {
    console.log(whatIsDisplayed)
    if (pathName === '/MyPage') {
      if (whatIsDisplayed === 'MyPost') {
        return (
          <div>
            <MyComment handleData={props.handleData} />
            <MyBookMark handleData={props.handleData}></MyBookMark>
          </div>
        )
      }
      else if (whatIsDisplayed === 'MyComment') {
        return (
          <div>
            <MyPost handleData={props.handleData} />
            <MyBookMark handleData={props.handleData}></MyBookMark>
          </div>
        )
      }
      else if (whatIsDisplayed === 'MyBookMark') {
        return (
          <div>
            <MyPost handleData={props.handleData} />
            <MyComment handleData={props.handleData} />
          </div>
        )
      }
    }
    else if (pathName === '/LandingPage') {
      console.log(pathName)
      return (
        <div className={'side-bar'}>
          <Logo></Logo>
          <Search></Search>
          <Profile></Profile>
        </div>
      )
    }
    else if (pathName === '/WritePage') {
      return (
        <div className={'side-bar'}>
          <Logo></Logo>
          <Profile></Profile>
       </div>
      )
    }
  }
  
  return (
    <div className={'side-bar'}>
      <Logo></Logo>
      {myPageMenu(props.whatIsDisplayed, window.location.pathname)}
      <Profile></Profile>
    </div>
  )
};
