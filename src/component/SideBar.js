import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import Profile from "./Profile";
import { useHistory } from "react-router";

export default function SideBar(props) {
  let pathName = location.pathname
  const history = useHistory();

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

  if (pathName === '/main' || pathName === '/search') {
    return (
      <div className={'side-bar'}>
        <Logo></Logo>
        <Search></Search>
        <Profile></Profile>
        <div onClick={() => {history.push('/about')}}>About SalkaMalka</div>
      </div>
    )
  }
  else if (pathName === '/posts') {
    return (
      <div className={'side-bar'}>
        <Logo></Logo>
        <Profile></Profile>
      </div>
    )
  }
  else {
    return (
      <div className={'side-bar'}>
        <Logo></Logo>
        {renderSwtichMenu(props.whatIsDisplayed)}
        <Profile></Profile>
      </div>
    )
  };
};
