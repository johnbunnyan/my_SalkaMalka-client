import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import MyPost from "./MyPost";
import MyComment from "./MyComment";
import Profile from "./Profile";

export default function SideBar(props) {

  const pathName = location.pathname

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
        {props.isPostOn ? (<MyComment />) : (<MyPost />)}
        <Profile isSignIn={props.isSignIn} signIn={props.signIn} signOut={props.signOut} signUp={props.signUp}></Profile>
      </div>
    )
  };
};