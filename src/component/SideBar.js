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
        <Logo></Logo>
        <Search></Search>
        <Profile></Profile>
      </div>
    )
  }
  else {
    return (
      <div className={'side-bar'}>
        <Logo></Logo>
        <Search></Search>
        <Profile></Profile>
      </div>
    )
  };
};
