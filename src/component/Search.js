import React, { useState } from "react";
import { useHistory } from "react-router";
import { setQueryString } from '../actions/index'
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
require("dotenv").config();

export default function Search() {
  const pathName = window.location.pathname;
  const dispatch = useDispatch();
  const history = useHistory();
  const [target, setTarget] = useState('')
  function handleSearch(event) {
    if (!target.length) {
      alert('검색어를 입력해주세요');
      return;
    }
    const encoded = encodeURI(encodeURIComponent(target));
    dispatch(setQueryString(target));
    history.push(`/search?q=${encoded}`);
  }
  return (
    <div className={pathName !== '/main' && pathName !== '/search' ? 'search-bar hidden' : 'search-bar'}>
      <input id="search-input" type="text" />
      <FontAwesomeIcon icon={faSearch} onClick={handleSearch}/>
    </div>
  )
}
