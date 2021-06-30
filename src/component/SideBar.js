import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import Profile from "./Profile";

export default function SideBar(props) {

  let pathName = location.pathname

  const renderSwtichMenu = (param) => {
    switch (param) {
      case 'MyPost':
        return (
          <div>
            <div onClick={() => { props.handleCategory('MyComment') }}>MyComment</div>
            <div onClick={() => { props.handleCategory('MyBookMark') }}>MyBookMark</div>
          </div>
        )
      case 'MyComment':
        return (
          <div>
            <div onClick={() => { props.handleCategory('MyPost') }}>MyPost</div>
            <div onClick={() => { props.handleCategory('MyBookMark') }}>MyBookMark</div>
          </div>
        )
      case 'MyBookMark':
        return (
          <div>
            <div onClick={() => { props.handleCategory('MyPost') }}>MyPost</div>
            <div onClick={() => { props.handleCategory('MyComment') }}>MyComment</div>
          </div>
        )
      default:
        break;
    }
  }

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
        {renderSwtichMenu(props.whatIsDisplayed)}
        <Profile isSignIn={props.isSignIn} signIn={props.signIn} signOut={props.signOut} signUp={props.signUp}></Profile>
      </div>
    )
  };
};
