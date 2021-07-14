import React from "react";
import logoSquare from "../logo/SalkaMalka_logo_square.png";
import { useSelector } from 'react-redux';

export default function Loading(props) {
  const { isLoading } = useSelector(state => state);
  console.log(isLoading)
  if (isLoading) return (<img id='logo-square' src={logoSquare} alt="logo" onClick={() => backToHome()}/>);
  else return null; 
}