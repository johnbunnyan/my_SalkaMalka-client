import React from "react";
import { useHistory } from "react-router";
import { setQueryString } from '../actions/index'
import { useDispatch } from 'react-redux';
require("dotenv").config();

export default function Search() {
  const pathName = window.location.pathname
  const dispatch = useDispatch();
  const history = useHistory();
  function handleSearch(event) {
    const queryString = event.target.previousElementSibling.value;
    if (!queryString.length) {
      alert('검색어를 입력해주세요');
      return;
    }
    const encoded = encodeURI(encodeURIComponent(queryString));
    dispatch(setQueryString(queryString));
    history.push(`/search?q=${encoded}`);
  }
  return (
    <div id='search-bar'>
      <input id="search-input" type="text" />
      <button onClick={handleSearch} className="search-button">검색</button>
    </div>
  )
}
