import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import Profile from "./Profile";
import { useHistory } from "react-router";
import { useSelector } from 'react-redux';

export default function SideBar(props) {
  const pathName = window.location.pathname
  const history = useHistory();
  const { userId } = useSelector(state => state);

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
        <div id='logo'>
          <Logo></Logo>
          <Search></Search>
        </div>
        <Profile></Profile>
        <div id='about'>
          <div id='to-about-page' onClick={() => {history.push('/about')}}>About SalkaMalka</div>
          <div id='since'>Since 2021 by © Troika Inc.</div>
        </div>
      </div>
    )
  }
  else if (pathName === `/users/${userId}`) {
    return (
      <div className={'side-bar'}>
        <Logo></Logo>
        {renderSwtichMenu(props.whatIsDisplayed)}
        <Profile></Profile>
      </div>
    )
  }
  else {
    return (
      <div className={'side-bar'}>
        <Logo></Logo>
        <Profile></Profile>
      </div>
    )
  };
};
