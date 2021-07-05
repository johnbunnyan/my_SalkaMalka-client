import React from "react";
import { useHistory } from "react-router-dom";

export default function Logo(props) {
  const history = useHistory();
  const backToHome = () => {
    history.push('/');
  }

  return (
      <img src="../../public/image/logo.png" alt="logo" onClick={() => backToHome()}/>
  )
}
