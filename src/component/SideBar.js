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

  if (pathName === '/main' || pathName === '/search') {
    return (
      <div className={'side-bar'}>
        <div id='logo'>
          <Logo></Logo>
          <Search></Search>
        </div>
        <Profile></Profile>
        <div id='to-about-page' onClick={() => {history.push('/about')}}>
          <span>About </span>
          <span>Salka</span>
          <span>Malka</span>
        </div>
        <div id='since'>Since 2021 by © Troika Inc.</div>
      </div>
    )
  }
  else {
    return (
      <div className={'side-bar'}>
        <div id='logo'>
          <Logo></Logo>
          <Search></Search>
        </div>
        <Profile></Profile>
        <div id='since'>Since 2021 by © Troika Inc.</div>
      </div>
    )
  };
};
