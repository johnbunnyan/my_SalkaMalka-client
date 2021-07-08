import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../logo/SalkaMalka_logo_crop.png";

export default function Logo(props) {
  const history = useHistory();
  const backToHome = () => {
    history.push('/');
  }

  return (
      <img src={logo} alt="logo" onClick={() => backToHome()}/>
  )
}