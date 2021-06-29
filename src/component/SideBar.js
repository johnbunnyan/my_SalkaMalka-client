import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import MyPost from "./MyPost";
import MyComment from "./MyComment";
import Profile from "./Profile";
import MyBookMark from "./MyBookMark";
import MyPage from "../pages/MyPage";

export default function SideBar(props) {

  const pathName = location.pathname
  let MyPageMenu
  if (props.whatIsDisplayed === 'MyPost') {
    MyPageMenu = (
      <div>
        <MyComment handleData={props.handleData} />
        <MyBookMark handleData={props.handleData}></MyBookMark>
      </div>
    )
  }
  else if (props.whatIsDisplayed === 'MyComment') {
    MyPageMenu = (
      <div>
        <MyPost handleData={props.handleData} />
        <MyBookMark handleData={props.handleData}></MyBookMark>
      </div>
    )
  }
  else if (props.whatIsDisplayed === 'MyBookMark') {
    <div>
      <MyPost handleData={props.handleData} />
      <MyComment handleData={props.handleData} />
    </div>
  }
  // console.log(MyPageMenu)


  if (pathName === '/LandingPage') {
    return (
      <div className={'side-bar'}>
        <Logo></Logo>
        <Search></Search>
        <Profile isSignIn={props.isSignIn} signIn={props.signIn} signOut={props.signOut} signUp={props.signUp}></Profile>
      </div>
    )
  }
  else if (pathName === '/WritePage') {
    return (
      <div className={'side-bar'}>
        <Logo></Logo>
        <Profile isSignIn={props.isSignIn} signIn={props.signIn} signOut={props.signOut} signUp={props.signUp}></Profile>
      </div>
    )
  }
  else {
    return (
      <div className={'side-bar'}>
        <Logo></Logo>
        {MyPageMenu}
        <Profile isSignIn={props.isSignIn} signIn={props.signIn} signOut={props.signOut} signUp={props.signUp}></Profile>
      </div>
    )
  };
};
