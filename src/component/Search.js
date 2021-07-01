import React from "react";
import axios from "axios";
require("dotenv").config();

export default function Search(props) {
  const handleSearch = (event) => {
    const queryString = event.target.previousElementSibling.value;
    history.push(`/search?q=${queryString}`)

    let uri = process.env.REACT_APP_API_ENDPOINT + '/search?q=' + encodeURI(encodeURIComponent(queryString));
    axios
    .get(uri)
    .then(res => console.log(res));
  }
  return (
    <div id="search-bar">
      <input id="search-input" type="text" />
      <button onClick={handleSearch} className="search-button">검색</button>
    </div>
  )
}
