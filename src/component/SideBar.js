import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import MyPost from "./MyPost";
import MyComment from "./MyComment";
import Profile from "./Profile";
import MyBookMark from "./MyBookMark";

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
        {/* {
          if(props.whatIsDisplayed === 'MyPost'){
            return(
        <MyBookMark handleData={props.handleData}></MyBookMark>
        <MyComment handleData={props.handleData} />
        )
          }
        else if(props.whatIsDisplayed === 'MyComment'){

        }
        else if(props.whatIsDisplayed === 'MyBookMark'){

        }
        } */}
        <MyBookMark handleData={props.handleData}></MyBookMark>
        <MyComment handleData={props.handleData} />
        <MyPost handleData={props.handleData} />)
        <Profile isSignIn={props.isSignIn} signIn={props.signIn} signOut={props.signOut} signUp={props.signUp}></Profile>
      </div>
    )
  };
};
